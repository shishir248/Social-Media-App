const Post=require('../models/post')
const Comment=require('../models/comment');

module.exports.create=function(req,resp){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log("Error in creating post");
            return;
        }
        if(post){
            return resp.redirect('back');
        }
    })
}

module.exports.destroy=function(req,resp){
    Post.findById(req.params.id,function(err,post){
        //To check if a user is authorized to delete a post
        // .id is used inplace of ._id because (.id) is String converted ._id by mongoose
        if(post.user==req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){
                return resp.redirect('back');
            });
        }else{
            return resp.redirect('back');
        }
    })
}