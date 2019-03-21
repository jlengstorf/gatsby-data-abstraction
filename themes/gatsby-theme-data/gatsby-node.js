const remark = require('remark');
const html = require('remark-html');
const { createFilePath } = require(`gatsby-source-filesystem`);

const md = remark().use(html);

const getUnixTimestamp = dateString =>
  new Date(Date.parse(dateString)).toUTCString();

/*
 * This is a simplified adapter for converting MarkdownRemark nodes into Post
 * nodes. We still need to find a way to get the processed Markdown out of the
 * MD nodes so we don’t need to re-process here (also no Remark plugins would
 * work in this scenario).
 */
const mdToPost = post => ({
  // Used for generating a unique ID.
  absolutePath: post.fileAbsolutePath,
  slug: post.fields.slug,
  title: post.frontmatter.title,
  date: getUnixTimestamp(post.frontmatter.date),
  // TODO find a way to get the MarkdownRemark `html` field value.
  content: md.processSync(post.rawMarkdownBody).contents,
  author: {
    name: post.frontmatter.author
  }
});

/*
 * To ensure the queries don’t break — even if no data exists — we need to
 * define types in the schema. We’ll also need to define resolvers to tell
 * Gatsby what data to send back when these nodes are queried, which we’ll take
 * care of in the `createResolvers` API hook.
 */
exports.sourceNodes = ({ actions: { createTypes }, schema, reporter }) => {
  reporter.info('Adding the `Post` and `Author` types to the schema.');

  createTypes([
    `
      type Post implements Node {
        title: String!
        slug: String!
        date: Date!
        content: String!
        author: Author!
      }
    `,
    schema.buildObjectType({
      name: 'Author',
      fields: {
        name: {
          type: 'String!',
          resolve: source => source.name
        },
        posts: {
          type: '[Post!]!',
          resolve: (source, _args, context) => {
            const posts = context.nodeModel.runQuery({
              query: {
                filter: { frontmatter: { author: { eq: source.name } } }
              },
              type: 'MarkdownRemark'
            });

            return posts.map(mdToPost);
          }
        }
      }
    })
  ]);
};

exports.createResolvers = ({ createResolvers, createNodeId, reporter }) => {
  reporter.info('Adding resolvers for the `Post` and `Author` types.');

  createResolvers({
    Query: {
      post: {
        async resolve(_, args, context) {
          const allPosts = await context.nodeModel
            .getAllNodes({
              type: 'MarkdownRemark'
            })
            .map(mdToPost);

          // TODO how do we actually apply the args to this query?
          function recursiveFilterNodes(nodes, args, path = []) {
            // TODO handle multiple args (e.g. filter AND sort)
            const [[field, arg]] = Object.entries(args);

            if (field === 'eq') {
              return nodes.find(
                node => arg === path.reduce((val, key) => val[key] || {}, node)
              );
            }

            return recursiveFilterNodes(nodes, arg, [...path, field]);
          }

          return recursiveFilterNodes(allPosts, args);
        }
      },
      allPost: {
        async resolve(_, _args, context, _info) {
          // Get only the Markdown files that are blog posts.
          const files = await context.nodeModel.runQuery({
            query: { filter: { sourceInstanceName: { eq: 'posts' } } },
            type: 'File',
            firstOnly: false
          });

          // Get the IDs of all child nodes.
          const postIDs = files.map(file => file.children).flat();

          // Grab all the MarkdownRemark nodes that are children of post files.
          const posts = await context.nodeModel
            .runQuery({
              query: { filter: { id: { in: postIDs } } },
              type: 'MarkdownRemark'
            })
            .map(mdToPost);

          return {
            nodes: posts,
            edges: posts.map(node => ({ node })),
            totalCount: posts.length
          };
        }
      }
    },
    Post: {
      id: {
        resolve: source => createNodeId(`post-${source.absolutePath}`)
      }
    }
  });
};

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  if (node.internal.type !== 'MarkdownRemark') {
    return;
  }

  createNodeField({
    node,
    name: 'slug',
    value: createFilePath({ node, getNode })
  });
};

exports.createPages = async ({
  actions: { createPage },
  graphql,
  reporter
}) => {
  const result = await graphql(`
    {
      allPost {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.error) {
    reporter.panic(result.error);
    return;
  }

  result.data.allPost.nodes.forEach(post => {
    createPage({
      path: `/posts${post.slug}`,
      component: require.resolve('./src/templates/post-template.js'),
      context: {
        slug: post.slug
      }
    });
  });

  createPage({
    path: `/posts/`,
    component: require.resolve('./src/templates/post-previews-template.js')
  });
};
