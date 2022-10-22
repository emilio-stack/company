const express = require('express');
const router = express.Router();

const jobsitesController = require('../controllers/jobsites');

// read all 
router.get('/', jobsitesController.getAll);

// read by id
router.get('/:id', jobsitesController.getSingle);

// create
router.post('/', jobsitesController.createJobsite);

// update
router.put('/:id', jobsitesController.updateJobsite);

// delete
router.delete('/:id', jobsitesController.deleteJobsite);

module.exports = router;