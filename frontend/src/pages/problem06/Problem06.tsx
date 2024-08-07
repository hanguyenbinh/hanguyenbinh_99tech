import { useState } from "react";
import { Button, Card, CardBody, Col, Collapse, Row } from "reactstrap";
import systemDiagram from '../../images/system-diagram.png'
import { useNavigate } from "react-router-dom";
function Problem06(props: any) {
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
						View the document
					</Button>
					<Collapse isOpen={isOpen} {...props}>
						<Card>
							<CardBody>
								<pre><code>{
									`
u
## Documentation

Backend for user's score management

### API documnent:
##### Using Resful standard implement API.
##### JWT authentication for authenticate users.
#### API list:
- Get Users: method Get. Get list of users with pagination, limit 20 records.
- Get User by Id: method Get. Get the user data by user id.
- Update User: method Put. update user data by user id.
- Remove User: method Del. remove user data by user id. Soft remove is required

#### Note
- All reponses from backend should follow this format, including exception:
    response: {
        status: boolean
        message: string, ex: "GET_DATA_SUCCESS" => the message should be in key format, to manipulate for multilingual  function at frontend
        data: needed data, can be any object
    }
- Implement middleware to catch all exception, identify some known exceptions like database exception, ... and create a message as instruction for unknow exception.
- Using MVC pattern. Define DTO for all API. 
- API name should be follow RESTFUL rules, check more here: https://restfulapi.net/resource-naming/

				`}
								</code></pre>
							</CardBody>
						</Card>
					</Collapse>
				</Col>
				<Col xs={6}>
					<img src={systemDiagram} alt="Diagram" />
				</Col>

			</Row>

		</div>

	)
}
export default Problem06