const express = require('express');
const router = express.Router();
const authorizationController = require('../controllers/authorization');

router.get("/login", authorizationController.login);
router.get("/callback", authorizationController.callback);

module.exports = router;