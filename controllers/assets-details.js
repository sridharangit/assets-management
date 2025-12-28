const Asset = require('../models/assets');
const AssetDetail = require('../models/asset-details');
const AssetHistory = require('../models/asset-history');
const Employee = require('../models/employee');

async function log(asset_id, employee_id, action, reason){
  await AssetHistory.create({ asset_id, employee_id, action, reason, action_date:new Date() });
}

//Issue
exports.showIssueForm = async (req, res) => {
  try {
    const employees = await Employee.findAll({ where: { n_status: 1 } });
    const assets = await Asset.findAll({ where: { n_status: 1 } });

    const details = await AssetDetail.findAll({ where: { employee_id: null, is_scrapped: 0 } });

    console.log("Assets:", assets.map(a => a.asset_id));
    console.log("Details:", details.map(d => d.asset_id));

    const available = assets.filter(a =>
      details.some(d => d.asset_id == a.asset_id)
    );

    console.log("Available:", available);

    res.render('issue-asset', { employees, assets: available });
  } catch (err) {
    console.error(err);
    res.render('issue-asset', { employees: [], assets: [] });
  }
};

exports.issueAsset = async (req, res) => {
  try {
    const empId   = parseInt(req.body.employee_id);
    const assetId = req.body.asset_id;
    const reason  = req.body.reason.trim();

    await AssetDetail.update(
      { employee_id: empId, issue_reason: reason, issue_date: new Date(), asset_assigned: 1 },
      { where: { asset_id: assetId } }
    );

    await Asset.update(
      { asset_assigned: 1, d_updatedate: new Date() },
      { where: { asset_id: assetId } }
    );

    await log(assetId, empId, 'ISSUE', reason);
    res.json({ success: true });

  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// 6. Return
exports.showReturnForm = async (req,res)=>{
  const employees = await Employee.findAll({ where:{ n_status:1 }});
  const assets = await Asset.findAll({ where:{ asset_assigned:1, n_status:1 }});
  res.render('return-asset', { employees, assets });
};

exports.returnAsset = async (req, res) => {
  try {
    const empId = parseInt(req.body.employee_id);
    const assetId = req.body.asset_id;
    const reason = req.body.reason.trim();

    await AssetDetail.update(
      { employee_id: null, return_reason: reason, return_date: new Date() },
      { where: { asset_id: assetId } }
    );

    await Asset.update(
      { asset_assigned: 0, d_updatedate: new Date() },
      { where: { asset_id: assetId } }
    );

    await log(assetId, empId, 'RETURN', reason);

    res.json({ success: true });

  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// Scrap
exports.showScrapForm = async (req,res)=>{
  const assets = await AssetDetail.findAll({ where:{ is_scrapped:0 }});
  res.render('scrap-asset', { assets });
};

exports.scrapAsset = async (req,res)=>{
  try{
    const assetId = req.body.asset_id;
    const reason  = req.body.reason.trim();

    await AssetDetail.update({ is_scrapped:1, scrap_reason:reason, scrap_date:new Date() }, { where:{ asset_id:assetId }});
    await log(assetId, null, 'SCRAP', reason);

    res.json({ success:true });
  }catch(err){ res.json({ success:false, error:err.message }); }
};

// Asset History
exports.showAssetHistory = async (req, res) => {
  try {
    const assetId = req.params.id;

    const asset = await Asset.findByPk(assetId);
    if (!asset) return res.redirect('/assets');

    const history = await AssetHistory.findAll({
      where: { asset_id: assetId },
      order: [['action_date', 'ASC']]
    });

    let totalInvested = parseFloat(asset.n_value || 0);

    res.render('asset-history', {
      asset,
      history,
      totalInvested
    });

  } catch (err) {
    console.error(err);
    res.redirect('/assets');
  }
};


exports.showScrapForm = async (req,res)=>{
  const assets = await Asset.findAll({ where:{ n_status:1 }});
  const details = await AssetDetail.findAll({ where:{ is_scrapped:0 }});
  const available = assets.filter(a => details.some(d => d.asset_id == a.asset_id));

  res.render('assets-scrap', { assets:available });
};

exports.scrapAsset = async (req,res)=>{
  try{
    const assetId = req.body.asset_id;  // must match frontend
    const reason  = req.body.reason.trim();

    await AssetDetail.update(
      { is_scrapped:1, scrap_reason:reason, scrap_date:new Date(), employee_id:null },
      { where:{ asset_id:assetId }}
    );

    // update main assets table too if needed
    await Asset.update(
      { asset_assigned: 0, n_status: 0, d_updatedate: new Date() },
      { where: { asset_id: assetId } }
    );

    await log(assetId, null, 'SCRAP', reason);
    res.json({ success:true });
  }catch(err){ res.json({ success:false, error:err.message }); }
};

exports.assetHistoryPage = async (req, res) => {
  // console.log
  try {
    const assets = await Asset.findAll({});
    res.render('asset-history', { assets, history: null, asset: null });
  } catch (err) {
    res.redirect('/assets');
  }
};

exports.assetHistoryData = async (req, res) => {
  try {
    const assetId = req.params.id;

    const asset = await Asset.findByPk(assetId);
    if (!asset) return res.json({ success: false, error: 'Asset not found' });

    const history = await AssetHistory.findAll({
      where: { asset_id: assetId },
      order: [['action_date', 'ASC']]
    });

    // 🔥 JOIN Employee name mapping
    const historyWithEmployee = await Promise.all(history.map(async (h) => {
      let employeeName = '—';

      if (h.employee_id) {
        const emp = await Employee.findOne({
          where: { employee_id: h.employee_id }
        });
        employeeName = emp?.c_name || '—';
      }

      return {
        history_id: h.history_id,
        action: h.action,
        reason: h.reason,
        action_date: h.action_date,
        employee_name: employeeName  // 👈 send employee name
      };
    }));

    res.json({ success: true, asset, history: historyWithEmployee });

  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

