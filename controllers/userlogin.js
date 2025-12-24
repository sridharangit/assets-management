const Employee = require('../models/userlogin');

exports.listUser = async (req, res) => {
  const employee = await Employee.findAll();
  res.render('login', { employee });
};