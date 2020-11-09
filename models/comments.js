const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
  user: String,
  content: {type: String, required: true},
  upvotes: {type: Array, default: []},
  downvotes: {type: Array, default: []},
  replies: {type: Array, default: []}
})
const Comment = mongoose.model('Comment', CommentsSchema);

module.exports = Comment;