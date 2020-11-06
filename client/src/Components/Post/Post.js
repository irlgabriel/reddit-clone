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
  CreatedAt,
  PostTitle,
  PostContent,
  FooterLink,
  CommentIcon,
  ShareIcon,
  SaveIcon
} from "./Post.components"
const Post = ({votes, comments, title, subreddit, user, content}) => {
  const [dots, setDots] = useState(0);
  return(
    <PostContainer>
      {/* Votes Container */}
      <DotsWrapper>
        <DotsContainer>
          <UpDot />
          <DotsCount>{votes}</DotsCount>
          <DownDot />
        </DotsContainer>
      </DotsWrapper>
      <PostContentWrapper>
        <PostHeader>
          <SubredditName>r/{subreddit}&nbsp;&middot;&nbsp;</SubredditName>
          <Creator>{user}</Creator>
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
        </PostFooter>
      </PostContentWrapper>
    </PostContainer>  
  )
}

export default Post