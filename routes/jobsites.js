const express = require('express');
const router = express.Router();

const jobsitesController = require('../controllers/jobsites');

// read all 
router.get('/', jobsitesController.getAll);

// read by id
router.get('/:id', jobsitesController.getSingle);

// create
router.post('/', jobsitesController.createJobsite);

module.exports = router;