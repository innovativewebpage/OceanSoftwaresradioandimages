const express = require('express');
const router = express.Router();
const Employee = require('../model/employeeModel');



router.get('/read', async (req, res) => {
    let findEmployee = await Employee.find();
    res.json(findEmployee);
});

router.post('/create', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
    })
    const newEmployee = await employee.save();
    if (newEmployee) {
        return res.status(201).send({ message: 'inserted successfully', data: newEmployee })
    }
    else {
        return res.status(500).send('error in inserted data');
    }
})

router.delete('/:id', async (req, res) => {
    const deletedEmployee = await Employee.findById(req.params.id);
    if (deletedEmployee) {
        deletedEmployee = await deletedEmployee.remove();
    }
    else {
        console.log(`error is deletion`)
    }
})

router.put(':/id', async (req, res) => {
    try {
        let updateEmployee = await Employee.findById(req.params.id)
        const data = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
        }

        updateEmployee = await Employee.findByIdAndUpdate(req.params.id, data, { new: true })
        res.json(updateEmployee)
    }
    catch (err) {
        console.log(err);
    }

})

