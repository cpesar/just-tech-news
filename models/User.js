        //USER MODEL


//IMPORT MODEL CLASS AND DataTypes FROM SEQUELIZE
const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

//REQUIRE bcrypt FOR HASHING PASSWORDS
const bcrypt = require('bcrypt');

//CREATE USER MODEL
//MODEL CLASS IS WHAT WE CREATE OUR OWN USER MODELS FROM USING THE extends KEYWORD
class User extends Model {
  //set up method to run on instance data (per user) to check password
  //NOTE WHEN USING bcrypt ON A SERVER async IS RECOMMENDED
  checkPassword(loginPw) {
    //USING THE .this METHOD WE CAN ACCESS THE USER'S PROPERTIES, INCLUDING THE PASSWORD, WHICH WAS STORED AS A HASHED STRING
    //THIS WILL RETURN TRUE ON SUCCESS, OR FALSE ON FAILURE
    //THE BOOLEAN WILL THEN BE STORED IN THE validPassword VARIABLE IN THE POST/LOGIN API ROUTE
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//DEFINE TABLE COLUMNS AND CONFIGURATION
User.init(
{
  //TABLE COLUMN DEFINITIONS GO HERE
      //THIS WILL HAVE 4 COLUMNS


  //1. DEFINE AN ID COLUMN
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
  //2. DEFINE A USERNAME COLUMN
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
  //3. DEFINE AN EMAIL COLUMN
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
  //4. DEFINE A PASSWORD COLUMN
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
    //hooks (or lifecycle events), are functions that are called before or after calls in Sequelize
    hooks: {
      //ADD THE ASYNC FUNCTION TO THE hooks PROPERTY

              //----CREATE NEW USER PASSWORD-----
      //set up `beforeCreate` lifecycle 'hook' functionality
      async beforeCreate(newUserData){
                                                                //salt round 10
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      
              //----UPDATE USER PASSWORD--------
      //set up `beforeUpdate` lifecycle 'hook' functionality
      async beforeUpdate(updatedUserData){
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      } 
    },

    
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