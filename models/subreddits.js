var mongoose = require("mongoose");

var SubredditSchema = mongoose.Schema(
  {
    name: { type: String, unique: true, required: [true, "can't be blank"] },
    creator: String,
    members: { type: Array, default: [] },
    description: { type: String, required: [true, "can't be blank"]},
  },
  { timestamps: true }
);

var Subreddit = mongoose.model("Subreddit", SubredditSchema);

module.exports = Subreddit;
