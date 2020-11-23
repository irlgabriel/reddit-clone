const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require("./posts");

const CommentSchema = Schema({
  user_id: {type: Schema.Types.ObjectId, ref: "User"},
  post_id: {type: Schema.Types.ObjectId, ref: "Post"},
  comment_id: {type: Schema.Types.ObjectId, ref : "Comment"},
  content: {type: String, required: true},
  upvotes: [{type: Schema.Types.ObjectId, ref: "User"}],
  downvotes: [{type: Schema.Types.ObjectId, ref: "User"}],
}, {timestamps: true})

CommentSchema.methods.upvoteComment = function(user_id) {
  this.downvotes = this.downvotes.filter(downvote => downvote != user_id);
  this.upvotes.includes(user_id) 
  ? this.upvotes = this.upvotes.filter(upvote => upvote != user_id)
  : this.upvotes.push(user_id);
  this.save();
  return this;
}

CommentSchema.methods.downvoteComment = function(user_id) {
  this.upvotes = this.upvotes.filter(upvote => upvote != user_id);
  this.downvotes.includes(user_id) 
  ? this.downvotes = this.downvotes.filter(downvote => downvote != user_id)
  : this.downvotes.push(user_id);
  this.save();
  return this;
}

// works - it deletes child replies (even though it's not the same user's replies :-??)
CommentSchema.post('findOneAndRemove', {document: true, query: false}, (doc) => {
  Comment.find({comment_id: doc._id})
  .then(replies => {
    replies.forEach(reply => {
      reply.remove();
    })
  })
})

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;