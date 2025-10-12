import React from 'react';
import Footer from './Footer';
import './Landing.css';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="app-layout">
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
