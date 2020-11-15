var mongoose = require('mongoose');

var RepliesSchema = mongoose.Schema(
  {
    comment_id: String,
    user_id: String,
    content: { type: String, required: [true, "can't be blank"]},
    upvotes: { type: Array, default: []},
    downvotes: { type: Array, default: []},
  },
  { timestamps: true}
)
var Reply = mongoose.model("Reply", RepliesSchema);
module.exports = Reply;