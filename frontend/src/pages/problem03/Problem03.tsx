import { useState } from "react";
import { Button, Card, CardBody, Col, Collapse, Row } from "reactstrap";
import WalletPage from "./WalletPage";
import { useNavigate } from "react-router-dom";

function Problem03(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  return (
    <div>

      <Row>

        <Col xs={6}>
          <Button style={{ marginBottom: '1rem' }} onClick={
            () => navigate('/home')
          }>Return home</Button>
          <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
            View the wrong code
          </Button>
          <Collapse isOpen={isOpen} {...props}>
            <Card>
              <CardBody>
                <pre><code>{
                  `
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
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
				`}
                </code></pre>
              </CardBody>
            </Card>
          </Collapse>
        </Col>

        <Col xs={6}>
          <Row className="bg-primary text-light align-items-center justify-content-center" style={{ height: 36 }}>
            Result
          </Row>
          <Row>
            <WalletPage children={[]}></WalletPage>
          </Row>

          <Row>
            Explaination
          </Row>
          <Row>
            <pre><code>{
              `# Hometest backend

BoxProps is undefined, I remove it first.
Add children property for Props class.
Remove FormattedWalletBalance interface because it is not necessary
Refactor these lines:
        const balances = useWalletBalances();
        const prices = usePrices();
    to
        const { balances, coinPrice } = useSelector((state: RootState) => ({
            balances: state.CoinExchangeReducer.balances,
            coinPrice: state.CoinExchangeReducer.coinPrice,
        }));
    because maybe the data need to be get from API server.
Refactor these line:
    	const getPriority = (blockchain: any): number => {
            switch (blockchain) {
                case 'Osmosis':
                return 100
                case 'Ethereum':
                return 50
                case 'Arbitrum':
                return 30
                case 'Zilliqa':
                return 20
                case 'Neo':
                return 20
                default:
                return -99
            }
        }
    to use object literal , not because the performance , but it is more beautiful code.
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
    remove useMemo, balance and price need to be updated in real-time, and the data is not large enough to be cached at front end
    correct sort balance, and small issues at some line of code
    add class WalletRow

In the reality, this kind of code will not be seen, due to it can not run.
But the code need to be clear to easy for maintain, transfer, and fix bugs, ofcourse, the goal is to save the development time, the cost of development.
Many companies review the developers code before merge.
I think if the company start some training course, tech talk about clean code and clean architechture for their members. It helps increase knowledge of members , and understand some policies about sourcecode management (review, naming invention, coding invention, Resful rules), so they are easily to follow the policies.`}
            </code></pre>


          </Row>
        </Col>
      </Row>

    </div>

  )
}
export default Problem03