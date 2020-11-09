import React, { useState, useEffect } from "react";
import axios from "axios";
import {
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
  PostBody,
  PostFooter,
  PostTitle,
  PostContent,
  FooterLink,
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
  const [upvoted, setUpvoted] = useState(undefined);
  const [downvoted, setDownvoted] = useState(undefined);

  const [votes, setVotes] = useState(upvotes.length - downvotes.length);

  const config = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    user_id: user._id,
  })

  const upvotePost = () => {
    axios.post(`/posts/upvote/${id}`, body, config)
    .then(res => {
      const updatedPost = res.data;
      console.log(updatedPost);
    })
  }
  const downvotePost = () => {
    axios.post(`/posts/downvote/${id}`, body, config)
    .then(res => {
      const updatedPost = res.data;
      console.log(updatedPost);
    })
  }

  // Check if user liked/disliked this post
  useEffect(() => {
    if(!user) return;
    if(upvotes.includes(user._id)) setUpvoted("yes");
    if(downvotes.includes(user._id)) setDownvoted("yes");
  }, [])

  return (
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
        <PostHeader>
          <SubredditName>r/{subreddit}&nbsp;</SubredditName>
          &middot;&nbsp;
          <Creator me={user && creator === user.username}> {creator}</Creator>
        </PostHeader>
        <PostBody>
          <PostTitle>{title}</PostTitle>
          <PostContent>{content}</PostContent>
        </PostBody>
        <PostFooter>
          <FooterLink href="">
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
      </PostContentWrapper>
    </PostContainer>
  );
};

export default Post;
