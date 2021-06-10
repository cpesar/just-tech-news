
//IMPORT THESE 
//model and DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
//connection to MySQL
const sequelize = require('../config/connection');

//DEFINE THE POST MODEL
// create our Post model
class Post extends Model {}


//DEFINE COLUMNS IN THE POST MODEL (this will have 4 columns)
//POST SCHEMA
//Create fields/columns for Post model
Post.init(
  {
    //column 1
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //column 2
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //column 3
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    //column 4
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);


module.exports = Post;