const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,resp){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
               
                //Update and save(adding comments) in posts
                post.comments.push(comment);
                post.save();

               return resp.redirect('/');
            })
        }
    })
}