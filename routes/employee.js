const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee');

router.get('/', employeeController.listEmployee);
router.get('/create', employeeController.showCreateForm);
// router.post('/create', employeeController.createEmployee);

module.exports = router;
