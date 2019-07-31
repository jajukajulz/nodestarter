var express = require('express');
var router = express.Router();

/* GET users listing for an admin.
* TODO check if user is admin before showing this page */
router.get('/',
    require('connect-ensure-login').ensureLoggedIn({ redirectTo: '/auth/login' }),
    function(req, res, next) {
      res.render('users', { user: req.user, title: 'User Config' });
      /*res.send('respond with a resource'); */
});

/* GET user profile. */
router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn({ redirectTo: '/auth/login' }),
  function(req, res){
    res.render('profile', { user: req.user, title: 'User Profile' });
  });
module.exports = router;
