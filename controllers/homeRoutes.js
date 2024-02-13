const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

// Render the music player page
router.get('/music', async (req, res) => {
  try {
    console.log(req.session.logged_in)
    res.render('musicpage',{logged_in:req.session.logged_in});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the profile page with authentication
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
