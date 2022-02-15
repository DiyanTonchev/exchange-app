import { combineReducers } from 'redux';
import {
  SET_CRYPTOCURRENCY_PAIR,
  SET_EXCHANGE
} from './types';

const cryptocurrencyPair = (state = '', action) => {
  if (action.type === SET_CRYPTOCURRENCY_PAIR) {
    return action.payload;
  }

  return state;
};

const selectedExchange = (state = '', action) => {
  if (action.type === SET_EXCHANGE) {
    return action.payload;
  }

  return state;
}

export default combineReducers({
  cryptocurrencyPair,
  selectedExchange
});