var express = require("express");
require('dotenv').config();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


// import ROUTES
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var subredditsRouter = require("./routes/subreddits");
var commentsRouter = require("./routes/comments");
var repliesRouter = require("./routes/replies");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


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

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: false, 
  saveUninitialized: true, 
  secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());


// import Routers
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const subredditsRouter = require("./routes/subreddits");
const commentsRouter = require("./routes/comments");

// Route handlers
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/subreddits", subredditsRouter);
app.use("/posts/:post_id/comments", commentsRouter);

if (process.env.NODE_ENV == "production") {
  // Set a static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
