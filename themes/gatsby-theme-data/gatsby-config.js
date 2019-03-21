const pkg = require('./package.json');

module.exports = {
  plugins: [
    /*
     * We need to make sure that Webpack processes this theme as ES6, so we add
     * this plugin and specify the package name in `modules`.
     */
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: [pkg.name]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: 'content/posts'
      }
    },
    'gatsby-transformer-remark'
  ]
};
