const router = require('express').Router();
const { User } = require('../../models');



//GET /api/users
router.get('/',(req,res) => {
  //Access our User model and run .findAll() method
  //THIS IS SIMILAR TO THE <SELECT * FROM users;> SQL method
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




//GET /api/users/1
router.get('/:id', (req,res) => {
  //THIS WILL ONLY RETURN ONE USER BASED ON ITS <req.params.id> value
  //THIS IS SIMILAR TO THE SQL <SELECT * FROM users WHERE id = 1>
  User.findOne({
    attributes: { exclude: ['password']},
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




//This route will be found at http://localhost:3001/api/users/login in the browser.
//The post method carries the request parameter in the req.body, which makes it a more secure way of transferring data from client to server
router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  // This will query the user table using the findOne() method for the email entered by the user and assign it to the req.body.email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    //If no user with the email entered is found, a message is sent back as a response to the client
    if(!dbUserData){
      res.status(400).json({ message: 'No user with that email address' });
      return;
    }
  

    //VERIFY USER
    const validPassword = dbUserData.checkPassword(req.body.password);
    if(!validPassword){
      res.status(400).json({ message: 'Incorrect password '});
      return;
    }
    res.json({ user: dbUserData, message: 'You are now logged in '});

  });
});




//PUT /api/users/1
router.put('/:id', (req,res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  //if req.body has exact key/value pairs to match the model, you can just use req.body
  //PASS IN REQ.BODY INSTEAD TO ONLY UPDATE WHAT'S PASSED THROUGH
  User.update(req.body, {
    individualHooks: true,
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