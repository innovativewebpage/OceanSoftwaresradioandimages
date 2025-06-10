const express = require('express')
const app = express();
const path = require("path");
const db = require('./db');
app.use(express.json());
// app.get('/', function (req, res) {
// 	res.send('working');
// });
const EmployeeRoute = require('./routes/employeeRoutes');
app.use('/api/employee', EmployeeRoute);
app.use('/imagesomar', express.static(path.join(__dirname, 'images')));
// var port = process.env.PORT
var port = 5000;
const a = "production";
if (a == 'production') {
	console.log(a);
	app.use(express.static(path.join(__dirname, '../client/my-app/build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client/my-app/build/index.html'))

	})

}

app.listen(port, function () {
	console.log('server start on port==' + port);
});

