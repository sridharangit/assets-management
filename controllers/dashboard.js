const { Op } = require('sequelize');
const Asset = require('../models/assets');
const Category = require('../models/assets-category');
const AssetDetail = require('../models/asset-details');
const Employee = require('../models/employee');

exports.dashboardPage = async (req, res) => {
  try {
    const totalEmployees = await Employee.count({ where: { n_status: 1 }});
    const totalCategories = await Category.count({ where: { n_status: 1 }});
    const totalAssets = await Asset.count({ where: { n_status: 1 }});

    const assignedCount = await AssetDetail.count({
      where: { employee_id: { [Op.ne]: null }, is_scrapped: 0 }
    });

    const notAssignedCount = await AssetDetail.count({
      where: { employee_id: null, is_scrapped: 0 }
    });

    const scrappedCount = await AssetDetail.count({ where: { is_scrapped: 1 }});

    res.render('dashboard', {
      totalEmployees,
      totalCategories,
      totalAssets,
      assignedCount,
      notAssignedCount,
      scrappedCount
    });

  } catch (err) {
    console.error(err);
    res.render('dashboard', {
      totalEmployees: 0,
      totalCategories: 0,
      totalAssets: 0,
      assignedCount: 0,
      notAssignedCount: 0,
      scrappedCount: 0
    });
  }
};
