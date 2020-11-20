const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("./posts");

const SubredditSchema = Schema(
  {
    name: { type: String, unique: true, required: [true, "can't be blank"] },
    description: { type: String, required: [true, "can't be blank"]},
    creator: { type: Schema.Types.ObjectId, ref: "User"},
    members: [{ type: Schema.Types.ObjectId, ref: "User"}],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post"}]
  },
  { timestamps: true }
);

SubredditSchema.methods.getPosts = function() {
  this.populate('posts', (err, posts) => {
    if(err) return err;
    return posts;
  })
}

// delete all posts that belonged to this subreddit when sub is deleted
SubredditSchema.post('remove', function(doc) {
  console.log(this);
  Post.deleteMany({_id: {$in: doc.posts}})
});


var Subreddit = mongoose.model("Subreddit", SubredditSchema);

module.exports = Subreddit;
