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

const PostComment = ({ post_id, user, comment }) => {
  const [upvotes, setUpvotes] = useState(
    comment.upvotes.length - comment.downvotes.length
  );
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
    axios.post(`/posts/${post_id}/comments/upvote`, body, config).then();
  };
  useEffect(() => {
    // set initial upvotes count
    setUpvotes(comment.upvotes.length - comment.downvotes.length);
    // set comment's user
    getUsername(user._id);
  }, []);
  return (
    <CommentWrapper>
      <CommentContainer>
        <DotsGroup>
          <Upvote></Upvote>
          <Downvote></Downvote>
        </DotsGroup>

        <CommentContent>
          <CommentHeader>
            <Username>{username}</Username>&nbsp;&middot;&nbsp;
            <Upvotes>{upvotes} points</Upvotes>&nbsp;&middot;&nbsp;
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
