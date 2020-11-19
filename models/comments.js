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
const Comment = mongoose.model('Comment', CommentsSchema);

module.exports = Comment;