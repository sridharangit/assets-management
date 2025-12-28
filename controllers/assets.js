const Asset = require('../models/assets');
const Category = require('../models/assets-category');
const AssetDetail = require('../models/asset-details');

// Show create form
exports.showCreateForm = async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { n_status: 1 } });
    res.render('assets-create', { asset: null, editMode: false, categories });
  } catch (err) {
    res.redirect('/assets');
  }
};

// Create new asset
exports.createAsset = async (req, res) => {
  try {
    const catExists = await Category.findOne({ where: { c_name: req.body.type } });
    if (!catExists) return res.json({ success: false, error: 'Invalid Asset Category' });

    const newAsset = await Asset.create({
      c_serial: req.body.serial,
      c_type: req.body.type,
      c_make: req.body.make,
      c_model: req.body.model,
      c_branch: req.body.branch,
      n_value: req.body.n_value,
      asset_assigned: 0,
      n_status: req.body.status ? 1 : 0
    });

    // 🔥 Important: insert into details table also
    await AssetDetail.create({
      asset_id: newAsset.asset_id,
      employee_id: null,
      issue_reason: null,
      issue_date: null,
      return_reason: null,
      return_date: null,
      scrap_reason: null,
      scrap_date: null,
      is_scrapped: 0
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};


// Show edit form
exports.showEditForm = async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { n_status: 1 } });
    const ast = await Asset.findByPk(req.params.id);
    if (!ast) return res.redirect('/assets');

    res.render('assets-create', { asset: ast, editMode: true, categories });
  } catch (err) {
    console.error(err);
    res.redirect('/assets');
  }
};

// Update asset
exports.updateAsset = async (req, res) => {
  try {
    const catExists = await Category.findOne({ where: { c_name: req.body.type } });
    if (!catExists) return res.json({ success: false, error: 'Invalid Asset Category' });

    await Asset.update(
      {
        c_serial: req.body.serial,
        c_type: req.body.type,
        c_make: req.body.make,
        c_model: req.body.model,
        c_branch: req.body.branch,
        n_value: req.body.n_value,
        n_status: req.body.status ? 1 : 0,
        d_updatedate: new Date()
      },
      { where: { asset_id: req.params.id } }
    );

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// List all assets
exports.listAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll();
    const categories = await Category.findAll();
    res.render('assets', { assets, categories });
  } catch {
    res.redirect('/assets');
  }
};

// Delete asset
exports.deleteAsset = async (req, res) => {
  try {
    await Asset.destroy({ where: { asset_id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// Get asset by ID
exports.getById = async (req, res) => {
  try {
    const ast = await Asset.findByPk(req.params.id);
    if (!ast) return res.json({ success: false, error: 'Asset not found' });
    res.json({ success: true, asset: ast });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

exports.stockView = async (req, res) => {
  try {
    const stockAssets = await Asset.findAll({
      where: { asset_assigned: 0, n_status: 1 }
    });

    const summary = {};
    let totalValue = 0;

    stockAssets.forEach(a => {
      const value = parseFloat(a.n_value || 0);
      totalValue += value;
      const br = a.c_branch || 'Uncategorized';

      if(!summary[br]) summary[br] = { count: 0, value: 0 };
      summary[br].count++;
      summary[br].value += value;
    });

    res.render('stock-view', {
      assets: stockAssets,
      summary,
      totalValue,
      totalCount: stockAssets.length
    });

  } catch(err){
    console.error(err);
    res.send('Error loading stock view');
  }
};