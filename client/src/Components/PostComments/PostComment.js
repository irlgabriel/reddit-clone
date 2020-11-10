import react, {useState} from "react";
import {
  CommentWrapper,
  DotsGroup,
  CommentContainer,
  CommentContent,
  Username,
  Upvotes,
  TimeAgo,
  CommentHeader,
  CommentBody,
  Upvote,
  Downvote
  
} from "./PostComment.components"
const PostComment = ({user, comment}) => {
  const [upvotes, setUpvotes] = useState(comment.upvotes.length - comment.downvotes.length)
  return (
    <CommentWrapper>
      <CommentContainer>
        <DotsGroup>
          <Upvote></Upvote>
          <Downvote></Downvote>
        </DotsGroup>

        <CommentContent>
          <CommentHeader>
            <Username>{comment._id}</Username>&nbsp;&middot;&nbsp;
            <Upvotes>{upvotes} points</Upvotes>&nbsp;&middot;&nbsp;
            <TimeAgo>12h ago</TimeAgo>
          </CommentHeader>
        </CommentContent>

      </CommentContainer>
    </CommentWrapper>
  )
}

export default PostComment;