import React, { useState } from "react";
import {
  PostContainer,
  DotsWrapper,
  DotsContainer,
  DotsCount,
  UpDot,
  DownDot,
} from "./Post.components"
const Post = () => {
  const [dots, setDots] = useState(0);
  return(
    <PostContainer>
      {/* Votes Container */}
      <DotsWrapper>
        <DotsContainer>
          <UpDot />
          <DotsCount>{dots}</DotsCount>
          <DownDot />
        </DotsContainer>
      </DotsWrapper>

    </PostContainer>  
  )
}

export default Post