
            //MAKE SURE THAT THE ORDER OF OPERATIONS IS CORRECT!!
const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');


const exphbs = require('express-handlebars');
const hbs = exphbs.create({});


const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess ={
//replace this with an actual secret and store in .env
  secret: 'Super secret secret',
// tells our session to use cookies. we can also add additional options here, like max age
  cookie:{},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};



const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// // FOR THE PUBLIC DIRECTORY
  // express.static() is middleware that can take all of the contents of a folder and serve them as static assets
  // express.static() is useful for front end specific files like images, style sheets, and JS files
  //To ensure that the middleware is working, visit: http://localhost:3001/stylesheets/style.css 
app.use(express.static(path.join(__dirname, 'public')));

// turn on connect-session
//SESSION TURN ON MUST COME BEFORE ROUTES
app.use(session(sess));

// turn on routes
app.use(routes);




app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// TURN ON CONNECTION TO DB AND SERVER
  // force: true ---- Forces tables to recreate if there are any changes
  // if sequelize.sync were set to true, it would drop and recreate all of the databases on startup
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});



