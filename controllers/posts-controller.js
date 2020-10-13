const Post=require('../models/post')

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