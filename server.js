require('dotenv').config();

const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const path = require('path');
const { User } = require('./models'); // Import the User model
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const musicpageRoute = require('./controllers/api/musicpageRoute');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
// const hbs = exphbs.create({ /* your helpers */ });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/', partialsDir: __dirname + '/views/partials', helpers: undefined }));
app.set('view engine', 'handlebars');
app.get('/', (req, res) => {
  res.render('homepage'); // Assuming 'homepage' is the name of your main page template
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the profile page
app.get('/profile', async (req, res) => {
  try {
    const userData = req.user;
    res.render('profile', { user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to render the login page
app.get('/login', (req, res) => {
  res.render('login'); // Assuming 'login' is the name of your login page template
});

// Route to render the signup page
app.get('/signup', (req, res) => {
  res.render('signup'); // Assuming 'signup' is the name of your signup page template
});

// Login route with authentication
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.checkPassword(password)) {
      return res.status(401).send('Invalid email or password');
    }

    // Implement session setup or JWT token generation for successful login
    req.session.user = { userId: user.id };
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Signup route with user creation
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body; // Retrieve name from the form data

  try {
    const newUser = await User.create({ name, email, password }); // Include name when creating the user
    req.session.user = { userId: newUser.id };
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle music page rendering
app.use('/music', musicpageRoute);

// Include your other routes or controllers here

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening to port: ', PORT));
});