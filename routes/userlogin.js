const express = require('express');
const router = express.Router();
const userloginController = require('../controllers/userlogin');

router.get('/', userloginController.listUser);

module.exports = router;
