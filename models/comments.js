const mongoose = require('mongoose');
const Post = require('./posts');
const Schema = mongoose.Schema;

const CommentsSchema = Schema({
  user_id: {type: Schema.Types.ObjectId, ref: "User"},
  post_id: {type: Schema.Types.ObjectId, ref: "Post"},
  content: {type: String, required: true},
  upvotes: [{type: Schema.Types.ObjectId, ref: "User"}],
  downvotes: [{type: Schema.Types.ObjectId, ref: "User"}],
  replies: {type: Schema.Types.ObjectId, ref: "Comment"}
}, {timestamps: true})

CommentsSchema.methods.upvoteComment = function(user_id) {
  this.downvotes = this.downvotes.filter(downvote => downvote !== user_id);
  this.upvotes.includes(user_id) 
  ? this.upvotes = this.upvotes.filter(upvote => upvote !== user_id)
  : this.upvotes.push(user_id);
  this.save();
  return this;
}

CommentsSchema.methods.downvoteComment = function(user_id) {
  this.upvotes = this.upvotes.filter(upvote => upvote !== user_id);
  this.downvotes.includes(user_id) 
  ? this.downvotes = this.downvotes.filter(downvote => downvote !== user_id)
  : this.downvotes.push(user_id);
  this.save();
  return this;
}

CommentsSchema.methods.getReplies = function() {
  this.populate('replies', (err, comment) => {
    if(err) return err;
    return comment.replies;
  })
}

CommentsSchema.post('remove', async function() {
  console.log("running post middleware after remove");
  console.log("the comments is", this);
  await Post.findById(this.post_id).then(post => {
    console.log(post);
    post.comments = post.comments.filter(postComment => postComment !== this._id)
    post.save();
  })
  .catch(err => console.log(err))
})

const Comment = mongoose.model('Comment', CommentsSchema);
module.exports = Comment;