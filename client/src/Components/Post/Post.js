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
  const [liked, setLiked] = useState(undefined);
  const [votes, setVotes] = useState('');

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    user_id: id,
  })

  const upvotePost = () => {
    if(!user) return;
    if(liked === undefined) { // no vote cast
      axios.post(`/posts/upvote/${id}`, body, config)
      .then(res => setLiked(true))
      .catch(err => console.log(err))
    }  
  }
  const downvotePost = () => {
    if(!user) return;
    if(liked === undefined) { // no vote cast
      axios.post(`/posts/downvote/${id}`, body, config)
      .then(res => setLiked(false))
      .catch(err => console.log(err))
    }  
  }

  // Check if user liked/disliked this post
  useEffect(() => {
    if(!user) return;
    if(upvotes.includes(user.id)) setLiked(true);
    if(downvotes.includes(user.id)) setLiked(false);
  })
  // Get post likes
  useEffect(() => {
    setVotes(upvotes.length - downvotes.length)
  }, [])
  return (
    <PostContainer>
      {/* Votes Container */}
      <DotsWrapper>
        <DotsContainer>
          <UpDot
            onClick={() => upvotePost()} 
            liked={liked}
          />
          <DotsCount liked={liked}>{votes}</DotsCount>
          <DownDot
            onClick={() => downvotePost()}
            liked={liked}
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
