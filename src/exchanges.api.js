import {
  BINANCE_API_URL,
  BITFINEX_API_URL,
  HUOBI_API_URL,
  KRAKEN_API_URL,
  TRADES_LIMIT
} from './constants';

export const fetchPriceBinance = async (pair) => {
  const response = await fetch(`${BINANCE_API_URL}ticker/price?symbol=${pair}`);
  const result = await response.json();

  return {
    id: Math.random().toString(16).slice(4),
    exhange: 'Binance',
    price: result?.price
  };
};

export const fetchTradesBinance = async (pair) => {
  const response = await fetch(`${BINANCE_API_URL}trades?symbol=${pair}&limit=${TRADES_LIMIT}`);
  const result = await response.json();

  if (!result?.length) {
    return [];
  }

  const data = result?.map(({ price, time, qty, isBuyerMaker }) => {
    const date = new Date(time);
    return {
      id: Math.random().toString(16).slice(4),
      price,
      amount: qty,
      time: date ? date.toLocaleTimeString() : '',
      isBuyerMaker
    };
  }) || [];

  return data;
};

export const fetchPriceBitfinex = async (pair) => {
  const response = await fetch(`${BITFINEX_API_URL}ticker/t${pair}`);
  const result = await response.json();

  const [, , , , , , price] = result || [];

  return {
    id: Math.random().toString(16).slice(4),
    exhange: 'Bitfinex',
    price
  };
};

export const fetchTradesBitfinex = async (pair) => {
  const response = await fetch(`${BITFINEX_API_URL}trades/t${pair}/hist?limit=${TRADES_LIMIT}`);
  const result = await response.json();

  if (!result?.length) {
    return [];
  }

  const data = result.map((history) => {
    const [id, time, amount, price] = history;
    const date = new Date(time);
    return {
      id,
      price,
      amount: Math.abs(amount),
      time: date ? date.toLocaleTimeString() : '',
      isBuyerMaker: amount > 0
    };
  }) || [];

  return data;
};

export const fetchPriceHuobi = async (pair) => {
  const response = await fetch(`${HUOBI_API_URL}/market/history/kline?period=1min&size=1&symbol=${pair}`);
  const result = await response.json();

  const [candle] = result?.data || [];
  const { id, close } = candle || {};

  return {
    id: id || Math.random().toString(16).slice(4),
    exhange: 'Huobi',
    price: close
  };
};

export const fetchTradesHuobi = async (pair) => {
  const response = await fetch(`${HUOBI_API_URL}/market/history/trade?symbol=${pair}&size=${TRADES_LIMIT}`);
  const result = await response.json();

  if (!result?.data) {
    return [];
  }
 
  const data = result.data.map(({ data }) => {
    const [history] = data;
    const { amount, direction, id, price, ts } = history;
    const date = new Date(ts);
    return {
      id,
      price,
      amount,
      time: date ? date.toLocaleTimeString() : '',
      isBuyerMaker: direction === 'buy'
    };
  }) || [];

  return data;
};

export const fetchPriceKraken = async (pair) => {
  const response = await fetch(`${KRAKEN_API_URL}Ticker?pair=${pair}`);
  const result = await response.json();

  const [prop] = Object.keys(result?.result || {})
  const [price] = result?.result ? result?.result[prop]?.c : [null];

  return {
    id: Math.random().toString(16).slice(4),
    exhange: 'Kraken',
    price
  };
};

export const fetchTradesKraken = async (pair) => {
  const response = await fetch(`${KRAKEN_API_URL}Trades?pair=${pair}`);
  const result = await response.json();

  if (result?.error?.length) {
    return [];
  }
  
  const [prop] = Object.keys(result?.result || {})
  const data = result.result[prop].slice(0, TRADES_LIMIT)?.map((history) => {
    const [price, amount, time, buyOrSell] = history;
    const date = new Date(time);

    return {
      id: Math.random().toString(16).slice(4),
      price,
      amount,
      time: date ? date.toLocaleTimeString() : '',
      isBuyerMaker: buyOrSell === 'b'
    };
  }) || [];

  return data;
};
