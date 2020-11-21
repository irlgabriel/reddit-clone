const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require('./posts');

const SubredditSchema = Schema(
  {
    name: { type: String, unique: true, required: [true, "can't be blank"] },
    description: { type: String, required: [true, "can't be blank"]},
    creator: { type: Schema.Types.ObjectId, ref: "User"},
    members: [{ type: Schema.Types.ObjectId, ref: "User"}],
  },
  { timestamps: true }
);

SubredditSchema.methods.getPosts = function() {
  Post.find({subreddit: this.name})
  .exec((err, doc) => {
    if(err) console.log(err);
    console.log(doc);
  })
}

SubredditSchema.post('remove', async function() {
  console.log('running post middleware for subreddit remove');
  await Post.deleteMany({subreddit: this.name});
})

var Subreddit = mongoose.model("Subreddit", SubredditSchema);

module.exports = Subreddit;
