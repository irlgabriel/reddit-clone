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
const Post = ({user, votes, comments, title, subreddit, creator, content, id}) => {
  
  const [dots, setDots] = useState(votes);
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
          <Creator>&middot;&nbsp; posted by {creator}</Creator>
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