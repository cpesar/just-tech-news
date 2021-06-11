          //POST MODEL


//IMPORT THESE 
//model and DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
//connection to MySQL
const sequelize = require('../config/connection');

//DEFINE THE POST MODEL
// create our Post model
class Post extends Model {
  //static keyword to indicate that the upvote method is based on the post model
  static upvote(body, models){
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then (() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            'vote_count'
          ]
        ]
      });
    });
  }
}


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