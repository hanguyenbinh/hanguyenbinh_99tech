import { all, fork } from "redux-saga/effects";
import coinExchangeSaga from './coinExchange/saga'


export default function* rootSaga() {
  yield all([
    //public    
    // fork(ForgetSaga),
    // fork(ProfileSaga),
    // fork(chatSaga),
    // fork(projectSaga),
    // fork(taskSaga),
    // fork(cryptoSaga),
    // fork(ticketsSaga),
    // fork(calendarSaga),
    // fork(ecommerceSaga),
    // fork(crmSaga),
    // fork(invoiceSaga),
    // fork(mailboxSaga),
    // fork(dashboardAnalyticsSaga),
    // fork(dashboardCrmSaga),
    // fork(dashboardEcommerceSaga),
    // fork(dashboardCryptoSaga),
    // fork(dashboardProjectSaga),
    // fork(dashboardNFTSaga),
    // fork(teamSaga),    
    fork(coinExchangeSaga),
    
  ]);
}