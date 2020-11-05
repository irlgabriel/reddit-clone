var mongoose = require("mongoose");
var PostSchema = mongoose.Schema({
  subreddit: String,
  user: String,
  votes: String,
  comments: Array,
  title: {type: String, required: [true, "can't be blank"]},
})
var Post = mongoose.model("Post", PostSchema);
module.exports = Post;

/*
Post
{
  subreddit: "",
  user: "",
  votes: "",
  comments: [
    {
      user: "",
      votes: "",
      replies: [
        {
          user: "",
          votes: "",
        }
      ]
    },
  ]
}
*/