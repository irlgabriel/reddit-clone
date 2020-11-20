const mongoose = require("mongoose");
const Subreddit = require('./subreddits') // circular dependency post <-> subreddit
const User = require('./users')
const Comment = require("./comments");

const Schema = mongoose.Schema;
const PostSchema = Schema(
  {
    title: { type: String, required: [true, "can't be blank" ]},
    content: { type: String, required: [true, "can't be blank" ]},
    subreddit: { type: Schema.Types.ObjectId, ref: "Subreddit" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },{ timestamps: true });

PostSchema.methods.getComments = async function(){
  const posts = await this.populate('comments').execPopulate()
  return posts;
}

// middleware that runs after post is saved;
PostSchema.post('save', async function(doc){
  console.log("running post middleware on save post")
  await User.updateOne({_id: doc.user}, {$push: {posts: doc._id}})
  await Subreddit.updateOne({_id: doc.subreddit}, {$push: {posts: doc._id}})
})

// middleware that runs after post is deleted;
PostSchema.post('remove', async function(doc){
  console.log("running post middleware on remove post")
  await User.updateOne({_id: doc.user}, {$pull: {posts: doc._id}});
  await Subreddit.updateOne({_id: doc.subreddit}, {$pull: {posts: doc._id}});
  await Comment.deleteMany({post_id: doc._id});
})

PostSchema.methods.upvotePost = function(user_id){  
  this.downvotes = this.downvotes.filter(downvote => downvote !== user_id);
  this.upvotes.includes(user_id) 
  ? this.upvotes = this.upvotes.filter(upvote => upvote !== user_id)
  : this.upvotes = [...this.upvotes, user_id];
  this.save((err, doc) => {
    if(err) return err;
    return doc;
  });
}

PostSchema.methods.downvotePost = function(user_id){
  this.upvotes = this.upvotes.filter(upvote => upvote !== user_id);
  this.downvotes.includes(user_id) 
  ? this.downvotes = this.downvotes.filter(downvote => downvote !== user_id)
  : this.downvotes = [...this.downvotes, user_id];
  this.save((err, doc) => {
    if(err) return err;
    return doc;
  });
}


var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
