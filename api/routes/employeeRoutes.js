const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {v4:uuidv4} = require('uuid');

const Employee = require('../model/employeeModel');



const storage = multer.diskStorage({
	destination :function(req,file,cb)
	{
		cb(null,'images');
	},
	filename:function(req,file,cb)
	{
		cb(null,uuidv4() + '-' +Date.now()+path.extname(file.originalname));
	}
});

const fileFilter = (req,file,cb) => {
	const allowedFileTypes = ['image/jpeg','image/jpg','image/png','application/pdf'];
	
	if(allowedFileTypes.includes(file.mimetype)){
		cb(null,true);
	}
	else
	{
		cb(null,false);
	}
}

let upload = multer({storage,fileFilter});


//create


router.post('/create',upload.fields([{
  name: 'file', maxCount: 1
}, {
  name: 'pdf', maxCount: 1
}]),async(req,res) => {
console.log('ok');

//console.log(req.files.file[0].filename);
//console.log('req.files.file',req.files.file)
var pro_image = "";
if(typeof req.files.file !== 'undefined')
	{
		pro_image = req.files.file[0].filename;
	}
	else
	{
pro_image = "";
	}	
	
	var emp_resume = ""
	if(typeof req.files.pdf  !== 'undefined')
	{
		emp_resume = req.files.pdf[0].filename;
	}	
	else
	{
		emp_resume = "";
	}
	
const employee = new Employee({	
		empName : req.body.empName,
		empEmail : req.body.empEmail,
		empMobile: req.body.empMobile,
		empStatus: req.body.empStatus,
		empTiming: req.body.empTiming,
		empLocation: req.body.empLocation,
		empDob:req.body.empDob,
		//empPhoto:req.file.filename
		empPhoto:pro_image,
		empResume:emp_resume
	});


console.log('employee',employee)
  
  
const newEmployee = await employee.save();
  
  if (newEmployee) {
    return res
      .status(201)
      .send({ message: 'New Employee Inserted', 
	  data: newEmployee });
  }
  return res.status(500).send({ message: ' Error in Inserting Employee.' });
});



router.post('/create',async(req,res) => {
console.log('ok');
console.log(req.body);

});


//Get
router.get("/read",async (req,res) => {
	var findEmployee = await Employee.find();
res.json(findEmployee);
})



//Delete
router.delete('/:id', async (req, res) => {
  var deletedEmployee = await Employee.findById(req.params.id);
  if (deletedEmployee) {
     deletedEmployee = await deletedEmployee.remove();
   res.json( deletedEmployee );
  } else {
    res.send('Error in Deletion.');
  }
  
});


//Update
router.put("/:id",upload.fields([{
  name: 'file', maxCount: 1
}, {
  name: 'pdf', maxCount: 1
}]), async (req, res) => {
	

	console.log('updated',req.body);
	
	
	var pro_image = "";
if(typeof req.files.file !== 'undefined')
	{
		pro_image = req.files.file[0].filename;
	}
	else
	{
		pro_image = "";
	}	
	
	var emp_resume = ""
	if(typeof req.files.pdf  !== 'undefined')
	{
		emp_resume = req.files.pdf[0].filename;
	}	
	else
	{
		emp_resume = "";
	}
	

//console.log('pro_image',pro_image);
	//console.log('emp_resume',emp_resume);
	
	var dob = "";
	if(req.body.empDob !== null)
	{
		//  typeof req.file.filename=""
		 dob = req.body.empDob;	
	}
else
{
	 dob ="";
}	

	
	//var dob = "";
	
	/*console.log(req.body.empDob);
	
if(typeof req.body.empDob !== null)
{
console.log('ok')	
}	

if(typeof req.body.empDob != null)
{
console.log('ok')	
}	
*/

//console.log(req.body.empDob);


/*	
if(req.body.empDob !== null)
	{
		//  typeof req.file.filename=""
		 dob = req.body.empDob;	
	}
else
{
	 dob ="";
}	
	*/
	
	 
	 try {
    let updateEmployee = await Employee.findById(req.params.id);
    const data = {
		empName : req.body.empName,
		empEmail : req.body.empEmail,
		empMobile: req.body.empMobile,
		empStatus: req.body.empStatus,
		empTiming: req.body.empTiming,
		empLocation: req.body.empLocation,
		empDob:dob,
		empPhoto:pro_image,
		empResume:emp_resume
    };	


	
	//console.log('data===',data)	;
		
   updateEmployee= await Employee.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updateEmployee);
  } catch (err) {
    console.log(err);
  }

  
});


module.exports = router