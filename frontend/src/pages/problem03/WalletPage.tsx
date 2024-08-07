import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import classes from "./problem03.module.scss"
import WalletRow from "./Components/WalletRow";
import { getCoinPrice } from "../../store/coinExchange/actions";


export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
  formatted: string;
}
interface Props {
  children: any

}
const priorities: any = {
  'Osmosis': 100,
  'Ethereum': 50,
  'Arbitrum': 30,
  'Zilliqa': 20,
  'Neo': 20,
}
const getPriority = (blockchain: string) => {
  return priorities[blockchain] ?? -99;
}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoinPrice());
  }, [])
  const { balances, coinPrice, loading } = useSelector((state: RootState) => ({
    balances: state.CoinExchangeReducer.balances,
    coinPrice: state.CoinExchangeReducer.coinPrice,
    loading: state.CoinExchangeReducer.loading
  }));
  useEffect(() => {
  }, [coinPrice, balances])
  console.log(balances)



  const sortedBalances = balances.filter((balance: WalletBalance) => {
    const balancePriority = getPriority(balance.blockchain);
    console.log('afsafsafsafd', balancePriority, balance.amount)
    if (balancePriority > -99) {
      if (balance.amount > 0) {
        return true;
      }
    }
    return false
  }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
    const leftPriority = getPriority(lhs.blockchain);
    const rightPriority = getPriority(rhs.blockchain);
    if (leftPriority > rightPriority) {
      return -1;
    } else {
      return 1;
    }
  });

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })
  
  const _getCoinPrice = (currency: string) => coinPrice.find(item => item.currency == currency)
  console.log(sortedBalances)

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    console.log(balance)
    const coin = _getCoinPrice(balance.currency);
    if (!coin) return;
    console.log('coin', coin, coinPrice)
    const price = coin.price;
    const usdValue = parseFloat(price) * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}

export default WalletPage