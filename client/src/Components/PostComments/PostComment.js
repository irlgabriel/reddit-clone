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
  EditIcon,
  FooterItem,
  P,
  TextArea,
  EditContainer,
  TextWrapper,
  Button

} from "./PostComment.components";

const PostComment = ({ upvotes, comments, setComments, upvoted, downvoted, post_id, user, comment }) => {
  const [username, setUsername] = useState("");
  const [showEditComment, setShowEditComment] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content)
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
  const editComment = (updated_comment) => {
    if(!user) return;
    axios.put(`/posts/${post_id}/comments/${comment._id}`, {...updated_comment, user_id: user._id}, config)
    .then(res => {
      setShowEditComment(false);
      setComments(comments.map(comm => comm._id === comment._id ? res.data : comm))
    })
    .catch(err => console.log(err))
  }
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
    getUsername(comment.user_id);
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
            <Username me={user && user._id === comment.user_id ? "yes" : "no"}>{username}</Username>&nbsp;&middot;&nbsp;
            <Upvotes downvoted={downvoted} upvoted={upvoted}>{upvotes} points</Upvotes>&nbsp;&middot;&nbsp;
            <TimeAgo>12h ago</TimeAgo>
          </CommentHeader>
          <CommentBody>
            {
              !showEditComment && 
            <Content>{comment.content}</Content>
            }
            {
              showEditComment && 
              <EditContainer>
                <TextWrapper>
                  <TextArea rows={6} defaultValue={comment.content} onChange={(e) => setCommentContent(e.target.value)}></TextArea>
                </TextWrapper>
              </EditContainer>
            }
          </CommentBody>
          <CommentFooter>
            <FooterItem>
              <CommentIcon />
              &nbsp;
              <P bold size="13" color="darkgray" color="darkgray">
                Reply
              </P>
            </FooterItem>
            { 
            comment.user_id === user._id && 
            <FooterItem onClick={() => setShowEditComment(!showEditComment)}>
              <EditIcon />
              &nbsp;
              <P bold size="13">
                {showEditComment ? 'Cancel' : 'Edit'}
              </P>
            </FooterItem>
            }
            {
              showEditComment && 
              <Button toRight="yes" onClick={() => editComment({content: commentContent})} color="white" bgColor="royalblue">EDIT</Button>
            }
          </CommentFooter>
        </CommentContent>
      </CommentContainer>
    </CommentWrapper>
  );
};

export default PostComment;
