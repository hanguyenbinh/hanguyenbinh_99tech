
import {
    Col,

    Row,
} from "reactstrap"
import classes from "./WalletRow.module.scss"


function WalletRow(props: any) {
    return (
        <Col
            className={props.className + ' ' + classes.cointainer}
        >
            <Row>
                <Col>
                    Amount
                </Col>
                <Col>
                    {props.formattedAmount}
                </Col>
            </Row>
            <Row>
                <Col>
                    Usd value:
                </Col>
                <Col>
                    {props.usdValue}
                </Col>
            </Row>
        </Col>

    )
}

export default WalletRow