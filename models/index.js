
//IMPORT USER MODEL
const User = require('./User');
//IMPORT POST MODEL
const Post = require('./Post');

//CREATE ASSOCIATIONS
//A user can make many posts, but a post only belongs to a single user- never many users
User.hasMany(Post, {
  foreignKey: 'user_id'
});



//DEFINES THE RELATIONSHIP OF THE Post MODEL TO THE User MODEL
//A post can belong to one user, but not many users
Post.belongsTo(User, {
  foreignKey: 'user_id',
});



//EXPORT OBJECT WITH USER MODEL AS A PROPERTY
module.exports = { User, Post };
