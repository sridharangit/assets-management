const express = require('express');
const router = express.Router();
const catCtrl = require('../controllers/assets-category');

router.get('/create', catCtrl.showCreateForm);
router.post('/create', catCtrl.createCategory);
router.get('/edit/:id', catCtrl.showEditForm);
router.post('/edit/:id', catCtrl.updateCategory);
router.get('/', catCtrl.listCategory);
router.post('/delete/:id', catCtrl.deleteCategory);
router.get('/get/:id', catCtrl.getById);

module.exports = router;
