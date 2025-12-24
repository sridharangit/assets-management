const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('am_employee', {
  employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  c_name: { type: DataTypes.STRING, allowNull: false },
  c_email: { type: DataTypes.STRING, allowNull: false },
  c_branch: { type: DataTypes.STRING },
  n_mobile: { type: DataTypes.STRING },
  n_status: { type: DataTypes.INTEGER, defaultValue: 1 }, // 1: Active, 0: Inactive
  n_deleted: { type: DataTypes.INTEGER, defaultValue: 1 },
  d_createdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  d_updatedate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Employee;