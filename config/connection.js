//IMPORT SEQUELIZE CONSTRUCTOR FROM LIBRARY
const Sequelize = require('sequelize');

require('dotenv').config();

      //-----THIS WAY WORKS------
const sequelize = new Sequelize('just_tech_news_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});


            //------THIS WAY WORKS---------
// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize('just_tech_news_db', 'root', '', {
//       host: 'localhost',
//       port: 3306,
//       dialect: 'mysql'
//     });



//CREATE CONNECTION TO OUR DATABASE, PASS IN YOUR MySQL INFORMATION FOR USERNAME AND P/W
    //The 'new Sequelize() function takes in database name, username, and p/w as parameters
        //--THIS DOES NOT WORK <ACCESS DENIED ERROR>--------
// const sequelize = new Sequelize('process.env.DB_NAME', 'process.env.DB_USER', 'process.env.DB_PW',  {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 3306,
// });





            //------THIS DOES NOT WORK-------
// FUNCTION TO CONNECT TO DB
// const sequelize = new Sequelize(
//   {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     dialect: 'mysql',
//     password:process.env.DB_PASS,
//     database: 'just_tech_news_db'
//   },
//   console.log('Connected to the tech news database.')
// );







module.exports = sequelize;