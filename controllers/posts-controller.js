const Post = require('../models/post')
const Comment = require('../models/comment');

//Using async await
module.exports.create = async function (req, resp) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        return resp.redirect('back');
    } catch {
        console.log('Error', err);
        return;
    }
}


//Without using async await 
// module.exports.create=function(req,resp){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     },function(err,post){
//         if(err){
//             console.log("Error in creating post");
//             return;
//         }
//         if(post){
//             return resp.redirect('back');
//         }
//     })
// }

module.exports.destroy = async function (req, resp) {
    //To check if a user is authorized to delete a post
    // .id is used inplace of ._id because (.id) is String converted ._id by mongoose
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            return resp.redirect('back');
        }
    } catch (err) {
        if (err) {
            console.log('Error', err);
            return;
        }
    }

}


//Without async await
// module.exports.destroy = function (req, resp) {
//     Post.findById(req.params.id, function (err, post) {
//         //To check if a user is authorized to delete a post
//         // .id is used inplace of ._id because (.id) is String converted ._id by mongoose
//         if (post.user == req.user.id) {
//             post.remove();

//             Comment.deleteMany({ post: req.params.id }, function (err) {
//                 return resp.redirect('back');
//             });
//         } else {
//             return resp.redirect('back');
//         }
//     })
// }