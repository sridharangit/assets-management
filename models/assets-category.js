const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AssetCategory = sequelize.define('am_asset_category', {
  category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  c_name: { type: DataTypes.STRING, allowNull: false, unique: true },
  c_desc: { type: DataTypes.STRING },
  n_status: { type: DataTypes.INTEGER, defaultValue: 1 },
  d_createdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  d_updatedate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
},{
  timestamps: false,
  tableName: 'am_asset_category'
});

module.exports = AssetCategory;
