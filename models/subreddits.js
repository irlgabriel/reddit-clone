var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Post = require("./posts")

var SubredditSchema = Schema(
  {
    name: { type: String, unique: true, required: [true, "can't be blank"] },
    description: { type: String, required: [true, "can't be blank"]},
    creator: { type: Schema.Types.ObjectId, reference: "User"},
    members: [{ type: Schema.Types.ObjectId, reference: "User"}],
    posts: [{ type: Schema.Types.ObjectId, reference: "Post"}]
  },
  { timestamps: true }
);

SubredditSchema.methods.getPosts = function() {
  this.populate('posts', (err, posts) => {
    if(err) return err;
    return posts;
  })
}

// delete all posts that belonged to this subreddit when 
SubredditSchema.post('remove', function() {
  console.log(this);
  this.posts.forEach(post => Post.findByIdAndRemove(post, (err, doc) => {
    if(err) console.log(err);
    console.log(doc);
  }))
});

var Subreddit = mongoose.model("Subreddit", SubredditSchema);

module.exports = Subreddit;
