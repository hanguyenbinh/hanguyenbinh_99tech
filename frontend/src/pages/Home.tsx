import { useDispatch } from "react-redux"
import { Button, Container } from "reactstrap"

import BreadCrumb from "../common/components/BreadCrumb"
import { useNavigate } from "react-router-dom"


const Home = (props: any) => {
	const navigate = useNavigate();


	const gotoProblem02 = () => {
		navigate('/coin-exchange');
	}

	const gotoProblem03 = () => {
		navigate('/problem03');
	}

	const gotoProblem06 = () => {
		navigate('/problem06');
	}

	return (
		<div className="page-content">
			<Container fluid>
				<BreadCrumb title={"Home"} />
				<div className="d-flex"><Button onClick={() => {
					gotoProblem02()
				}}>Problem 2: Fancy Form</Button></div>
				<div className="d-flex"><Button onClick={() => {
					gotoProblem03()
				}}>Problem 3: Messy React</Button></div>

				<div className="d-flex"><Button onClick={() => {
					gotoProblem06()
				}}>Problem 6: Architecture</Button></div>
			</Container>

		</div>
	)
}

export default Home