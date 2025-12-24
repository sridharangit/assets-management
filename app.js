const express = require('express');
const app  = express();
const path = require('path');
const sequelize  = require('./config/database');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const employeeRoutes = require('./routes/employee');
const loginRoutes    = require('./routes/userlogin');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', loginRoutes);
app.use('/employee', employeeRoutes);

var port = 3000;
sequelize.sync().then(() => {
  app.listen(port, () =>
    console.log('Server running!')
  );
});