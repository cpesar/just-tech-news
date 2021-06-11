
//THIS FILE COLLECTS ALL OF THE PACKAGED API ROUTES

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

//IF WE MAKE A REQUEST TO AN ENDPOINT THAT DOESN'T EXIST, WE GET A 404 ERROR
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;