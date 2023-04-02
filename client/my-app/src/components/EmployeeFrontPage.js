import React,{useEffect}  from 'react';
import {useDispatch} from 'react-redux';
import {Container,Row,Col} from "react-bootstrap";


import EmployeeFetch from './EmployeeFetch';
import EmployeeForm from './EmployeeForm';
import { getEmployeeInitialData } from '../actions';


function EmployeeFrontPage() {

const dispatch = useDispatch();
	
useEffect(() => {
   dispatch(getEmployeeInitialData()); 
  }); 
  	
	
  return (
    <div className="App">
	<div className="front">		
		<Container>
			<Row>
				<Col sm={8}><EmployeeFetch/> </Col>
				
			</Row>

			<Row>		
				<Col sm={4}><EmployeeForm/> </Col>
			</Row>
		</Container>
	</div>
			
    </div>
  );
}

export default EmployeeFrontPage;
