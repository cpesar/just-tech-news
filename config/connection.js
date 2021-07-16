//IMPORT SEQUELIZE CONSTRUCTOR FROM LIBRARY
const Sequelize = require('sequelize');

require('dotenv').config();


//CREATE CONNECTION TO OUR DATABASE, PASS IN YOUR MySQL INFORMATION FOR USERNAME AND P/W
    // The 'new Sequelize() function takes in database name, username, and p/w as parameters
    //  MAKE SURE THAT THE PARAMETERS THAT ARE PULLED FROM THE .env FILE ARE NOT STRINGS
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW,  {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});


//AFTER PUSHING TO HEROKU AND ADDING JAWS DB:
// let sequelize;

// if(process.env.JAWSDB_URL){
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306,
//   });
// }


module.exports = sequelize;