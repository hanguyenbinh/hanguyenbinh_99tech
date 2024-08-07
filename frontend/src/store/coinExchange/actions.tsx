import { GET_COIN_PRICE, API_COIN_EXCHANGE_ERROR, DO_SWAP_COIN, DO_SWAP_COIN_SUCCESS, GET_COIN_PRICE_SUCCESS } from "./actionTypes";

export const getCoinPrice = (page = 1, limit = 10) => {
  return {
    type: GET_COIN_PRICE,
    payload: { page, limit }
  }
}

export const getCoinPriceSuccess = (response: any) => {
  return {
    type: GET_COIN_PRICE_SUCCESS,
    payload: response
  }
}

export const doSwapCoin = () => {
  return {
    type: DO_SWAP_COIN,
    payload: {}
  }
}

export const doSwapCoinSuccess = (response: any) => {
  return {
    type: DO_SWAP_COIN_SUCCESS,
    payload: response
  }
}

export const coinExchangeError = (response: any) => {
  return {
    type: API_COIN_EXCHANGE_ERROR,
    payload: response
  }
}
