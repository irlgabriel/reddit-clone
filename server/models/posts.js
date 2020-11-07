var mongoose = require("mongoose");

var PostSchema = mongoose.Schema({
  subreddit: {type: String, required: [true, "can't be blank"]},
  user: String,
  title: {type: String, required: [true, "can't be blank"]},
  content: {type: String, required: [true, "can't be blank"]},
  votes: {type: Array, default: []},
  comments: {type: Array, default: []},
}, {timestamps: true})

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;

/*
Post
{
  title: "",
  content: "",
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