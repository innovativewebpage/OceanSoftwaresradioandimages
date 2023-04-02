import React,{useState} from "react";

import { useSelector, useDispatch } from 'react-redux';
import { Form,Modal,Table  } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import { updateEmployee,deleteEmployee} from '../actions';

const EmployeeFetch = () => {
	
	const employee_data = useSelector((state)=>state.employee);
	//console.log('employee_data==',employee_data);
	const dispatch = useDispatch();
	
	let current_status = ['employee','unemployee'];	
	const [empStatus,setEmpStatus]=useState('');
	
	const [empTiming,setEmpTiming]=useState('');
	
const [availableLocation,setAvailableLocation]=useState(['Chennai','Bangalore','Hyderabad']);
const [empLocation,setEmpLocation]=useState([]);

const [file,setFile] = useState(null);
   const [fileName,setFileName] = useState("");
    const [pdf,setPdf] = useState(null);
   
 
//const availableLocation_myObj = Object.assign({},availableLocation);
 //console.log('availableLocation_myObj',availableLocation_myObj)


//const entries = Object.values([{availableLocation}]);

//console.log('entries',entries)

//const arrOfObj1 = Object.values(availableLocation);


  //console.log('arrOfObj1',arrOfObj1)

 //console.log('availableLocation',Object.keys(availableLocation));
 
 
	
	//var test=Object.keys(Refreshment).filter((a)=>Refreshment[a]);
//console.log('test',test);
	
 
 //const availableLocation_myObj = Object.assign({},availableLocation);

//console.log('availableLocation_myObj',availableLocation_myObj)

//availableLocation_myObj.Age=12;

//console.log('availableLocation_myObj',availableLocation_myObj)



//console.log('availableLocation_myObj[0]',availableLocation_myObj[0])

//const intersection = availableLocation.filter(element => empLocation.includes(element));


//console.log('intersection',intersection);


 
const [employeeDetails, setEmployeeDetails] = useState(null);
const [employeeDetailsModal, setEmployeeDetailsModal]=useState(false);	
	
	
	//console.log('employeeDetails==',employeeDetails)
	
	const downloadPdf = (employee) => {
				//console.log('employee',employee)
				
				
		    fetch('/imagesomar/'+employee.empResume).then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'Resume.pdf';
                alink.click();
            })
        })		
	}	

	
	const editEmployee = (employee) => {
		console.log('editEmployee',employee);
		
		const {empStatus,empTiming,empLocation, ...rest} = employee; 	
		//console.log('rest',rest);
		setEmployeeDetails(rest);
		setEmpStatus(empStatus);
		setEmpTiming(empTiming);
		setEmpLocation(empLocation);
		
		//setEmployeeDetails(employee);
		setEmployeeDetailsModal(true);
	};	
	
	
//console.log('employeeDetails',employeeDetails)
//console.log('empStatus',empStatus)	
	//console.log('empLocation',empLocation)
			

  const deleteEmployeeData = (employee) => {	
		dispatch(deleteEmployee(employee._id));
	};
	
	const handleCloseemployeeDetailsModal = () => {
		setEmployeeDetailsModal(false);
	};

	
	 const submitEmployeeEditForm = (e) => {
	 e.preventDefault();
	 
	 //console.log('empStatus==',empStatus)
	 //setEmployeeDetails({...employeeDetails,empStatus:empStatus});
 
 //setEmployeeDetails({...employeeDetails,empStatus:empStatus,empTiming:empTiming,empLocation:empLocation});
 //console.log('Edit employeeDetails==',employeeDetails);
 
 
// dispatch(updateEmployee(employeeDetails._id, {...employeeDetails,empStatus:empStatus,empTiming:empTiming,empLocation:empLocation}));


			const formData = new FormData();
			
			formData.append('empName',employeeDetails.empName);
			formData.append('empEmail',employeeDetails.empEmail);
			formData.append('empMobile',employeeDetails.empMobile);
			formData.append('empDob',employeeDetails.empDob);
			formData.append('empStatus',empStatus);
			formData.append('empTiming',empTiming);
			formData.append('empLocation',empLocation);	
			
			if(file)
			{	
			formData.append('file',file);
			}
			if(pdf)
			{
			formData.append('pdf',pdf);
			}
			
dispatch(updateEmployee(employeeDetails._id,formData));

setEmployeeDetailsModal(false);


 } 
 
 
 const handleChange = (e) => {
	  //console.log(e.target.name);
//console.log(e.target.type);
//console.log(e.target.value);
//console.log(e.target.checked);
//console.log('empLocation',empLocation);
if (e.target.checked === true) {
setEmpLocation([...empLocation,e.target.value] );			
setAvailableLocation(availableLocation);
			}
			else
			 {

let index = empLocation.indexOf(e.target.value);
empLocation.splice(index, 1);
setEmpLocation([...empLocation] );	
			 }

 }
  
 //console.log('empLocation==',empLocation) 
	
//console.log('employeeDetails==',employeeDetails)

const SaveFile = (e) => 
	{
		
	setFile(e.target.files[0]);
	setFileName(e.target.files[0].name);
	}
	
	 const SaveFilePdf = (e) => 
	{
	setPdf(e.target.files[0]);
	}
	
	//console.log('file',file)
	
	

  return (
    <div>
	
	

	
	
	
		<h3>Employee Fetch</h3>
		<pre>{/*JSON.stringify(employee_data, null, 2)*/}</pre>
	<table striped style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee Name</th>
            <th>Employee Email</th>
			<th>Employee Mobile</th>
			<th>Employee Current Status</th>
			<th>Employee Timings</th>
			<th>Employee Location</th> 
			<th>Employee Date of birth</th>
		 <th>Images</th>
		 <th>Download Images</th>
		 <th>Edit</th>
		 <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employee_data.length > 0
            ? employee_data.map((employee,index) => (
                <tr key={employee._id}>
                  <td>{index+1}</td>
                  <td>{employee.empName}</td>
				  <td>{employee.empEmail}</td> 
				  <td>{employee.empMobile}</td>
				  <td>{employee.empStatus}</td>
				  <td>{employee.empTiming }</td>
				  <td>{employee.empLocation.join(',')}</td>

					  
				  <td>{ employee.empDob ? moment(employee.empDob).format('DD-MM-YYYY'): '---' }</td>
	<td><img style={{ width: '70%' }} src={'/imagesomar/'+employee.empPhoto} alt='' />	
</td>		


	

<td><a onClick={() => downloadPdf(employee)}>
Download PDF
 </a>	
</td>	


<td><Button 
				  onClick={() => editEmployee(employee)}
				  variant="primary">Edit</Button></td>
				   <td><Button 
				   onClick={() => deleteEmployeeData(employee)}
				   variant="danger">Delete</Button></td>
  

			
                </tr>
              ))
            : 'no employee details'}
        </tbody>
      </table>


		<Modal show={employeeDetailsModal}
		onHide={handleCloseemployeeDetailsModal}
		onSubmit={submitEmployeeEditForm}
		>
	  
        <Modal.Header closeButton>
          <Modal.Title>Edit Course </Modal.Title>
        </Modal.Header>
        <Modal.Body>
		
	<Form>
		<Form.Group className="mb-3" >
			<Form.Label>Employee Name</Form.Label>
				<Form.Control type="text" value={employeeDetails ? employeeDetails.empName:''}
				onChange={(e) => setEmployeeDetails({ ...employeeDetails, empName: e.target.value })}  
			/>
		</Form.Group>
		
		<Form.Group className="mb-3" >
			<Form.Label>Employee Email</Form.Label>
				<Form.Control type="text" value={employeeDetails ? employeeDetails.empEmail:''}
				onChange={(e) => setEmployeeDetails({ ...employeeDetails, empEmail: e.target.value })}  
			/>
		</Form.Group>
		
		<Form.Group className="mb-3" >
			<Form.Label>Employee Mobile</Form.Label>
				<Form.Control type="text" value={employeeDetails ? employeeDetails.empMobile:''}
				onChange={(e) => setEmployeeDetails({ ...employeeDetails, empMobile: e.target.value })}  
			/>
		</Form.Group>
		
		
		<Form.Group className="mb-3" >
			<Form.Label>Employee Images</Form.Label>		
			  <input type='file'  onChange ={SaveFile}/>
	<td><img style={{ width: '40%' }} src={employeeDetails ? '/imagesomar/'+employeeDetails.empPhoto:''} alt='' />	
</td>
		</Form.Group>
		
		
		
		<Form.Group className="mb-3">
	 <Form.Label>Employee PDF</Form.Label>
	<input type='file' name="pdf" onChange ={SaveFilePdf}/>
		</Form.Group>			
	
		
		
	<Form.Group className="mb-3" >
			<Form.Label>Employee Status</Form.Label>

		{current_status.map(cur_sta =>(
		<>
			<input type="radio" value={cur_sta}  
			  checked={empStatus === cur_sta}
			onChange={(e)=>setEmpStatus(e.target.value)}
			/>
			<b style={{color:"red"}}>{cur_sta}</b>			
			
		</>		
			))}
		</Form.Group>
		

		
		<Form.Group className="mb-3">
 <Form.Label>Employee Timings</Form.Label>
			
			<select onChange={(e)=>setEmpTiming(e.target.value)} value={empTiming} >
            <option value="">Timings</option>
            <option value="parttime">Part Time</option>
            <option value="fulltime">Full Time</option>
          </select>
		</Form.Group>  
 
 
  <Form.Group className="mb-3">
		   <Form.Label>Employee Location</Form.Label>
		   
		  {availableLocation.map(avail_loc =>(
		<>
			<input type="checkbox" value={avail_loc}  
checked={empLocation.includes(avail_loc)}			 
			onChange={handleChange}
			/>
			 <b style={{color:"red"}}>{avail_loc}</b>			
		</>		
			))} 
		   
		   </Form.Group> 
		   
		   
  

	<Form.Group className="mb-3">
		<Form.Label> Date of joining</Form.Label>
		<DatePicker 
			onChange={(e) => setEmployeeDetails({ ...employeeDetails, empDob: e })}  
			value={employeeDetails ? moment(employeeDetails.empDob).format('DD-MM-YYYY'):''}
		/>
			<Button variant="primary" type="submit">
				Submit
			</Button>
			 </Form.Group>		
		</Form>
		</Modal.Body>
      </Modal>
	  
	  

	




    </div>
  );
};

export default EmployeeFetch;