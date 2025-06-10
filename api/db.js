// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();
// // const url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.asgxn.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
// const url = `mongodb+srv://OmarRizwanInfy:Infy@cluster0.vkhym.mongodb.net`;



// var db = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
// 	if (!err) {
// 		console.log("mongoose connection succedeed");
// 	}
// 	else {
// 		console.log("error in DB connection" + err);
// 	}
// });


const mongoose = require('mongoose');
const db = mongoose.connect("mongodb+srv://OmarRizwanInfy:Infy@cluster0.vkhym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
if (db) {
	console.log('mongoose connected successfully')
}
else {
	console.log('error in connection')
}

