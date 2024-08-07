import { call, put, takeEvery } from "redux-saga/effects";
import { doSwapCoinSuccess, coinExchangeError, getCoinPriceSuccess } from "./actions";
import { GET_COIN_PRICE, DO_SWAP_COIN } from "./actionTypes";
import { toast } from 'react-toastify';
import { getCoinPriceApi } from "../../helpers/backend_helper";
import { BackendResponse } from "../../common/types/BackendResponse";
function* getCoinPrice(input: any) {
  try {
    const response: BackendResponse = yield call(
      getCoinPriceApi, input.payload);
    if (response.status === true) {
      yield put(getCoinPriceSuccess(response));
    } else {
      yield put(coinExchangeError(response));
      toast.error(response.data.errmsg, { autoClose: 3000 });
    }
  } catch (error: any) {
    yield put(coinExchangeError(error));
    toast.error(error, { autoClose: 3000 });
  }
}


// function* doSwapCoin(input: any) {
//   try {
//     const response: AxiosResponse = yield call(
//       doSwapCoinApi, {});
//     if (response.status === 1) {
//       yield put(doSwapCoinSuccess(response));
//     } else {
//       yield put(coinExchangeError(response));
//       toast.error(response.data.errmsg, { autoClose: 3000 });
//     }
//   } catch (error: any) {
//     yield put(coinExchangeError(error));
//     toast.error(error, { autoClose: 3000 });
//   }
// }



function* coinExchangeSaga() {
  yield takeEvery(GET_COIN_PRICE, getCoinPrice);  
  // yield takeEvery(DO_SWAP_COIN, doSwapCoin);
}

export default coinExchangeSaga;