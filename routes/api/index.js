//THIS FILE WILL COLLECT ALL OF THE API ROUTES AND PACKAGE THEM UP FOR US

const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');



router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;