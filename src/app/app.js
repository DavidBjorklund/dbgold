import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppContextProvider, { AppContext } from './context';

import ScrollToTop from './scrollToTop';

import Header from './header';

import Home from './home';
import Products from './products';
import Cart from './cart';
import Checkout from './checkout';
import FourOFour from './fourofour';

import Footer from './footer';

import history from '../history.js';

const basename = '/~davidbd/webbutveckling1/projekt/foretag/';

const App = ()=>{
  const { cart, setCart } = useContext(AppContext)
  return (
    <BrowserRouter history={history} basename={basename}>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/produkter" component={Products}></Route>
        <Route path="/kundvagn" component={Cart}></Route>
        <Route path="/kassa" component={Checkout}></Route>
        <Route path="" component={FourOFour} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
