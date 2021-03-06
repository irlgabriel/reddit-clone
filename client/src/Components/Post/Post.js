import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { PostComment, CommentForm } from "..";
import {
  PostWrapper,
  PostContainer,
  DotsWrapper,
  DotsContainer,
  DotsCount,
  UpDot,
  DownDot,
  PostHeader,
  SubredditName,
  Creator,
  PostContentWrapper,
  PostContentContainer,
  PostBody,
  PostFooter,
  PostTitle,
  PostContent,
  FooterLink,
  CommentsWrapper,
  NotLoggedIn,
  ButtonGroup,
  Button,
  P,
  CommentIcon,
  DeleteIcon,
  EditIcon,
  EditPost,
  EditTitle,
  EditContent,
  EditContentWrapper,
  EditTitleWrapper,
  ContentAbsolute,
  TitleAbsolute,
  EditFooter,
  PostedAt,
  PostImage,

} from "./Post.components";
import { CSSTransition } from "react-transition-group";
const Post = ({
  setLogin,
  setRegister,
  setFlash,
  setShowFlash,
  posts,
  setPosts,
  user,
  post,
}) => {
  const [postUser, setPostUser] = useState("default ");
  const [showComments, setShowComments] = useState(false);
  // this counts just the comments, not the replies!
  const [postComments, setPostComments] = useState([]);
  const [postCommentsAll, setPostCommentsAll] = useState([]);
  const [showEditPost, setShowEditPost] = useState(false);
  const [upvoted, setUpvoted] = useState(user && post.upvotes.includes(user._id) ? "yes" : "no");
  const [downvoted, setDownvoted] = useState(user && post.downvotes.includes(user._id) ? "yes" : "no");
  // State for editing Post
  const [postTitle, setPostTitle] = useState(post.title);
  const [postContent, setPostContent] =  useState(post.content);

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  
  const editPost = () => {
    if(!user) return;
    axios.put(`/posts/${post._id}`, {title: postTitle, content: postContent, user_id: user._id}, config)
    .then(res => {
      console.log(res.data);
      setShowEditPost(false);
      setPosts(posts.map(post => post._id === post._id ? res.data.post : post))
      setFlash(res.data.message);
      setShowFlash(true);
    })
    .catch(err => {
      console.log(err, err.response);
      if(err.response.data.message) {
        setFlash(err.response.data.msg);
        setShowFlash(true);
      }
    })
  }

  const upvotePost = () => {
    if (!user) return;
    const body = JSON.stringify({
      user_id: user._id,
    });
    axios
      .post(`/posts/${post._id}/upvote`, body, config)
      .then((res) => {
        const updatedPost = res.data;
        setPosts(posts.map((newPost) => (newPost._id === post._id ? updatedPost : newPost)));
      })
      .catch((err) => console.log(err));
  };
  const downvotePost = () => {
    if (!user) return;
    const body = JSON.stringify({
      user_id: user._id,
    });
    axios
      .post(`/posts/${post._id}/downvote`, body, config)
      .then((res) => {
        const updatedPost = res.data;
        setPosts(posts.map((newPost) => (newPost._id === post._id ? updatedPost : newPost)));
      })
      .catch((err) => console.log(err));
  };
  const deletePost = () => {
    if (!user) return;
    window.confirm("Are you sure you want to delete this post?") &&
      axios
        .delete(`/posts/${post._id}`, config)
        .then((res) => {
          console.log(res.data.post);
          setPosts(posts.filter(post => post._id !== res.data.post._id))
          setFlash(res.data.message);
          setShowFlash(true);
        })
        .catch(err => {
          console.log(err);
          console.log(err.response)
          setFlash(err.response.data.message);
          setShowFlash(true);
        });
  };

  // When component renders fetch resources
  useEffect(() => {
    
    axios.get(`/posts/${post._id}/comments`).then((res) => setPostComments(res.data));
    axios.get(`/posts/${post._id}`).then((res) => setPostUser(res.data.user))
  }, []);

  useEffect(() => {
    // I fetch comments + replies here because I don't know another way to calculate the 
    // total number of comments any other way;
    axios.get(`/posts/${post._id}/all_comments`).then(res => setPostCommentsAll(res.data));
  }, [postComments])

  // Update upvote/downvote status when posts prop changes
  useEffect(() => {
    user && post.downvotes.includes(user._id) ? setDownvoted("yes") : setDownvoted("no");
    user && post.upvotes.includes(user._id) ? setUpvoted("yes") : setUpvoted("no");
  }, [posts, user])

  
  return (
    <PostWrapper>
      <PostContainer>
        {/* Votes Container */}
        <DotsWrapper>
          <DotsContainer>
            <UpDot onClick={() => upvotePost()} upvoted={upvoted} />
            <DotsCount upvoted={upvoted} downvoted={downvoted}>
              {post.upvotes.length - post.downvotes.length}
            </DotsCount>
            <DownDot onClick={() => downvotePost()} downvoted={downvoted} />
          </DotsContainer>
        </DotsWrapper>
        <PostContentWrapper>
          <PostContentContainer>
            <PostHeader>
              <SubredditName to={`/subreddits/${post.subreddit}`}>
                r/{post.subreddit}&nbsp;
              </SubredditName>
              &middot;&nbsp;
              <Creator
                to={`/users/${postUser && postUser.username}`}
                me={user ? (post.user === user._id ? "yes" : "false") : ""}
              >
                &nbsp;{postUser && postUser.username}&nbsp;
              </Creator>
              <PostedAt>
               &middot;&nbsp;{moment(post.createdAt).fromNow()}
              </PostedAt>
            </PostHeader>
            { 
              !showEditPost && 
              <PostBody>
                <PostTitle>{post.title}</PostTitle>
                  {
                    post.content 
                    ? <PostContent>{post.content}</PostContent>
                    : <Link to=""><PostImage src={post.image} /></Link>
                  }
              </PostBody>
            }
            {
              showEditPost && 
              <EditPost>
                <EditTitleWrapper>
                  <TitleAbsolute>Title:</TitleAbsolute>
                  <EditTitle required type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)}/>
                </EditTitleWrapper>
                <EditContentWrapper>
                  <ContentAbsolute>Content:</ContentAbsolute>
                  <EditContent required rows={6} value={postContent} onChange={(e) =>  setPostContent(e.target.value)}/>
                </EditContentWrapper>
                <EditFooter>
                  <Button onClick={() => editPost()} toRight="yes" color="white" bgColor="royalblue">EDIT</Button>
                </EditFooter>
              </EditPost>
            }
            <PostFooter>
              <FooterLink
                onClick={() => setShowComments(!showComments)}
                href=""
              >
                <CommentIcon />
                &nbsp;
                <span>{postCommentsAll.length} Comments</span>
              </FooterLink>
              {user && post.user === user._id && 
                <FooterLink onClick={() => deletePost()}>
                  <DeleteIcon />
                  &nbsp;
                  <span style={{ color: "lightsalmon" }}>Delete</span>
                </FooterLink>
              }
              {user && post.user === user._id && 
                <FooterLink onClick={() => setShowEditPost(!showEditPost)}>
                  <EditIcon />
                  &nbsp;
                  <span style={{ color: "orange" }}>{!showEditPost ? 'Edit' : "Cancel"}</span>
                </FooterLink>
              }
            </PostFooter>
          </PostContentContainer>
          <CSSTransition
            in={showComments}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <CommentsWrapper>
              {!user && (
                <NotLoggedIn>
                  <P color="darkgray">Log in or sign up to leave a comment</P>
                  <ButtonGroup>
                    <Button onClick={() => setLogin(true)} color="royalblue" bgColor="white">
                      LOG IN
                    </Button>
                    <Button onClick={() => setRegister(true)} color="white" bgColor="royalblue">
                      SIGN UP
                    </Button>
                  </ButtonGroup>
                </NotLoggedIn>
              )}
              {user && (
                <CommentForm
                  setFlash={setFlash}
                  setShowFlash={setShowFlash}
                  setPostComments={setPostComments}
                  postComments={postComments}
                  post_id={post._id}
                  user_id={user._id}
                />
              )}
              {postComments.map((comment) => (
                <PostComment
                  setFlash={setFlash}
                  posts={posts}
                  setPosts={setPosts}
                  setShowFlash={setShowFlash}
                  key={comment._id}
                  post_id={post._id}
                  user={user}
                  comment={comment}
                  comments={postComments}
                  setComments={setPostComments}                  
                />
              ))}
            </CommentsWrapper>
            </CSSTransition>
        </PostContentWrapper>
      </PostContainer>
    </PostWrapper>
  );
};

export default Post;
