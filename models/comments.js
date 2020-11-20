const mongoose = require('mongoose');
const Post = require('./posts');
const User = require('./users');
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

CommentsSchema.post('save', async function() {
  console.log("running post middleware after save");
  console.log("the comment is", this);
  await Post.updateOne({_id: this.post_id}, {$push: {comments: this._id}})
  await User.updateOne({_id: this.user_id}, {$push: {comments: this._id}})
})

CommentsSchema.post('remove', async function() {
  console.log("running post middleware after remove");
  console.log("the comment is", this);
  await Post.updateOne({_id: this.post_id}, {$pull: {comments: this._id}});
  await User.updateOne({_id: this.user_id}, {$pull: {comments: this._id}});
})

const Comment = mongoose.model('Comment', CommentsSchema);
module.exports = Comment;