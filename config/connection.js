//IMPORT SEQUELIZE CONSTRUCTOR FROM LIBRARY
const sequelize = require ('sequelize');

require('dotenv').config();


//CREATE CONNECTION TO OUR DATABASE, PASS IN YOUR MySQL INFORMATION FOR USERNAME AND P/W
    //The 'new Sequelize() function takes in database name, username, and p/w as parameters
const sequelize = new Sequelize('process.env.DB_NAME', 'process.env.DB_USER', 'process.env.DB_PW',  {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306

});

module.exports = sequelize;