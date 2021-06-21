//MAIN HOME-PAGE ROUTE
const router = require('express').Router();

const sequelize = require('../config/connection');
const {Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  console.log('======================');
  //use res.render because we hooked up a template engine and specify which template we want to use. In this case wer are using the 'homepage template
  //TAKES A POST OBJECT AND PASSES IT INTO THE homepage.handlebars TEMPLATE

  // res.render('homepage', {
  //   id: 1,
  //   post_url: 'https://handlebarsjs.com/guide',
  //   title: 'Handlebars Docs',
  //   created_at: new Date(),
  //   vote_count: 10,
  //   comments: [{}, {}],
  //   user: {
  //     username: 'test_user'
  //   }
  // });

  // res.render('homepage', {
  //   id: 5,
  //   post_url: 'http://natureboy69.com',
  //   title: 'Nature Boy Dominates',
  //   created_at: new Date(),
  //   vote_count: 4,
  //   comments: [{}, {}],
  //   user:{
  //     username: 'test_user'
  //   }

  // });
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
    res.render('homepage', { posts });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});




//LOGIN ROUTE
// http://localhost:3001/login
router.get('/login', (req,res) => {
  if(req.session.loggedIn){
    res.redirect('/');
    return;
  }
  res.render('login')
});




// http://localhost:3001/api/users/login


// router.get('/', (req,res) =>{
//   console.log(req.session);

// });
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;