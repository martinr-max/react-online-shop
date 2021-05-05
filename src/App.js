import './App.css';
import React from 'react'
import Homepage from './Pages/HomePage/HomePage.component';
import {Route, Switch} from 'react-router-dom';
import ShopPage from './Pages/HomePage/Shop/ShopPage.component';
import Header from './components/header/Header.component';
import AuthPage from './Pages/HomePage/Auth/Auth.component';
import CheckoutPage from './Pages/Checkout/CheckoutPage.component';
import Collection from './components/concreteCollection/ConcreteCollection.component';

function App() {

 
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signup" component={AuthPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/section/:title" component={Collection} />
      </Switch>  
    </div>
  );
}



export default App
