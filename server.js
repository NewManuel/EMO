const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers'); // Assuming your routes are defined in the controllers folder
const helpers = require('./utils/helpers');
const { User } = require('./models'); // Import the User model

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

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

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Assets')));

// Render the profile update page
app.get('/profile', async (req, res) => {
  try {
    const userData = req.user;
    userData.profilePic = 'Assets/images/standard_profile_pic.jpg';
    res.render('profile', { user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/profile/update-emotion', async (req, res) => {
  try {
    const { userId } = req.session.user;
    const user = await User.findByPk(userId);
    await user.updateEmotion(req.body.selectedEmotion);
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Login route with authentication
app.post('/login', async (req, res) => {
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
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({ name, email, password });
    req.session.user = { userId: newUser.id };
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});