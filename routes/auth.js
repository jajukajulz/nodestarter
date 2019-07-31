var express = require('express');
var router = express.Router();
var passport = require('passport');


/* Render Login page. */
router.get('/login',
  function(req, res){
    res.render('login', { title: 'User Login' });
  });

/* Process Login form submission. */
/* TODO add a user not found message */
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/login' }),
  function(req, res) {
    res.redirect('/');
  });

/* Logout. */
router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;
