import React, { useState, useEffect } from "react";
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
  ShareIcon,
  SaveIcon,
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
} from "./Post.components";
const Post = ({
  setFlash,
  setShowFlash,
  posts,
  setPosts,
  user,
  post,
}) => {
  const [postUsername, setPostUsername] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState([]);
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
      setShowEditPost(false);
      setPosts(posts.map(post => post._id === post._id ? res.data : post))
      setFlash(res.data.message);
      setShowFlash(true);
    })
    .catch(err => {
      setFlash(err.response.data.msg);
      setShowFlash(true);
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
        setPosts(posts.map((post) => (post._id === post._id ? updatedPost : post)));
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
        setPosts(posts.map((post) => (post._id === post._id ? updatedPost : post)));
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

  // When component renders
  useEffect(() => {
    axios.get(`/posts/${post._id}/comments`).then((res) => setPostComments(res.data));
  }, []);

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
                to={`/users/${postUsername}`}
                me={user ? (post.user === user._id ? "yes" : "false") : ""}
              >
                &nbsp;{postUsername}&nbsp;
              </Creator>
              <PostedAt>
               &middot;&nbsp;{moment(post.createdAt).fromNow()}
              </PostedAt>
            </PostHeader>
            { 
              !showEditPost && 
              <PostBody>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
              </PostBody>
            }
            {
              showEditPost && 
              <EditPost>
                <EditTitleWrapper>
                  <TitleAbsolute>Title:</TitleAbsolute>
                  <EditTitle type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)}/>
                </EditTitleWrapper>
                <EditContentWrapper>
                  <ContentAbsolute>Content:</ContentAbsolute>
                  <EditContent rows={6} value={postContent} onChange={(e) =>  setPostContent(e.target.value)}/>
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
                <span>{postComments.length} Comments</span>
              </FooterLink>
              <FooterLink href="">
                <ShareIcon />
                &nbsp;
                <span>Share</span>
              </FooterLink>
              <FooterLink href="">
                <SaveIcon />
                &nbsp;
                <span>Save</span>
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
          {showComments && (
            <CommentsWrapper>
              {!user && (
                <NotLoggedIn>
                  <P color="darkgray">Log in or sign up to leave a comment</P>
                  <ButtonGroup>
                    <Button color="royalblue" bgColor="white">
                      LOG IN
                    </Button>
                    <Button color="white" bgColor="royalblue">
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
          )}
        </PostContentWrapper>
      </PostContainer>
    </PostWrapper>
  );
};

export default Post;
