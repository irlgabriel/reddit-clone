var mongoose = require('mongoose');
var Schema = mongoose.Schema
var RepliesSchema = Schema(
  {
    comment_id: { type: Schema.Types.ObjectId, ref: "Comment",},
    user_id: { type: Schema.Types.ObjectId, ref: "User",},
    content: { type: String, required: [true, "can't be blank"]},
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User"}],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User"}],
  },
  { timestamps: true }
)

var Reply = mongoose.model("Reply", RepliesSchema);
module.exports = Reply;