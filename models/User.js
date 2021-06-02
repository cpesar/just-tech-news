//IMPORT MODEL CLASS AND DATATYPES FROM SEQUELIZE
const { Model, DataTypes } = require ('sequelize');
const sequelize = require ('../config/connection');

//CREATE USER MODEL
//MODEL CLASS IS WHAT WE CREATE OUR OWN USER MODELS FROM USING THE extends KEYWORD
class User extends Model {}

//DEFINE TABLE COLUMNS AND CONFIGURATION
User.init(
  {
    //TABLE COLUMN DEFINITIONS GO HERE
  },
  {
    //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    //PASS IN OUR IMPORTED SEQUELIZE CONNECTION (the direct connection to our database)
    sequelize,
    //DON'T AUTOMATICALLY CREATE createdAt/updatedAt timestamp fields
    timestamps: false,
    //DON'T PLURALIZE NAME OF DATABASE TABLE
    freezeTableName: true,
    //USE UNDERSCORES INSTEAD OF CAMEL-CASING
    underscored: true,
    //MAKE IT SO OUR MODEL NAME SAYS LOWERCASE IN THE DATABASE
    modelName: 'user'
  }
);

module.exports = User;