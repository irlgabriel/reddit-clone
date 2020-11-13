import React, { useState, useEffect } from "react";
import axios from "axios";
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
  SortBy,
  SortByDropdown,
  CommentIcon,
  ShareIcon,
  SaveIcon,
  DeleteIcon,
} from "./Post.components";
const Post = ({
  posts,
  setPosts,
  user,
  upvotes,
  downvotes,
  title,
  subreddit,
  creator_id,
  content,
  id,
  upvoted,
  downvoted,
}) => {
  const [postUsername, setPostUsername] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState([]);
  // const [commentsSortBy, setCommentsSortBy] = useState('BEST')
  const [showCommentsSortBy, setShowCommentsSortBy] = useState(false);

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const getUsername = (user_id) => {
    axios.get(`/users/${user_id}`).then((res) => {
      setPostUsername(res.data.username);
    });
  };
  const upvotePost = () => {
    if (!user) return;
    const body = JSON.stringify({
      user_id: user._id,
    });
    axios
      .post(`/posts/${id}/upvote`, body, config)
      .then((res) => {
        const updatedPost = res.data;
        setPosts(posts.map((post) => (post._id === id ? updatedPost : post)));
      })
      .catch((err) => console.log(err));
  };
  const downvotePost = () => {
    if (!user) return;
    const body = JSON.stringify({
      user_id: user._id,
    });
    axios
      .post(`/posts/${id}/downvote`, body, config)
      .then((res) => {
        const updatedPost = res.data;
        setPosts(posts.map((post) => (post._id === id ? updatedPost : post)));
      })
      .catch((err) => console.log(err));
  };
  const deletePost = () => {
    if (!user) return;
    window.confirm("Are you sure you want to delete this post?") &&
      axios
        .delete(`/posts/${id}`, config)
        .then((res) =>
          setPosts((posts) => posts.filter((post) => post._id !== res.data._id))
        )
        .catch((err) => console.log(err));
  };

  // When component renders
  useEffect(() => {
    // Retrieve post's comments
    axios.get(`/posts/${id}/comments`).then((res) => setPostComments(res.data));
    // Get post's username using user_id
    getUsername(creator_id);
  }, []);

  return (
    <PostWrapper>
      <PostContainer>
        {/* Votes Container */}
        <DotsWrapper>
          <DotsContainer>
            <UpDot onClick={() => upvotePost()} upvoted={upvoted} />
            <DotsCount upvoted={upvoted} downvoted={downvoted}>
              {upvotes.length - downvotes.length}
            </DotsCount>
            <DownDot onClick={() => downvotePost()} downvoted={downvoted} />
          </DotsContainer>
        </DotsWrapper>
        <PostContentWrapper>
          <PostContentContainer>
            <PostHeader>
              <SubredditName to={`/subreddits/${subreddit}`}>
                r/{subreddit}&nbsp;
              </SubredditName>
              &middot;&nbsp;
              <Creator
                to={`/users/${postUsername}`}
                me={user ? (creator_id === user._id ? "yes" : "false") : ""}
              >
                &nbsp;{postUsername}
              </Creator>
            </PostHeader>
            <PostBody>
              <PostTitle>{title}</PostTitle>
              <PostContent>{content}</PostContent>
            </PostBody>
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
              {user && creator_id === user._id && (
                <FooterLink onClick={() => deletePost()}>
                  <DeleteIcon />
                  &nbsp;
                  <span style={{ color: "lightsalmon" }}>Delete</span>
                </FooterLink>
              )}
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
                  setPostComments={setPostComments}
                  postComments={postComments}
                  post_id={id}
                  user_id={user._id}
                />
              )}
              {postComments.length > 0 && (
                <SortBy>
                  <P
                    onClick={() => setShowCommentsSortBy(!showCommentsSortBy)}
                    size="11px"
                    color="darkgray"
                  >
                    SORT BY
                  </P>
                  <SortByDropdown></SortByDropdown>
                </SortBy>
              )}
              {postComments.map((comment) => (
                <PostComment
                  comments={postComments}
                  setComments={setPostComments}
                  key={comment._id}
                  post_id={id}
                  user={user}
                  comment={comment}
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
