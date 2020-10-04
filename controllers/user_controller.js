//Importing the user schema
const User = require('../models/user');

module.exports.profile = function (req, resp) {
  return resp.render("users.ejs", {
    title: "Users",
  });
};

module.exports.post = function (req, resp) {
  console.log("Hi");
};

//Render the sign up page
module.exports.signup = function (req, resp) {
  return resp.render("signup.ejs", {
    title: "Sign Up Page",
  });
}
//Render the sign in page
module.exports.signin = function (req, resp) {
  return resp.render("signin.ejs", {
    title: "Sign In Page",
  });
}

//Get the signed up data
module.exports.create = function (req, resp) {
  if (req.body.password != req.body.confirm) {
    resp.redirect('back');
  }

  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      console.log('Error in finding in Schema-->User');
      return;
    }

    //To create a new user
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log('Error in creating a user');
          return;
        }
        return resp.redirect('/users/sign-in');
      });
    }

    //If user already exists 
    else {
      resp.redirect('back');
    }

  });
}

//Get the login data
module.exports.createSession = function (req, resp) {
  //Find the user
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      console.log('Error in finding in Schema-->User');
      return;
    }
    //Handle user found 
    if (user) {
      //Handle incorrect password 
      if (req.body.password != user.password) {
        return resp.redirect('back');
      }
      //Handle session creation
      resp.cookie("user_id", user.id);
      return resp.redirect('/users/profile')
    }

    //Handle user not found
    else {
      return resp.redirect('/users/sign-up');
    }
  });



}