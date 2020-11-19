var mongoose = require("mongoose");
const Post = require("./posts")

var SubredditSchema = mongoose.Schema(
  {
    name: { type: String, unique: true, required: [true, "can't be blank"] },
    creator: String,
    members: { type: Array, default: [] },
    description: { type: String, required: [true, "can't be blank"]},
  },
  { timestamps: true }
);

SubredditSchema.methods.deleteSubredditPosts = async function() {
  const subName = this.name
  Post.find().then(docs => {
    docs.forEach(doc => {
      if(doc.subreddit === subName) {
        doc.remove();
      }
    })
  })
}

var Subreddit = mongoose.model("Subreddit", SubredditSchema);

module.exports = Subreddit;
