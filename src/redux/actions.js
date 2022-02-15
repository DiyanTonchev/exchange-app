import { SET_CRYPTOCURRENCY_PAIR, SET_EXCHANGE } from "./types";

export const setCryptocurrencyPair = (cryptocurrencyPair) => ({
   type: SET_CRYPTOCURRENCY_PAIR, payload: cryptocurrencyPair 
});

export const setExchange = (exchange) => ({
   type: SET_EXCHANGE, payload: exchange 
});
