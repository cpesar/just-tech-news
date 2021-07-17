//MAIN HOME-PAGE ROUTE
const router = require('express').Router();

const sequelize = require('../config/connection');
const {Post, User, Comment } = require('../models');



// GET ALL POSTS
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    //pass a single post object into the homepage template
    // console.log(dbPostData[0]);

    //THIS WILL LOOP AND MAP EACH SEQUELIZE OBJECT, AND SAVE THE RESULTS IN A NEW POST ARRAY
    const posts = dbPostData.map(post => post.get({ plain: true }));           
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// GET POST BY ID
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model:User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    if(!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    // Serialize the data
    const post = dbPostData.get({ plain: true });
    // Pass data to template
    res.render('single-post', { post, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// LOGIN ROUTE
router.get('/login', (req,res) => {
  if(req.session.loggedIn){
    res.redirect('/');
    return;
  }
  res.render('login');
});



module.exports = router;