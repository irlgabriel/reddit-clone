import axios from "axios";
import react, { useState, useEffect } from "react";
import moment from "moment";
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
  DeleteIcon,
  FooterItem,
  P,
  TextArea,
  EditContainer,
  TextWrapper,
  Button,
  EditFooter,
  ReplyFooter,
  ReplyWrapper,
  ReplyForm
} from "./PostComment.components";
import { Reply } from "..";
const PostComment = ({ upvotes, comments, setComments, upvoted, downvoted, post_id, user, comment }) => {
  const [replies, setReplies] = useState([]);
  const [username, setUsername] = useState("");
  const [showReplyForm, setReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
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
  const deleteComment = () => {
    if(!user) return;
    window.confirm("Are you sure you want to delete this comment?") &&      
    axios.delete(`/posts/${post_id}/comments/${comment._id}`, {user_id: user._id}, config)
    .then(res => setComments(comments.filter(comm => comm._id !== comment._id)))
  }
  const createReply = () => {
    const data = {
      user_id: user._id,
      content: replyContent,
    }
    axios.post(`/posts/${post_id}/comments/${comment._id}`, data, config)
    .then(res => {
      setReplies([...replies, res.data]);
      setReplyForm(false);
    })
    .catch(err => console.log(err));
  }
  const editComment = () => {
    if(!user) return;
    axios.put(`/posts/${post_id}/comments/${comment._id}`, {content: commentContent, user_id: user._id}, config)
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
    // get comment's replies
    axios.get(`/posts/${post_id}/comments/${comment._id}`)
    .then(res => setReplies(res.data))
    .catch(err => console.log(err))
    
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
            <Username to={`/users/${username}`} me={user && user._id === comment.user_id ? "yes" : "no"}>{username}</Username>&nbsp;&middot;&nbsp;
            <Upvotes downvoted={downvoted} upvoted={upvoted}>{upvotes} points</Upvotes>&nbsp;&middot;&nbsp;
            <TimeAgo>{moment(comment.createdAt).fromNow()}</TimeAgo>
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
                <EditFooter>
                  <Button onClick={() => editComment()} toRight="yes" color="white" bgColor="royalblue">EDIT</Button>
                </EditFooter>
              </EditContainer>
            }
          </CommentBody>
          <CommentFooter>
            {
            showReplyForm && 
              <ReplyWrapper>
                <P size="13" color="darkgray">Reply to {username}'s comment</P>
                <ReplyForm onChange={(e) => setReplyContent(e.target.value)} placeholder="What is on your mind?"/>
                <ReplyFooter>
                  <Button color="white" bgColor="royalblue" onClick={() => createReply()}>REPLY</Button>
                </ReplyFooter>
              </ReplyWrapper>
            }
            <FooterItem onClick={() => user && setReplyForm(!showReplyForm)}>
              <CommentIcon />
              &nbsp;
              {
                !showReplyForm  
                ? <P bold size="13" color="darkgray">
                  Reply
                </P>
                : <P bold size="13" color="darkgray">
                  Cancel
                </P>
              }
            </FooterItem>
            { 
            user && comment.user_id === user._id && 
            <FooterItem onClick={() => setShowEditComment(!showEditComment)}>
              <EditIcon />
              &nbsp;
              <P bold size="13">
                {showEditComment ? 'Cancel' : 'Edit'}
              </P>
            </FooterItem>
            }
            { 
            user && comment.user_id === user._id && 
            <FooterItem onClick={() => deleteComment()}>
              <DeleteIcon />
              &nbsp;
              <P bold color="red" size="13">
                Delete
              </P>
            </FooterItem>
            }
          </CommentFooter>
        </CommentContent>
      </CommentContainer>
      {
        replies.map(reply => 
          <Reply replies={replies} setReplies={setReplies} comment_id={comment._id} post_id={post_id} reply={reply} user={user}/>  
        )
      }
    </CommentWrapper>
  );
};

export default PostComment;
