import React,{useState,useEffect,useRef} from "react";
import { useDispatch } from 'react-redux';
import {Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { employeeInsert } from '../actions';


const EmployeeForm = () => {

	let current_status = ['employee','unemployee'];	
	 
   const [file,setFile] = useState(null);
   const [fileName,setFileName] = useState("");
   
   const [pdf,setPdf] = useState(null);
   const [pdfName,setPdfName] = useState("");
   
   
   const [empName,  setEmpName] = useState('');
   const [empEmail, setEmpEmail] = useState('');
   const [empMobile, setEmpMobile] = useState('');
   const [empDob,   setEmpDob] = useState('');
   const [empStatus,setEmpStatus]=useState('');
   const [empTiming,setEmpTiming]=useState('');
   const [empLocation,setEmpLocation]=useState([]);
   
   //console.log('empLocation',empLocation)
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);
   const inputRef = useRef(null);
   const pdfRef = useRef(null);
   
   const handleCheckBox = e => {
	//console.log(e.target.checked)
	if (e.target.checked === true) {				
	   setEmpLocation([...empLocation,e.target.value ]);	
   }	
	else
	 {	
	   let index = empLocation.indexOf(e.target.value);
	   console.log('index==',index)
	   let spliced = empLocation.splice(index, 1);
	   setEmpLocation([...empLocation] );			
	}
  }
  
   
   //console.log('empTiming',empTiming)
console.log('file',file);
console.log('fileName',fileName);

   const dispatch = useDispatch();  
   
    const clear = () => {
 setEmpName('');
 setEmpEmail('');
 setEmpMobile('');
 setEmpDob('');
 setEmpStatus('');
inputRef.current.value = '';
  pdfRef.current.value = '';
  }
   
   const Insert = (e) => {
        e.preventDefault();
		//console.log('empName',empName)
			const user = {
				empName,empEmail,empMobile,fileName,pdfName,
				}
			setFormErrors(validate(user));	
			console.log('formErrors',formErrors);
				setIsSubmit(true);	
	}
	
	if(Object.keys(formErrors).length === 0 && isSubmit)
	{
//console.log('formErrors',formErrors);
	const formData = new FormData();
			formData.append('empName',empName);
			formData.append('empEmail',empEmail);
			formData.append('empMobile',empMobile);
			formData.append('empDob',empDob);
			formData.append('empStatus',empStatus);
			formData.append('empTiming',empTiming);
			formData.append('empLocation',empLocation);	
			formData.append('file',file);
			formData.append('pdf',pdf);
			dispatch(employeeInsert(formData));
			setIsSubmit(false);	
				clear();
		
	}		
	
	
	
	
	
	//console.log('formErrors',formErrors);
	//console.log('formErrors.length==',Object.keys(formErrors).length);
	
	
	
	/*(if(Object.keys(formErrors).length == 0)
	{
			const formData = new FormData();
			formData.append('empName',empName);
			formData.append('empEmail',empEmail);
			formData.append('empMobile',empMobile);
			formData.append('empDob',empDob);
			formData.append('empStatus',empStatus);
			formData.append('empTiming',empTiming);
			formData.append('empLocation',empLocation);	
			formData.append('file',file);
			formData.append('pdf',pdf);
			//console.log('formData==',formData)
			//dispatch(employeeInsert(user));
			dispatch(employeeInsert(formData));
			//clear();
		
	}
	*/
	/*const formData = new FormData();
			formData.append('empName',empName);
			formData.append('empEmail',empEmail);
			formData.append('empMobile',empMobile);
			formData.append('empDob',empDob);
			formData.append('empStatus',empStatus);
			formData.append('empTiming',empTiming);
			formData.append('empLocation',empLocation);	
			formData.append('file',file);
			formData.append('pdf',pdf);
			//console.log('formData==',formData)
			//dispatch(employeeInsert(user));
			dispatch(employeeInsert(formData));
			clear();
	
	console.log('formErrors',formErrors);
	*/
	
	
  


   const SaveFile = (e) => 
	{

		
	setFile(e.target.files[0]);
	setFileName(e.target.files[0].name);
	}
	
	 const SaveFilePdf = (e) => 
	{
	setPdf(e.target.files[0]);
	setPdfName(e.target.files[0].name);
	}


	
//console.log('pdf',pdf)
	
	
	 const validate = (user) => {
	  console.log('validate',user)
	  
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
	
	
		if (!user.empName) {
			errors.empName = "Employee Name is required!";
		}
		
		if(!user.empEmail) {
				errors.empEmail = "Email is required!";
			} 
			else if (!regex.test(user.empEmail)) {
					errors.empEmail = "This is not a valid email format!";
			}
	
	
	if (!user.empMobile) {
			errors.empMobile = "Mobile is required!";
		}
		else if (user.empMobile.length < 10) {
      errors.empMobile = "mobile should be 10 characters";
    } 
	
	if (!user.fileName) {
			errors.fileName = "Pic is required!";
		}
 else if(!user.fileName.match(/\.(jpg|jpeg)$/)) {
  errors.fileName = "Format is not ok!";
  
 }
	
	if (!user.pdfName) {
			errors.pdfName = "Resume is required!";
		}
 else if(!user.pdfName.match(/\.(pdf)$/)) {
  errors.pdfName = "Format is not ok!";
  
 }
	
	

	
		/*else if (values.username.length < 4) {
      errors.username = "username must be more than 4 characters";
    } 
	
		if(!values.email) {
				errors.email = "Email is required!";
			} 
			else if (!regex.test(values.email)) {
					errors.email = "This is not a valid email format!";
			}
	
	 if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } */
	return errors;
  };



	
	
	
	/*useEffect(() => {
   // console.log('formErrors==',formErrors);
    if (Object.keys(formErrors).length === 0) {
     // console.log('formValues==',formValues);
	 
    }	
  }, [formErrors]);*/

	
  return (
    <div>
      
	  
	  
	  
	<Form onSubmit={Insert}>
		<Form.Group className="mb-3" >
			<Form.Label>Employee Name</Form.Label>
			<Form.Control type="text" placeholder="Enter Employee Name" 
				value={empName}
				onChange={(e) => setEmpName(e.target.value)}
			/>
		</Form.Group>
		<p className="Test">{formErrors.empName}</p>

		<Form.Group className="mb-3">
			<Form.Label>Employee Email</Form.Label>
			<Form.Control type="text" placeholder="Enter Employee Email" 
			value={empEmail}
			onChange={(e) => setEmpEmail(e.target.value)}
			/>
		</Form.Group>
  <p className="Test">{formErrors.empEmail}</p>
  
		<Form.Group className="mb-3">
			<Form.Label>Employee Mobile</Form.Label>
			<Form.Control type="text" placeholder="Enter Employee Mobile" 
			value={empMobile}
			onChange={(e) => setEmpMobile(e.target.value)}
		/>
	</Form.Group>
	
	<p className="Test">{formErrors.empMobile}</p>
	
	<br/>
	
	
	<Form.Group className="mb-3">
	 <Form.Label>Employee Image</Form.Label>
	<input type='file' ref={inputRef}    onChange ={SaveFile}/>
		</Form.Group>
	<p className="Test">{formErrors.fileName}</p>	
		


	<Form.Group className="mb-3">
	 <Form.Label>Employee PDF</Form.Label>
	<input type='file' ref={pdfRef}  name="pdf" onChange ={SaveFilePdf}/>
		</Form.Group>			
	<p className="Test">{formErrors.pdfName}</p>
	
	
	 <Form.Group className="mb-3">
	 <Form.Label>Employee Status</Form.Label>
	
	{current_status.map(cur_sta =>(
		<>
			<input type="radio" value={cur_sta} 
			name="radiovalues" checked={empStatus === cur_sta}
			onChange={(e)=>setEmpStatus(e.target.value)}
			/>
				<b style={{color:"blue"}}>{cur_sta}</b>
		</>		
			))}
			
			</Form.Group>	  
		  
		
  <br></br>
 

 <Form.Group className="mb-3">
 <Form.Label>Employee Timings</Form.Label>
		<select value={empTiming} onChange={(e)=>setEmpTiming(e.target.value)}>
            <option value="">Timings</option>
            <option value="parttime">Part Time</option>
            <option value="fulltime">Full Time</option>
          </select>
	</Form.Group>	  
		  
		  
		  
		   <Form.Group className="mb-3">
		   <Form.Label>Employee Location</Form.Label>
			   <input type="checkbox" value="Chennai" 
			   onChange={e => handleCheckBox(e)}/>
				 Chennai
				 
				 <input type="checkbox" value="Bangalore" 
			   onChange={e => handleCheckBox(e)}/>
				 Bangalore
				 
				 <input type="checkbox" value="Hyderabad" 
			   onChange={e => handleCheckBox(e)}/>
				 Hyderabad
				 </Form.Group>
			   
			
 
 
<Form.Group className="mb-3">
<Form.Label> Date of joining</Form.Label>
  	<DatePicker selected = {empDob}
			onChange= {date => setEmpDob(date)} 
			dateFormat= 'dd-MM-yyyy'
			isClearable
			showYearDropdown
			scrollableMonthYearDropdown
			/>
	 </Form.Group>		




  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
    
	  
	  
    </div>
  );
};

export default EmployeeForm;