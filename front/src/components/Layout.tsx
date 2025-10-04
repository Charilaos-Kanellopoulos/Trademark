import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100 app-layout">
      <Nav />
      <div className="flex-grow-1">
        <main>{children}</main>
      </div>      
      <Footer />
    </div>
  );
};

export default Layout;
