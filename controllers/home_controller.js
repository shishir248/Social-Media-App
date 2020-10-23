const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');
//Defining an action for home without using async await
// module.exports.home = function (req, resp) {
//   // Without populating
//   // Post.find({},function(err,posts){
//   //   return resp.render("home", {
//   //     title: "Codeial | Home",
//   //     posts: posts
//   //   });
//   // })

//   // Populating the user of each post
//   Post.find({}).populate('user').populate({
//     path: 'comments',
//     populate: {
//       path: 'user'
//     }
//   }).exec(function (err, posts) {
//     //To display all users logged in
//     User.find({}, function (err, users) {
//       return resp.render("home", {
//         title: "Codeial | Home",
//         posts: posts,
//         all_users: users
//       });
//     })
//   });
// }


//Defining action for home with async await
module.exports.home = async function (req, resp) {
  // Populating the user of each post
  try {
    let posts = await Post.find({}).populate('user').populate({
      path: 'comments',
      populate: {
        path: 'user'
      }
    });
    //To display all users logged in
    let users = await User.find({}, function (err, users) {
      return resp.render("home", {
        title: "Codeial | Home",
        posts: posts,
        all_users: users
      });
    });

  } catch (err) {
    console.log('Error', err);
    return;
  }

}



