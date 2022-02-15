import React, { memo } from 'react';
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate
} from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import MarketTrades from './MarketTrades';

const ExchangeApp = memo(() => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route
        exact
        path='/'
        element={<Home />}
      />
      <Route
        path='/:pair/'
        element={<Home />}
      />
      <Route
        path='/:pair/details'
        element={<MarketTrades />}
      />
      <Route path='*' exact element={<Navigate to={{ pathname: '/' }} replace />} />
    </Routes>
  </BrowserRouter>
));

ExchangeApp.displayName = 'ExchangeApp';
export default ExchangeApp;
