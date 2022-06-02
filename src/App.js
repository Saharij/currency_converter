import { useState, useEffect } from 'react';

import './App.css';
import { getCurrency } from './api';
import Header from './components/Header';
import { decorateCurrencies } from './utils';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    getCurrency()
      .then(res => {
        setCurrencies(decorateCurrencies(res));
      });
  }, []);

  return (
    <>
      <Header currencies={currencies} />
      {currencies.length > 0 && (
        <CurrencyConverter currencies={currencies} />
      )}
    </>
  );
};

export default App;
