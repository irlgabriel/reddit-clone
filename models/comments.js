const mongoose = require('mongoose');
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
  this.populate('replies', (err, replies) => {
    if(err) return err;
    return replies;
  })
}

const Comment = mongoose.model('Comment', CommentsSchema);
module.exports = Comment;