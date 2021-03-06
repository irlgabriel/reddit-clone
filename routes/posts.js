const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
  cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer(
  {
    storage: storage, 
    limits: {
      fileSize: 1024 * 1024 * 5, // max 5MB
    },
    fileFilter: fileFilter,
});


const Post = require("../models/posts");
const Subreddit = require("../models/subreddits");
const Comment = require("../models/comments");

/* GET - retrieve all posts */
router.get("/", (req, res, next) => {
  Post.find((err, docs) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
});
/* GET - retrieve post by id */
router.get('/:post_id', (req, res, next) => {
  Post.findOne({_id: req.params.post_id})
  .populate('user')
  .exec((err, post) => {
    if(err) res.status(400).send(err);
    res.json(post);
  })
})
/* GET - retrieve posts from subscribed reddits */
router.get("/:user_id/subscribed", async (req, res, next) => {
  const user_id = req.params.user_id
  try {
    const subscribed_reddits = await Subreddit.find({members: {$in: user_id}})
    const subscribed_reddits_names = subscribed_reddits.map(sub => sub.name);
    const subscribed_posts = await Post.find({subreddit: {$in: subscribed_reddits_names}});
    res.json({posts: subscribed_posts});
  } catch(err) {
    return res.status(400).send(err);
  }
})
/* GET - retrieve replies + comments of a post */
router.get('/:post_id/all_comments', (req, res, next) => {
  Comment.find({post_id: req.params.post_id})
  .then(docs => {
    res.json(docs);
  })
  .catch(err => {
    res.status(400).send(err);
  }) 
})
/* POST '/posts' - Create a post */
router.post("/", upload.single('image'), (req, res, next) => {
  // console.log(req.file)
  // console.log(req.body)
  const { title, subreddit, content, user } = req.body;

  const post = new Post({
    title: title,
    subreddit: subreddit,
    user: user,
    content: content,
  })
  req.file ? post.image = req.file.path : "";

    post.save()
    .then(async (post) => {
      res.status(200).send({message: "Post created!", post: post})
    })
    .catch(err => console.log(err));
});

// POST - upvote a post
router.post("/:post_id/upvote", (req, res, next) => {
  const post_id = req.params.post_id
  const user_id = req.body.user_id;

  Post.findById(post_id, (err, post) => {
    if(err) res.status(400).send(err);
    post.upvotePost(user_id);
    res.status(200).send(post);
  })
})

// POST - downvote a post
router.post("/:post_id/downvote", (req, res, next) => {
  const post_id = req.params.post_id
  const user_id = req.body.user_id;

  Post.findById(post_id, (err, post) => {
    if(err) res.status(400).send(err);
      post.downvotePost(user_id);
    res.status(200).send(post);
  })
})

// PUT - Edit a post 
router.put("/:post_id", (req, res, next) => {
  // send an user_id as well just to make sure it's the user that submits the edit req
  const user_id = req.body.user_id;
  const updated_obj = {};
  Object.keys(req.body).forEach(obj => {
    if(obj !== 'user_id') {
      updated_obj[obj] = req.body[obj];
    }
  })
  Post.findOneAndUpdate({_id: req.params.post_id}, updated_obj, {new: true}, (err, doc) => {
    if(err) res.status(400).send(err);

    // Check if user that submited the request is the creator
    if(doc.user != user_id) return res.status(403).send({message: "Forbidden"})
    res.status(200).send({message: "Post edited!", post: doc});
  })
})

// DELETE - deletes a post
router.delete("/:post_id", async (req, res, next) => {
  const post_id = req.params.post_id;

  Post.findByIdAndDelete(post_id, async (err, post) => {
    if(err) res.status(400).send(err);
    res.status(200).send({message: "Post deleted!", post})
  })

});
module.exports = router;

