const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');

// read all 
router.get('/', employeesController.getAll);

// read by id
router.get('/:id', employeesController.getSingle);

// create
router.post('/', employeesController.createEmployee);

// update by id
router.put('/:id', employeesController.updateEmployee);

// delete by id
router.delete('/:id', employeesController.deleteEmployee);

module.exports = router;