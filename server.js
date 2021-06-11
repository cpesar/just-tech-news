const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// TURN ON CONNECTION TO DB AND SERVER
//force: true ---- Forces tables to recreate if there are any changes
  // if sequelize.sync were set to true, it would drop and recreate all of the databases on startup
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});