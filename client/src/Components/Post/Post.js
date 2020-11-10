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
  Bold,
  P,
  SortBy,
  SortByDropdown,
  OptionContainer,
  CommentIcon,
  ShareIcon,
  SaveIcon,
  DeleteIcon,
} from "./Post.components";
const Post = ({
  user,
  upvotes,
  downvotes,
  comments,
  title,
  subreddit,
  creator,
  content,
  id,
}) => {
  const [upvoted, setUpvoted] = useState("no");
  const [downvoted, setDownvoted] = useState("no");
  const [votes, setVotes] = useState(upvotes.length - downvotes.length);
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [commentsSortBy, setCommentsSortBy] = useState('BEST')
  const [showCommentsSortBy, setShowCommentsSortBy] = useState(false);

  const config = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  };

  const getUsername = () => {
    axios.get('/users')
    .then(res => {
      console.log(res.data);
    })
  }
  const upvotePost = () => {
    if(!user) return;
    const body = JSON.stringify({
      user_id: user._id
    })
    axios.post(`/posts/${id}/upvote`, body, config)
    .then(res => {
      const updatedPost = res.data;
      console.log(updatedPost);
    })
  }
  const downvotePost = () => {
    if(!user) return;
    const body = JSON.stringify({
      user_id: user._id
    })
    axios.post(`/posts/${id}/downvote`, body, config)
    .then(res => {
      const updatedPost = res.data;
      console.log(updatedPost);
    })
    .catch(err => console.log(err))
  }

  // When component renders
  useEffect(() => {
    // Check if user liked/disliked this post
    if(user) {
      if(upvotes.includes(user._id)) setUpvoted("yes");
      if(downvotes.includes(user._id)) setDownvoted("yes");
    }
    // Retrieve post's comments
    axios.get('/posts/:post_id/comments')
    .then(res => setPostComments(res.data));
  }, [])

 

  return (
    <PostWrapper>
      <PostContainer>
        {/* Votes Container */}
        <DotsWrapper>
          <DotsContainer>
            <UpDot
              onClick={() => upvotePost()} 
              upvoted={upvoted}
            />
            <DotsCount upvoted={upvoted} downvoted={downvoted}>{votes}</DotsCount>
            <DownDot
              onClick={() => downvotePost()}
              downvoted={downvoted}
            />
          </DotsContainer>
        </DotsWrapper>
        <PostContentWrapper>
          <PostContentContainer>
            <PostHeader>
              <SubredditName>r/{subreddit}&nbsp;</SubredditName>
              &middot;&nbsp;
              <Creator me={user && creator === user.username}>{creator}</Creator>
            </PostHeader>
            <PostBody>
              <PostTitle>{title}</PostTitle>
              <PostContent>{content}</PostContent>
            </PostBody>
            <PostFooter>
              <FooterLink onClick={() => setShowComments(!showComments)} href="">
                <CommentIcon />
                &nbsp;
                <span>{comments.length} Comments</span>
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
              {user && creator === user.username && (
                <FooterLink href="">
                  <DeleteIcon />
                  &nbsp;
                  <span style={{ color: "lightsalmon" }}>Delete</span>
                </FooterLink>
              )}
            </PostFooter>
          </PostContentContainer>
          {
            showComments && 
            <CommentsWrapper>
            {
              !user &&
                <NotLoggedIn>
                  <P color="darkgray">Log in or sign up to leave a comment</P>
                  <ButtonGroup>
                    <Button color="royalblue" bgColor="white">LOG IN</Button>
                    <Button color="white" bgColor="royalblue">SIGN UP</Button>
                  </ButtonGroup>
                </NotLoggedIn>
            }
            {
              user && 
              <CommentForm />
            }
              <SortBy>
                <P onClick={() => setShowCommentsSortBy(!showCommentsSortBy)} size="11px" color="darkgray">SORT BY</P>
                <SortByDropdown>
                </SortByDropdown>
              </SortBy>
              {
                postComments.map(comment => 
                  <PostComment key={comment._id} user={user} comment={comment} />
                )
              }
            </CommentsWrapper>
          }
        </PostContentWrapper>
      </PostContainer>
    </PostWrapper>
  );
};

export default Post;
