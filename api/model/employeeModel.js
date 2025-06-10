const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empName: { type: String },
  empEmail: { type: String },
  empMobile: { type: String },
  empStatus: { type: String },
  empPhoto: { type: String },
  empResume: { type: String }

});


const employeeModel = mongoose.model('Employee', employeeSchema);
module.exports = employeeModel;



