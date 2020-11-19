var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = Schema(
  {
    subreddit: { type: Schema.Types.ObjectId, ref: "Subreddit" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: [true, "can't be blank" ]},
    content: { type: String, required: [true, "can't be blank" ]},
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
