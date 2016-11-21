//the way this will be used is:
//const Authentication = require('./authentication')
//Authentication.signup...

const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  //'sub' short for subject, from JWT convention
  //'iat' short of issued at time, also from JWT convention
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req, res, next) {
  //User has already had their email and password auth'd
  //We just need to give them a token
  res.send({ token: tokenForUser(req.user) });

}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({error: 'You must provide email and password'});
  }

  //See if a user with given email exist
  User.findOne({email: email}, function(err, existingUser){
    if( err ) { return next(err); }

    //If user does exist, return error
    if (existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }

    //If user does not exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err){
      if ( err ) { return next(err); }

      //Respond to indicate the user was created
      res.json({ token: tokenForUser(user) });
    });

  });




}
