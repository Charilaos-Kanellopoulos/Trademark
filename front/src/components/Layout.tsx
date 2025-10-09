import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import './Landing.css';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="app-layout">
      <Nav />
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
