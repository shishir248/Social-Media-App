const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, resp) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            //Update and save(adding comments) in posts
            post.comments.push(comment);
            post.save();
            return resp.redirect('/');
        }
    } catch (error) {
        console.log('Error', err);
        return;
    }


}

module.exports.destroy = function (req, resp) {
    try {
        let comment = Comment.findById(req.params.id)
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            //Remove comment from comment array present in post schema
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        }
        resp.redirect('back');
    } catch (error) {
        console.log('Error', err);
        return;
    }
}