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

module.exports.destroy=function(req,resp){
   Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            //Remove comment from comment array present in post schema
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return resp.redirect('back');
            })
        }
        else{
            resp.redirect('back');
        }
   });
}