import React from 'react';
import './App.css';
import ProductProvider from './providers/Product';
import Header from './components/Header';
import Products from './components/Products';

function App() {
  return (
    <ProductProvider>
      <Header />
      <main>
        <Products />
      </main>
    </ProductProvider>
  );
}

export default App;
