var createError = require('http-errors');
var express = require('express');
var flash = require('express-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var ROLES = require('./utils/roles');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());

app.use(function(req,res,next){
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success")
  next();
})

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// // Mount routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.

// We will use two LocalStrategies, one for file-based auth and another for db-auth
passport.use('file-local', new LocalStrategy({
  usernameField: 'username', //useful for custom id's on yor credentials fields, if this is incorrect you get a missing credentials error
  passwordField: 'password', //useful for custom id's on yor credentials fields
  },
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { 
        return cb(null, false, { message: 'Incorrect username.' }); 
      }
      if (user.password != password) { 
        return cb(null, false, { message: 'Incorrect password.' }); 
      }
      return cb(null, user); // If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
    });
  }));


passport.use('db-local', new LocalStrategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { 
        return cb(null, false, { message: 'Incorrect username.' }); 
      }
      if (user.password != password) { 
        return cb(null, false, { message: 'Incorrect password.' }); 
      }
      return cb(null, user); // If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
    });
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
