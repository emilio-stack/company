const express = require('express');
const router = express.Router();
const openCors = require("../middleware/openCors");

router.use(openCors);
router.use('/employees', require('./employees'));
router.use('/jobsites', require('./jobsites'));
router.use('/api-docs', require('./docs'));
router.use('/authorization', require('./authorization'));

module.exports = router;