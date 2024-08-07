
    import { useFormikContext } from "formik"
    import { useEffect } from "react"
    import { useSelector } from "react-redux"

    import classes from "./CoinExchange.module.scss"

    import {
      Button,
      Card,
      CardBody,
      Col,
      Container,
      FormGroup,
      Input,
      Label,
      Row,
    } from "reactstrap"
    import { FormValues } from "../../../common/types/FormValues.types"
    import { RootState } from "../../.."
    import { useNavigate } from "react-router-dom"
    import { isEmpty } from "lodash"


    function CoinExchangeForm() {
      const navigate = useNavigate();

      const { coinPrice, error } = useSelector((state: RootState) => ({
        coinPrice: state.CoinExchangeReducer.coinPrice,
        error: state.CoinExchangeReducer.error
      }));

      const { isSubmitting, values, errors, setFieldValue, handleChange, handleBlur, touched, submitForm } = useFormikContext<FormValues>();
      const updateReceivedAmount = () => {
        if (isEmpty(values.fromCurrency) || isEmpty(values.fromAmount) || isEmpty(values.toCurrency) ) return;
        const fromRate = coinPrice.find((item: any)=>item.currency === values.fromCurrency)
        const toRate = coinPrice.find((item: any)=>item.currency === values.toCurrency)
        console.log(fromRate, toRate)
        const fromAmout = parseFloat(values.fromAmount);
        const toAmount = (fromRate.price * fromAmout) / toRate.price;
        setFieldValue('toAmount', toAmount)
      }

      useEffect(() => {
        updateReceivedAmount();

      }, [coinPrice, values])
      return (
        <div className="page-content">
          <Container fluid>
            <Row className="mb-4">
              <Col sm={12} md={8}>
                <Card className="mb-0">
                  <CardBody>
                    <FormGroup>
                      <Label>Coin</Label>
                      <Input
                        name="fromCurrency"
                        className="form-control"
                        placeholder="Currency"
                        type="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fromCurrency ? values.fromCurrency : ''}
                        invalid={
                          touched.fromCurrency && errors.fromCurrency ? true : false
                        }
                      >
                        <option value={''}>---------</option>
                        {
                          coinPrice.map((coin: any) => <option key={coin.currency} value={coin.currency}>{coin.currency}</option>)
                        }
                      </Input>
                      {errors && errors.fromCurrency ? (<div className={classes.formErrorMessage}> * {errors.fromCurrency} </div>) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label>Amount to send</Label>
                      <Input
                        name="fromAmount"
                        className="form-control"
                        placeholder="Amount"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fromAmount}
                        invalid={
                          touched.fromAmount && errors.fromAmount ? true : false
                        }
                      />
                      {errors && errors.fromAmount ? (<div className={classes.formErrorMessage}> * {errors.fromAmount} </div>) : null}
                    </FormGroup>

                  </CardBody>
                </Card>
              </Col>
              <Col sm={12} md={8}>
                <Card className="mb-0">
                  <CardBody>
                    <FormGroup>
                      <Label>Coin</Label>
                      <Input
                        name="toCurrency"
                        className="form-control"
                        placeholder="Currency"
                        type="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.toCurrency ? values.toCurrency : ''}
                        invalid={
                          touched.toCurrency && errors.toCurrency ? true : false
                        }
                      >
                        <option value={''}>---------</option>
                        {
                          coinPrice.map((coin: any) => <option key={coin.currency} value={coin.currency}>{coin.currency}</option>)
                        }
                      </Input>
                      {errors && errors.toCurrency ? (<div className={classes.formErrorMessage}> * {errors.toCurrency} </div>) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label>Amount to receive</Label>
                      <Input
                        disabled
                        name="toAmount"
                        className="form-control"
                        placeholder="Amount"
                        type="text"
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        value={values.toAmount}
                        invalid={
                          touched.toAmount && errors.toAmount ? true : false
                        }
                      />
                      {errors && errors.toAmount ? (<div className={classes.formErrorMessage}> * {errors.toAmount} </div>) : null}
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col sm={12} md={8}>
                <div className="d-flex align-items-center justify-content-end">
                  {/* <Button disabled={isSubmitting && error === false} onClick={submitForm} className="me-2">Save</Button> */}
                  <Button onClick={
                    () => navigate('/home')
                  }>Return home</Button>
                </div>

              </Col>
            </Row>
          </Container>
        </div >
      )
    }

    export default CoinExchangeForm