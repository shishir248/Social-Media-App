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
  //TODO
}

//Get the login data
module.exports.createSession = function (req, resp) {
  //TODO
}