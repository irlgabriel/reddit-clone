const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require('./comments');
const PostSchema = Schema(
  {
    title: { type: String, required: [true, "can't be blank" ]},
    content: { type: String, required: [true, "can't be blank" ]},
    subreddit: { type: String, ref: "Subreddit" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },{ timestamps: true });

PostSchema.methods.getComments = async function(){
  const posts = await this.populate('comments').execPopulate()
  return posts;
}

PostSchema.methods.upvotePost = function(user_id){  
  console.log(this)
  this.downvotes = this.downvotes.filter(downvote => downvote != user_id);
  this.upvotes.includes(user_id) 
  ? this.upvotes = this.upvotes.filter(upvote => upvote != user_id)
  : this.upvotes = [...this.upvotes, user_id];
  this.save((err, doc) => {
    if(err) return err;
    return doc;
  });
}

PostSchema.methods.downvotePost = function(user_id){
  console.log(this)
  this.upvotes = this.upvotes.filter(upvote => upvote != user_id);
  this.downvotes.includes(user_id) 
  ? this.downvotes = this.downvotes.filter(downvote => downvote != user_id)
  : this.downvotes = [...this.downvotes, user_id];
  this.save((err, doc) => {
    if(err) return err;
    return doc;
  });
}

PostSchema.post('remove', async function(){
  console.log("running post middleware on post removed");
  await Comment.deleteMany({post_id: this._id})
})

PostSchema.post('delete', async function(){
  console.log("running post middleware on post deleted");
  await Comment.deleteMany({post_id: this._id})
})

PostSchema.pre('deleteMany', {document: true, query: false}, async function(){
  const thisPost = await this.model.findOne(this.getQuery());
  console.log("running pre middleware on post deleteMany");
  if(thisPost) await Comment.deleteMany({post_id: thisPost._id})
})

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
