const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');



// GET ROUTE FOR ALL USERS
//  http://localhost:3001/api/users
router.get('/',(req,res) => {
  //Access our User model and run .findAll() method
  User.findAll({
    //PREVENTS PASSWORDS FROM RETURNING IN THE QUERY
    attributes: { exclude: ['password']}
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




// GET ROUTE FOR USER BY ID
// http://localhost:3001/api/users/1
router.get('/:id', (req,res) => {
  //THIS WILL ONLY RETURN ONE USER BASED ON ITS <req.params.id> value
  User.findOne({
    attributes: { exclude: ['password']},
    //The same as: SELECT * FROM users WHERE id = " "
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id','title', 'post_url', 'created_at']
      },
      {
        // include the comment model
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include:{
      // include the post model on the comment model so we can see which posts a user commented on
          model: Post,
          attributes: ['title']
        }
      },
      {
      //when we query a user, we can see which post the user has created and which post the user has voted on
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts'
      },
    ]
  })
  .then(dbUserData => {
    if (!dbUserData){
      res.status(404).json({ message: 'No user found with this id'});
      return;
    }
    res.json(dbUserData);
  
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});





//CREATE A NEW USER
// http://localhost:3001/api/users
router.post('/', (req,res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  // .then(dbUserData => res.json(dbUserData))
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json(err);
  // });

  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });




  //          THIS CODE BLOCK WAS NOT WORKING save() is undefined error
  //GIVES THE SERVER ACCESS TO ID AND USERNAME, AND A BOOLEAN TELLING IT WHETHER THE USE IS LOGGED IN OR NOT
  // .then(dbUserData => {
  //   //req.session.save():
  //     //wrap in a callback function to make sure that the session is created before sending the response
  //   req.session.save(() => {
  //     req.session.user_id = dbUserData.id;
  //     req.session.username = dbUserData.username;
  //     req.session.loggedIn = true;

  //     res.json(dbUserData);
  //   });
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json(err);
  // });
});



// LOGIN ROUTE
router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  // This will query the user table using the findOne() method for the email entered by the user and assign it to the req.body.email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if(!dbUserData){
      res.status(400).json({ message: 'No user with that email address' });
      return;
    }
    // VERIFY USER
    const validPassword = dbUserData.checkPassword(req.body.password);
    if(!validPassword){
      res.status(400).json({ message: 'Incorrect password '});
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
    
    res.json({ user: dbUserData, message: 'You are now logged in '});
    });
  });
});




// LOG OUT ROUTE
router.post('/logout', (req,res) => {
  if(req.session.loggedIn) {
    console.log(res.status);
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else{
    res.status(404).end();
  }
});


//PUT ROUTE FOR USERS BY ID
// http://localhost:3001/api/users/1
router.put('/:id', (req,res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  //COMBINES THE PARAMETERS FOR CREATING DATA AND LOOKING UP DATA(req.body, and req.params)

  //if req.body has exact key/value pairs to match the model, you can just use req.body
  //PASS IN REQ.BODY INSTEAD TO ONLY UPDATE WHAT'S PASSED THROUGH
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData){
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});




//DELETE ROUTE FOR USERS BY ID
// http://localhost:3001/api/users/id
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData){
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



module.exports = router;