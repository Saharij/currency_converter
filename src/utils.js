export const priceFormat = value => (Math.floor(value * 100) / 100).toFixed(2);
export const validateNumbers = value => /^\d*\.?(?:\d{1,2})?$/.test(value);

export const decorateCurrencies = data => {
  const usd = data.find(({ ccy }) => ccy === 'USD');
  const eur = data.find(({ ccy }) => ccy === 'EUR');

  const uahToUsd = {
    ...usd,
    base: usd.ccy,
    target: usd.base_ccy,
  };
  const uahToEur = {
    ...eur,
    base: eur.ccy,
    target: eur.base_ccy,
  };
  const usdToUah = {
    target: 'USD',
    base: 'UAH',
    sale: (1/usd.sale).toString(),
    buy: (1/usd.buy).toString(),
  };
  const eurToUah = {
    target: 'EUR',
    base: 'UAH',
    sale: (1/eur.sale).toString(),
    buy: (1/eur.buy).toString(),
  };
  const eurToUsd = {
    target: 'EUR',
    base: 'USD',
    sale: (usd.sale/eur.sale).toString(),
    buy: (usd.buy/eur.buy).toString(),
  };
  const usdToEur = {
    target: 'USD',
    base: 'EUR',
    sale: (eur.sale/usd.sale).toString(),
    buy: (eur.buy/usd.buy).toString(),
  };

  return [uahToUsd, uahToEur, usdToUah, eurToUah, eurToUsd, usdToEur];
};
