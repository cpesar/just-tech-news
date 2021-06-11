//IMPORT THE CONNECTION TO THE DATABASE
const sequelize = require('../../config/connection');

const router = require('express').Router();
//IMPORT THESE MODELS
const { Post, User, Vote } = require('../../models');





//ROUTE TO RETRIEVE ALL POSTS IN THE DB
router.get('/', (req, res) => {
  console.log('==============');
  Post.findAll({
    //QUERY CONFIGURATION
    attributes: ['id', 'post_url', 'title', 'created_at'],
    //order the posts in DESCending order
    order: [[ 'created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  //promise that captures the response from the database call
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});




//ROUTE TO GET A SINGLE POST
router.get('/:id', (req,res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'post_url', 'title', 'created_at'],
    include: [

      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    if(!dbPostData){
      //404 is a user error
      res.status(404).json({ message: 'No post found with this id '});
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});




//ROUTE TO CREATE A NEW POST
router.post('/', (req,res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
    //USES req.body TO POPULATE THE COLUMNS IN THE POST TABLE
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.body.user_id 
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


//PUT ROUTE FOR VOTING ON A POST
// api/posts/upvote

//THIS DOES NOT APPEAR TO BE WORKING PROPERLY, HOWEVER WHEN I USE <./upvote> as opposed to </upvote> I DON'T GET AN ERROR. WHY????????
router.put('./upvote', (req,res) => {
  Vote.create({
    user_id: req.body.user_id,
    post_id: req.body.post_id
  }).then(() => {
    //then find the post that was just voted on
    return Post.findOne({
      where: {
        id: req.body.post_id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [
          sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post_id = vote.post_id)'),
          'vote_count'
        ]
      ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  })
});



 


//UPDATE A POST'S TITLE USING A PUT ROUTE
router.put('/:id', (req,res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbPostData => {
    if(!dbPostData){
      res.status(404).json({ message: 'No post found with this id'});
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});




//DELETE ROUTE
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if(!dbPostData){
      res.status(404).json({ message: 'No post found with this id '});
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});






module.exports = router;