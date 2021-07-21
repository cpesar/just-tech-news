
// Import models
const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');



//CREATE ASSOCIATIONS
// A user can make many posts, but a post only belongs to a single user- never many users
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//DEFINES THE RELATIONSHIP OF THE Post MODEL TO THE User MODEL
// A post can belong to one user, but not many users
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


//MANY TO MANY ASSOCIATIONS
//allows both the user and post models to query each other's information in the context of a vote
    //1. allows us to see which users voted on a single post
User.belongsToMany(Post, {
  through: Vote,
  //the name of the vote model is voted_posts
  as: 'voted_posts',
  //FOREIGN KEY CONSTRAINT
  //the foreign keys are unique which prevents a single user from voting on one post multiple times
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});
     //2. allows us to see which post a single user voted on
Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  //the foreign keys are unique which prevents a single user from voting on one post multiple times
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});





//CONNECT THE Post and User MODELS (ONE TO MANY ASSOCIATIONS BETWEEN MODELS)
Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});





//CONNECT THE MODELS (we only want to see the user's comment and which post it was for)
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});



//EXPORT OBJECT WITH USER MODEL AS A PROPERTY
module.exports = { User, Post, Vote, Comment };
