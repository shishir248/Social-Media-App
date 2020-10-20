const { populate } = require('../models/post');
const Post=require('../models/post');
const User = require('../models/user');
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
  Post.find({}).populate('user').populate({
    path: 'comments',
    populate:{
      path: 'user'
    }
  }).exec(function(err,posts){
      return resp.render("home", {
        title: "Codeial | Home",
        posts: posts
    });
  });
}


