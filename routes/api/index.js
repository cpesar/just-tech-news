//THIS FILE WILL COLLECT ALL OF THE API ROUTES AND PACKAGE THEM UP FOR US

const router = require('express').Router();

const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;