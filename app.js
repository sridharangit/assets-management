const express = require('express');
const app  = express();
const path = require('path');
const sequelize  = require('./config/database');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', require('./routes/userlogin'));
app.use('/employee', require('./routes/employee'));
app.use('/assets', require('./routes/assets'));
app.use('/assets-category', require('./routes/assets-category'));
app.use('/dashboard', require('./routes/dashboard'));

var port = 3000;
sequelize.sync().then(() => {
  app.listen(port, () =>
    console.log('Server running!')
  );
});