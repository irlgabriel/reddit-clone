var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = Schema(
  {
    title: { type: String, required: [true, "can't be blank" ]},
    content: { type: String, required: [true, "can't be blank" ]},
    subreddit: { type: Schema.Types.ObjectId, ref: "Subreddit" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: true }
);

PostSchema.methods.getComments = function(){
  this.populate('comments', (err, comments) => {
    if(err) return err;
    return comments;
  })
}

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
