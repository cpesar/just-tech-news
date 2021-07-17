const { Model, DataTypes } = require('sequelize');
const sequelize= require ('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1]
      }
    },

    user_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },

    post_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    }

  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);



module.exports = Comment;




// const apiKey = process.env.DB_API_KEY;

//   const searchRequest = {
//     term: 'tacos',
//     location: 84025,
//     limit: 5
//   };

//   const client = yelp.client(apiKey);

// client.search(searchRequest)
//   .then((response) => {
//     console.log(response.jsonBody);
//   })
//   .catch((error) => {
//     console.log(error);
//   });