const router = require('express').Router();
const { Comment } = require('../../models');

// GET ROUTE FOR ALL COMMENTS
// http://localhost:3001/api/comments
router.get('/', (req, res) => {
  console.log('==============');
  //NO PARAMETERS
  Comment.findAll()
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});


// POST ROUTE FOR ALL COMMENTS
// http://localhost:3001/api/comments
router.post('/', (req, res) => {
  // Check the session
  if(req.session){
  Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    // Use the id from the session
    user_id: req.session.user_id
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
}
});



// DELETE COMMENT BY ID
// http://localhost:3001/api/comments/id
router.delete('/:id', (req, res) => {
  if(req.session){
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if(!dbCommentData){
      res.status(404).json({ message: 'No comment found with this id '});
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}
});

module.exports = router;