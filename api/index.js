const express = require('express')
const app = express();
const path = require("path");

const db = require('./db');

app.use(express.json());






app.get('/',function(req,res)
{
		res.send('working');
});



const EmployeeRoute = require('./routes/employeeRoutes');
app.use('/api/employee',EmployeeRoute);

app.use('/imagesomar', express.static(path.join(__dirname, 'images')));


var port=process.env.PORT

app.listen(port,function(){
	console.log('server start on port=='+ port );
});

