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

PostSchema.methods.upvotePost = function(user_id){  
  this.downvotes = this.downvotes.filter(downvote => downvote !== user_id);
  this.upvotes.includes(user_id) 
  ? this.upvotes = this.upvotes.filter(upvote => upvote !== user_id)
  : this.upvotes.push(user_id);
  this.save((err, doc) => {
    console.log(doc);
    if(err) return err;
    return doc;
  });
}

PostSchema.methods.downvotePost = function(user_id){
  this.upvotes = this.upvotes.filter(upvote => upvote !== user_id);
  this.downvotes.includes(user_id) 
  ? this.downvotes = this.downvotes.filter(downvote => downvote !== user_id)
  : this.downvotes.push(user_id);
  this.save((err, doc) => {
    if(err) return err;
    return doc;
  });
}

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
