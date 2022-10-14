const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');

// read all 
router.get('/', employeesController.getAll);

// read by id
router.get('/:id', employeesController.getSingle);

// create
router.post('/', employeesController.createEmployee);

module.exports = router;