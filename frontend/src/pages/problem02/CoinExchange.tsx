
import { Formik } from "formik"
import React from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CoinExchangeForm from "./Forms/CoinExchangeForm"
import BreadCrumb from "../../common/components/BreadCrumb"
import * as Yup from 'yup';
import { getCoinPrice } from "../../store/actions"
import { RootState } from "../.."
import { Spinner } from "reactstrap"



function CoinExchange(props: any) {
	const T = props.t ? props.t : (v: any) => v;
	const dispatch = useDispatch();
	const formikRef: any = useRef()
	useEffect(() => {
		dispatch(getCoinPrice());
	}, [])

	const { coinPrice, loading } = useSelector((state: RootState) => ({
		coinPrice: state.CoinExchangeReducer.coinPrice,
		loading: state.CoinExchangeReducer.loading
	  }));

	const initialValues = React.useMemo(() => {
		return {
			fromCurrency: '',
			fromAmount: 0,
			toCurrency: '',
			toAmount: 0,
		}
	}, [])
	useEffect(()=>{
	}, [loading])

	const validationSchema = React.useMemo(() => {
		return Yup.object().shape({
			fromCurrency: Yup.string()
				.min(2, 'Too Short!')
				.max(10, 'Too Long!')
				.required('Required'),
			fromAmount: Yup.number()
				.min(0, 'Too small!')
				.required('Required')
				.typeError('Incorrect number'),
			toCurrency: Yup.string()
				.min(2, 'Too Short!')
				.max(10, 'Too Long!')
				.required('Required'),
			toAmount: Yup.number()
				.min(0, 'Too small!')
				.required('Required')
				.typeError('Incorrect number'),

		});
	}, [])
	const handleSubmit = (values: any, { setSubmitting }: any) => {
		setSubmitting(true);
		const fromRate = coinPrice.find((item: any)=>item.currency === values.fromCurrency)
		const toRate = coinPrice.find((item: any)=>item.currency === values.toCurrency)
		console.log(fromRate, toRate)
		const fromAmout = values.fromAmount;
		const toAmount = (fromRate.price * fromAmout) / toRate.price;
		setSubmitting(false);
		console.log('handleSubmit',toAmount)
	}

	useEffect(() => {
		formikRef.current.resetForm({
			values: initialValues
		});
	}, [initialValues])

	return (
		<div>
			{loading ? <Spinner>loading ...</Spinner>:null }
			<BreadCrumb title={"Problem 2: Fancy Form"} />
			<Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
				<CoinExchangeForm />
			</Formik>
		</div>

	)
}
export default CoinExchange