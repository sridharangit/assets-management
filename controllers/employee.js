const Employee = require('../models/employee');

// Show create form
exports.showCreateForm = (req, res) => {
  res.render('employee-create', { employee: null });
};

// Create new employee
exports.createEmployee = async (req, res) => {
  try {
    await Employee.create({
      c_name: req.body.name,
      c_email: req.body.email,
      c_branch: req.body.branch,
      n_status: req.body.status ? 1 : 0
    });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// Show edit form
exports.showEditForm = async (req, res) => {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return res.redirect('/employee');

    res.render('employee-create', { employee: emp });
  } catch (err) {
    res.redirect('/employee');
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    await Employee.update(
      {
        c_name: req.body.name,
        c_email: req.body.email,
        c_branch: req.body.branch,
        n_status: req.body.status ? 1 : 0
      },
      { where: { employee_id: req.params.id } }
    );
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// List employees
exports.listEmployee = async (req, res) => {
  const employees = await Employee.findAll();
  res.render('employee', { employee: employees });
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.destroy({ where: { employee_id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// getByid
exports.getByid = async (req, res) => {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if(!emp) return res.json({ success: false, error: 'Employee not found' });
    res.json({ success: true, employee: emp });
  } catch(err) {
    res.json({ success: false, error: err.message });
  }
};