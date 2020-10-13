const { populate } = require('../models/post');
const Post=require('../models/post');
//Defining an action for home
module.exports.home = function (req, resp) {
// Without populating
  // Post.find({},function(err,posts){
  //   return resp.render("home", {
  //     title: "Codeial | Home",
  //     posts: posts
  //   });
  // })

// Populating the user of each post
  Post.find({}).populate('user').exec(function(err,posts){
      return resp.render("home", {
        title: "Codeial | Home",
        posts: posts
    });
  });
}


