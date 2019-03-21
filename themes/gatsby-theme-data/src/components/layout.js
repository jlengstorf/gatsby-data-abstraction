/*
 * The only reason this component exists is to make it easier to wrap
 * theme-specific components with styles. This _should_ allow a specific
 * per-theme layout **and/or** a multi-theme global layout.
 */
import React from 'react';

const Layout = ({ children }) => <React.Fragment>{children}</React.Fragment>;

export default Layout;
