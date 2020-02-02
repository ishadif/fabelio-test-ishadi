import React from 'react';
import './App.css';
import ProductProvider from './providers/Product';
import Header from './components/Header';
import Products from './pages/Products';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <ProductProvider>
      <Switch>
        <Route path="/">
          <Products />
        </Route>
      </Switch>
    </ProductProvider>
  );
}

export default App;
