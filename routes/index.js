var express = require('express');
var router = express.Router();
const {check,validationResult} = require('express-validator');//define router


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

/* GET home page. */
router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Express'});
});

/* SAMPLE FORM WITH ERRORS */
router.post('/form', [
  check('email', 'email is required').isEmail(),
  check('name', 'name is required').not().isEmpty(),
  check('password', 'password is required').not().isEmpty(),
], function(req, res, next) {  //check validate data
  const result= validationResult(req);
  var errors = result.errors;  for (var key in errors) {
        console.log(errors[key].value);
  }
  if (!result.isEmpty()) {
  //response validate data to form.ejs
     res.render('form', {
       title: 'Express',
      errors: errors
    })
  }
});

module.exports = router;
