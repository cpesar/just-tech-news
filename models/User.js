        //USER MODEL


//IMPORT MODEL CLASS AND DataTypes FROM SEQUELIZE
const { Model, DataTypes } = require ('sequelize');
const sequelize = require ('../config/connection');

//CREATE USER MODEL
//MODEL CLASS IS WHAT WE CREATE OUR OWN USER MODELS FROM USING THE extends KEYWORD
class User extends Model {}

//DEFINE TABLE COLUMNS AND CONFIGURATION
User.init(
  {
  //TABLE COLUMN DEFINITIONS GO HERE
      //THIS WILL HAVE 4 COLUMNS


  //DEFINE AN ID COLUMN
    id: {
      //USE THE SPECIAL Sequelize DataTypes object to provide what type of data it is
      type: DataTypes.INTEGER,
      //EQUIVALENT TO SQL'S 'NOT NULL' option
      allowNull: false,
      //INSTRUCT THAT THIS IS THE Primary Key
      primaryKey: true,
      //TURN ON AUTO INCREMENT
      autoIncrement: true
    },
  //DEFINE A USERNAME COLUMN
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
  //DEFINE AN EMAIL COLUMN
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //NO DUPLICATE EMAILS
      unique: true,
      //IF allowNull is set to false, we can run our data through validators before creating the table
      validate: {
        isEmail: true
      }
    },
  //DEFINE A PASSWORD COLUMN
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        //PASSWORD MUST BE ___ CHARACTERS LONG
        len: [4]
      }
    }
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