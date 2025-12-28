const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('am_assets', {
  asset_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  c_serial: { type: DataTypes.STRING, allowNull: false, unique: true },
  c_type: { type: DataTypes.STRING, allowNull: false },
  c_make: { type: DataTypes.STRING },
  c_model: { type: DataTypes.STRING },
  c_branch: { type: DataTypes.STRING },
  n_value: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  asset_assigned: { type: DataTypes.INTEGER, defaultValue: 0 }, // 0 = Stock, 1 = Assigned
  n_status: { type: DataTypes.INTEGER, defaultValue: 1 },
  d_createdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  d_updatedate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Asset;
