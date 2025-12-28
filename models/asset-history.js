const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('AssetHistory', {
  history_id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
  asset_id:  { type:DataTypes.STRING },
  employee_id:{ type:DataTypes.INTEGER, allowNull:true },
  action:     { type:DataTypes.STRING },
  reason:     { type:DataTypes.STRING },
  action_date:{ type:DataTypes.DATE }
},{
  tableName:'am_asset_history',
  timestamps:false
});
