//Require passport
const passport = require('passport');
//Require user schema
const User = require('../models/user');
//Require strategy
const LocalStrategy = require('passport-local').Strategy;

//Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done) {
    //Find a user and establish the identity
    User.findOne({
        email: email
    }, function (err, user) {
        if (err) {
            //if theres an error
            console.log('Error in finding user --> passport')
            return done(err);
        }
        //If user is not present or password is incorrect
        if (!user || user.password != password) {
            console.log('Inavlid username/password');
            //return error as null and authentication has failed
            return done(null, false);
        }
        //authentication successful
        return done(null, user);
    })
}));


//Serializing user to decide which key is to be used as a cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

//Deserializing user 
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding');
            return done(err);
        }
        return done(null, user);
    })
})


//Check if user is authenticated
passport.checkAuthentication = function (req, resp, next) {
    //User is logged in then pass the next(fn which is controllers action).
    if (req.isAuthenticated()) {
        return next();
    }
    //User has not signed in
    return resp.redirect('/users/sign-in');
}

//To check if the user is logged in(IF YES THEN HE/SHE SHOULDNT BE ABLE TO ACCESS THE SIGN-IN OR SIGN-UP PAGE)
passport.checkLog = function (req, resp, next) {
    //User is logged in then pass the next(fn which is controllers action).
    if (req.isAuthenticated()) {
        return resp.redirect('/users/profile');
    }
    //User is not logged in
    next();
}






passport.setAuthenticatedUser = function (req, resp, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user from the session cookie and send that to locals for the views
        resp.locals.user = req.user;
    }
    next();
}

module.exports = passport;