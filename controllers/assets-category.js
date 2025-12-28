const Category = require('../models/assets-category');

exports.showCreateForm = (req, res) => {
  res.render('assets-category-create', { category: null, editMode: false });
};

exports.createCategory = async (req, res) => {
  try {
    await Category.create({
      c_name: req.body.name,
      c_desc: req.body.desc,
      n_status: req.body.status ? 1 : 0,
      d_updatedate: new Date()
    });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const cat = await Category.findByPk(req.params.id);
    console.log(req.params.id);

    if (!cat) return res.redirect('/assets-category');
    res.render('assets-category-create', { category: cat, editMode: true });
  } catch {
    res.redirect('/assets-category');
  }
};

exports.updateCategory = async (req, res) => {
  try {
    await Category.update(
      {
        c_name: req.body.name,
        c_desc: req.body.desc,
        n_status: req.body.status ? 1 : 0,
        d_updatedate: new Date()
      },
      { where: { category_id: req.params.id } }
    );
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

exports.listCategory = async (req, res) => {
  const categories = await Category.findAll();
  res.render('assets-category', { categories });
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.destroy({ where: { category_id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    console.log(req);
    const cat = await Category.findByPk(req.params.id);
    if(!cat) return res.json({ success: false, error: 'Category not found' });
    res.json({ success: true, category: cat });
  } catch(err) {
    res.json({ success: false, error: err.message });
  }
};
