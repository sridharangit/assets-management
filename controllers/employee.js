const Employee = require('../models/employee');

exports.addEmployee = async (req, res) => {
  await Employee.create(req.body);
  res.redirect('/employee');
};

exports.listEmployee = async (req, res) => {
  const employee = await Employee.findAll();
  res.render('employee', { employee });
};

exports.showCreateForm = (req, res) => {
  res.render('employee-create');
};

