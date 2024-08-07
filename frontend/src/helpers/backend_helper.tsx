import { APIClient } from "./api_helper";
import * as url from "./url_helper";
const api = new APIClient();

// // Register Method
export const getCoinPriceApi = (data: any) => api.get(url.GET_COIN_PRICE, data);
// export const doSwapCoinApi = (data:any)=>api.create(url.ADD_MESSAGE, data);
