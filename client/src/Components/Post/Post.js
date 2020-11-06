import React, { useState } from "react";
import {
  PostContainer,
  DotsWrapper,
  DotsContainer,
  DotsCount,
  UpDot,
  DownDot,
  Topbar,
  SubredditName,
  Creator,
  MiddleDot
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
      <Topbar>
        <SubredditName>r/{subreddit}&nbsp;&middot;&nbsp;</SubredditName>
        <Creator>{user}</Creator>
      </Topbar>
    </PostContainer>  
  )
}

export default Post