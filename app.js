require('dotenv').config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('mongo-connect')(session);
var mongoose = require('mongoose');
var app = express();


app.use(logger("dev"));
app.use(session({secret:"secret", saveUninitialized: true, resave: false}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))
app.use(passport.initialize());


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));

mongoose.connect(process.env.DB_STRING,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
const db = mongoose.connection;
db.once('open', () => {
  console.log("Connected to mongoDB")
})

// import ROUTES
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var subredditsRouter = require("./routes/subreddits");
var commentsRouter = require("./routes/comments");
var repliesRouter = require("./routes/replies");

// Routes
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/subreddits", subredditsRouter);
app.use("/posts/:post_id/comments", commentsRouter);
app.use("/posts/:post_id/comments/:comment_id", repliesRouter);

if (process.env.NODE_ENV == "production") {
  // Set a static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
