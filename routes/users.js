var express = require('express');
var router = express.Router();
var ROLES = require('../utils/roles');


/* GET users listing for an admin  - /users */
/* TODO check if user is admin before showing this page */
router.get('/',
    require('connect-ensure-login').ensureLoggedIn({ redirectTo: '/auth/login'}),    
    function(req, res, next) {
      if (req.user.role === ROLES.Admin){
        res.render('users', { user: req.user, title: 'User Config (ADMIN ONLY)' });
      }else{
        res.render('error',{message: 'You are not authorised to view this resource.', title: 'Error'});
        //res.send sends back a json object
        // return res.send(403,{
        //   'status': 403,
        //   'code': 1, // custom code that makes sense for your application
        //   'message': 'You are not a premium user',
        //   'moreInfo': 'custom code that makes sense for your application'
        // });
      }
});

/* GET user profile - /users/profile */
router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn({ redirectTo: '/auth/login' }),
  function(req, res){
    res.render('profile', { user: req.user, title: 'User Profile' });
  });
module.exports = router;
