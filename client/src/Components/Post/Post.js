import React, { useState } from "react";
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
} from "./Post.components"
const Post = ({user, votes, comments, title, subreddit, creator, content, id}) => {
  const [liked, setLiked] = useState('')

  return(
    <PostContainer>
      {/* Votes Container */}
      <DotsWrapper>
        <DotsContainer>
          <UpDot onClick={() => liked !== "yes" ? setLiked("yes") : setLiked("")} liked={liked} />
          <DotsCount liked={liked}>{votes}</DotsCount>
          <DownDot onClick={() => liked !== "no" ? setLiked("no") : setLiked("")} liked={liked} />
        </DotsContainer>
      </DotsWrapper>
      <PostContentWrapper>
        <PostHeader>
          <SubredditName>r/{subreddit}&nbsp;</SubredditName>
          &middot;&nbsp;<Creator me={creator === user.username}> {creator}</Creator>
        </PostHeader>
        <PostBody>
          <PostTitle>{title}</PostTitle>
          <PostContent>{content}</PostContent>
        </PostBody>
        <PostFooter>
          <FooterLink href="">
            <CommentIcon />&nbsp;
            <span>{comments.length} Comments</span>
          </FooterLink>
          <FooterLink href="">
            <ShareIcon />&nbsp;
            <span>Share</span>
          </FooterLink>
          <FooterLink href="">
            <SaveIcon />&nbsp;
            <span>Save</span>
          </FooterLink>
          {creator === user.username && 
            <FooterLink href="">
              <DeleteIcon />&nbsp;
              <span style={{color: "lightsalmon"}}>Delete</span>
            </FooterLink>
          } 
        </PostFooter>
      </PostContentWrapper>
    </PostContainer>  
  )
}

export default Post