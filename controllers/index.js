
//THIS FILE COLLECTS ALL OF THE PACKAGED API & CONTROLLER ROUTES

const router = require('express').Router();

//API ROUTES
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

//CONTROLLER ROUTES

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//IF WE MAKE A REQUEST TO AN ENDPOINT THAT DOESN'T EXIST, WE GET A 404 ERROR
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;