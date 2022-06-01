const BASE_URL = "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5";

export const getCurrency = () => fetch(BASE_URL).then(res => res.json());
