var express = require('express');
var router = express.Router();

/* Render Login page. */
router.get('/login',
  function(req, res){
    res.render('login');
  });

/* Process Login form submission. */
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
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
