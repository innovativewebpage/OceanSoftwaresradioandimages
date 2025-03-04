import React from 'react';
import { Row, Col, Container } from "react-bootstrap";
import Employee from './components/EmployeeFrontPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<div className="App">
			<Container>
				<Row>
					<Col md={12}><Employee /></Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
