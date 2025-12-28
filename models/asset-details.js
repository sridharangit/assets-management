const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('AssetDetail', {
  asset_id: { type: DataTypes.STRING, primaryKey:true },
  employee_id:   { type: DataTypes.INTEGER, allowNull:true },
  issue_reason:  { type: DataTypes.STRING },
  issue_date:    { type: DataTypes.DATE },
  return_reason: { type: DataTypes.STRING },
  return_date:   { type: DataTypes.DATE },
  scrap_reason:  { type: DataTypes.STRING },
  scrap_date:    { type: DataTypes.DATE },
  is_scrapped:   { type: DataTypes.INTEGER, defaultValue:0 }
},{
  tableName:'am_asset_details',
  timestamps:false
});
