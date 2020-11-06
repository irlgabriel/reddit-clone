var mongoose = require('mongoose');

var SubredditSchema = mongoose.Schema({
  name: {type: String, unique: true, required: [true, "can't be blank"]},
  posts: Array,
}, {timestamps: true})

var Subreddit = mongoose.model('Subreddit', SubredditSchema);

module.exports = Subreddit;