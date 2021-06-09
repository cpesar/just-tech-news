const router = require('express').Router();
const { User } = require('../../models');



//GET /api/users
router.get('/',(req,res) => {
  //Access our User model and run .findAll() method
  //THIS IS SIMILAR TO THE <SELECT * FROM users;> SQL method
  User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




//GET /api/users/1
router.get('/:id', (req,res) => {
  //THIS WILL ONLY RETURN ONE USER BASED ON ITS <req.params.id> value
  //THIS IS SIMILAR TO THE SQL <SELECT * FROM users WHERE id = 1>
  User.findOne({
    where: {
      id: req.params.id
    }
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





//POST /api/users
router.post('/', (req,res) => {
  User.create({
    //expects this format {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});





//PUT /api/users/1
router.put('/:id', (req,res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  //if req.body has exact key/value pairs to match the model, you can just use req.body
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData [0]){
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








//DELETE /api/users/1
router.delete('/:id', (req,res) => {
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







//EXPORT THE ROUTER
module.exports = router;