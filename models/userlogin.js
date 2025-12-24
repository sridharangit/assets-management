const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserLogin = sequelize.define('am_user', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  c_name: { type: DataTypes.STRING, allowNull: false },
  c_email: { type: DataTypes.STRING, allowNull: false },
  n_mobile: { type: DataTypes.STRING },
  c_password: { type: DataTypes.STRING },
  n_status: { type: DataTypes.INTEGER, defaultValue: 1 }, // 1: Active, 0: Inactive
  n_deleted: { type: DataTypes.INTEGER, defaultValue: 1 },
  d_createdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  d_updatedate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = UserLogin;