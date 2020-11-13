import axios from "axios";
import react, { useState, useEffect } from "react";
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
  CommentFooter,
  Upvote,
  Downvote,
  Content,
  CommentIcon,
  FooterItem,
  P,
} from "./PostComment.components";

const PostComment = ({ upvotes, comments, setComments, upvoted, downvoted, post_id, user, comment }) => {
  const [username, setUsername] = useState("");
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const getUsername = (user_id) => {
    axios.get(`/users/${user_id}`).then((res) => {
      setUsername(res.data.username);
    });
  };

  const upvoteComment = () => {
    if (!user) return;
    const body = JSON.stringify({ user_id: user._id });
    axios.post(`/posts/${post_id}/comments/${comment._id}/upvote`, body, config)
    .then(res => {
      setComments(comments.map(comm => comm._id === comment._id ? res.data : comm)); 
    })
    .catch(e => console.log(e));
  };
  const downvoteComment = () => {
    if (!user) return;
    const body = JSON.stringify({ user_id: user._id });
    axios.post(`/posts/${post_id}/comments/${comment._id}/downvote`, body, config)
    .then(res => {
      setComments(comments.map(comm => comm._id === comment._id ? res.data : comm)); 
    })
    .catch(e => console.log(e));
  };

  useEffect(() => {
    // set comment's user
    user && getUsername(user._id);
    // set upvote/downvote state
  }, []);
  return (
    <CommentWrapper>
      <CommentContainer>
        <DotsGroup>
          <Upvote upvoted={upvoted} onClick={() => upvoteComment()}></Upvote>
          <Downvote downvoted={downvoted} onClick={() => downvoteComment()}></Downvote>
        </DotsGroup>

        <CommentContent>
          <CommentHeader>
            <Username>{username}</Username>&nbsp;&middot;&nbsp;
            <Upvotes downvoted={downvoted} upvoted={upvoted}>{upvotes} points</Upvotes>&nbsp;&middot;&nbsp;
            <TimeAgo>12h ago</TimeAgo>
          </CommentHeader>
          <CommentBody>
            <Content>{comment.content}</Content>
          </CommentBody>
          <CommentFooter>
            <FooterItem>
              <CommentIcon />
              &nbsp;
              <P bold size="13" color="darkgray" color="darkgray">
                Reply
              </P>
            </FooterItem>
          </CommentFooter>
        </CommentContent>
      </CommentContainer>
    </CommentWrapper>
  );
};

export default PostComment;
