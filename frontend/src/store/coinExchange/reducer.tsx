import { isNull } from "lodash"
import { GET_COIN_PRICE, API_COIN_EXCHANGE_ERROR, GET_COIN_PRICE_SUCCESS, DO_SWAP_COIN, DO_SWAP_COIN_SUCCESS } from "./actionTypes"
import { WalletBalance } from "../../pages/problem03/WalletPage"
export interface CoinExchangeState {
	error: boolean,
	errorMessage: string,
	loading: boolean,
	coinPrice: any[],
	balances: WalletBalance[]
}

const initialState: CoinExchangeState = {
	error: false,
	errorMessage: '',
	loading: false,
	coinPrice: [],
	balances: [{
		currency: 'ETH',
		amount: 1000,
		blockchain: 'Ethereum',
		formatted: 'ETH 1000.00'
	}]
}

const CoinExchangeReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case GET_COIN_PRICE:
			state = {
				...state,
				loading: true,
				error: false
			}
			break
		case GET_COIN_PRICE_SUCCESS:
			const input = action.payload.data;
			const coinPrice: any = [];
			input.forEach((item: any)=>{
				const existing = coinPrice.find((c: any)=> c.currency == item.currency)
				if (existing === undefined){
					coinPrice.push(item);
				}
			})
			state = {
				...state,
				coinPrice,
				loading: false,
				error: false,
			}
			break;
		case API_COIN_EXCHANGE_ERROR:
			state = {
				...state,
				error: action.payload,
				loading: false,
			}
			break;		
		case DO_SWAP_COIN:
			state = {
				...state,
				loading: true,
				error: false,				
			}
			break;
		case DO_SWAP_COIN_SUCCESS:
			state = {
				...state,
				loading: false,
				error: false,				
			}
			break;
		default:
			state = { ...state }
			break
	}
	return state
}

export default CoinExchangeReducer