const express = require('express');
const router = express.Router();
const loadUser = require('../middleware/loadUser');

const secureController = require('../controllers/secure');

// for security
router.use([loadUser]);

// read all 
router.get('/', secureController.getAll);

module.exports = router;