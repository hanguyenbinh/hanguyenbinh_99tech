import { combineReducers } from "redux";
import CoinExchangeReducer from "./coinExchange/reducer";



const rootReducer = combineReducers({
    // public
    CoinExchangeReducer
});

export default rootReducer;
