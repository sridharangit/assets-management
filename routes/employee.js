const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee');

router.get('/create', employeeController.showCreateForm);
router.post('/create', employeeController.createEmployee);

router.get('/edit/:id', employeeController.showEditForm);
router.post('/edit/:id', employeeController.updateEmployee);

router.get('/', employeeController.listEmployee);
router.post('/delete/:id', employeeController.deleteEmployee);
router.get('/get/:id', employeeController.getByid);

module.exports = router;
