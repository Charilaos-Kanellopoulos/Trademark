import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Landing from './components/Landing';

function App() {
  return (
    <div className="App">
      <Layout>
        <Landing />
      </Layout>
    </div>
  );
}

export default App;
