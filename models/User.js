        //USER MODEL
const { Model, DataTypes } = require('sequelize');
//REQUIRE bcrypt FOR HASHING PASSWORDS
const bcrypt = require('bcrypt');
const sequelize = require ('../config/connection');



//CREATE USER MODEL
//MODEL CLASS IS WHAT WE CREATE OUR OWN USER MODELS FROM USING THE extends KEYWORD
class User extends Model {
  // set up method to run on instance data (per user) to check password
  // WHEN USING bcrypt ON A SERVER async IS RECOMMENDED
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
    id: {
      type: DataTypes.INTEGER,
      // Equivalent to SQL's NOT NULL option
      allowNull: false,
      primaryKey: true,
      // Removes white space
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // No duplicate emails
      unique: true,
      // If allowNull is set to false, we can run our data through validators before creating the table
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        // Password must be 4 characters long
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