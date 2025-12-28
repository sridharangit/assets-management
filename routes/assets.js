const express = require('express');
const router = express.Router();
const assetCtrl = require('../controllers/assets');
const assetsDetails = require('../controllers/assets-details');

router.get('/create', assetCtrl.showCreateForm);
router.post('/create', assetCtrl.createAsset);

router.get('/edit/:id', assetCtrl.showEditForm);
router.post('/edit/:id', assetCtrl.updateAsset);

router.get('/', assetCtrl.listAssets);
router.post('/delete/:id', assetCtrl.deleteAsset);

router.get('/get/:id', assetCtrl.getById);
router.get('/stock-view', assetCtrl.stockView);

router.get('/issue', assetsDetails.showIssueForm);
router.post('/issue', assetsDetails.issueAsset);

router.get('/return', assetsDetails.showReturnForm);
router.post('/return', assetsDetails.returnAsset);

router.get('/scrap', assetsDetails.showScrapForm);
router.post('/scrap', assetsDetails.scrapAsset);

router.get('/history', assetsDetails.assetHistoryPage);
router.get('/history/data/:id', assetsDetails.assetHistoryData);

module.exports = router;
