import axios from "axios";
import React, { useState, useEffect } from "react";
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
} from "./PostComment.components";
const PostComment = ({
  setFlash,
  setShowFlash,
  comments,
  setComments,
  post_id,
  user,
  comment,
}) => {
  const [upvoted, setUpvoted] = useState(user && comment.upvotes.includes(user._id) ? "yes" : "no");
  const [downvoted, setDownvoted] = useState(user && comment.downvotes.includes(user._id) ? "yes" : "no");
  const [showEditComment, setShowEditComment] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [commentAuthor, setCommentAuthor] = useState(undefined)
  
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const getCommentUser = async (comment_id) => {
    try {
      const res = await axios.get(`/posts/${post_id}/comments/${comment_id}`)
      console.log(res);
      setCommentAuthor(res.data);
    } catch(err) {
      console.log(err);
      console.log(err.response);
      if(err.response.data.message) {
        setFlash(err.response.data.message);
        setShowFlash(true);
      } 
    }
  }

  const deleteComment = () => {
    if (!user) return;
    window.confirm("Are you sure you want to delete this comment?") &&
      axios
        .delete(
          `/posts/${post_id}/comments/${comment._id}`,
          { user_id: user._id },
          config
        )
        .then((res) => {
          setComments(
            comments.filter((comm) => comm._id !== res.data.comment._id)
          );
          setFlash(res.data.message);
          setShowFlash(true);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          setFlash(err.response.data.message);
          setShowFlash(true);
        });
  };
  const editComment = () => {
    if (!user) return;
    axios
      .put(
        `/posts/${post_id}/comments/${comment._id}`,
        { content: commentContent, user_id: user._id },
        config
      )
      .then((res) => {
        setShowEditComment(false);
        setComments(
          comments.map((comm) => (comm._id === comment._id ? res.data : comm))
        );
        setFlash(res.data.message);
        setShowFlash(true);
      })
      .catch((err) => {
        setFlash(err.response.data.message);
        setShowFlash(true);
      });
  };
  const upvoteComment = () => {
    if (!user) return;
    const body = JSON.stringify({ user_id: user._id });
    axios
      .post(`/posts/${post_id}/comments/${comment._id}/upvote`, body, config)
      .then((res) => {
        setComments(
          comments.map((comm) => (comm._id === comment._id ? res.data : comm))
        );
      })
      .catch((e) => console.log(e));
  };
  const downvoteComment = () => {
    if (!user) return;
    const body = JSON.stringify({ user_id: user._id });
    axios
      .post(`/posts/${post_id}/comments/${comment._id}/downvote`, body, config)
      .then((res) => {
        setComments(
          comments.map((comm) => (comm._id === comment._id ? res.data : comm))
        );
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getCommentUser(comment._id);
  }, [])

  // Update downvote/upvote state when comments prop changes
  useEffect(() => {
    console.log(comment.upvotes, comment.downvotes)
    user && comment.upvotes.includes(user._id) ? setUpvoted("yes") : setUpvoted("no");
    user && comment.downvotes.includes(user._id) ? setDownvoted("yes") : setDownvoted("no");
  }, [comments])

  return (
    <CommentWrapper>
      <CommentContainer>
        <DotsGroup>
          <Upvote upvoted={upvoted} onClick={() => upvoteComment()}></Upvote>
          <Downvote
            downvoted={downvoted}
            onClick={() => downvoteComment()}
          ></Downvote>
        </DotsGroup>

        <CommentContent>
          <CommentHeader>
            <Username
              to={ `/users/${commentAuthor && commentAuthor.username}`}
              me={user && user._id === comment.user_id ? "yes" : "no"}
            >
              { `${commentAuthor && commentAuthor.username}`}
            </Username>
            &nbsp;&middot;&nbsp;
            <Upvotes downvoted={downvoted} upvoted={upvoted}>
              {comment.upvotes.length - comment.downvotes.length} points
            </Upvotes>
            &nbsp;&middot;&nbsp;
            <TimeAgo>{moment(comment.createdAt).fromNow()}</TimeAgo>
          </CommentHeader>
          <CommentBody>
            {!showEditComment && <Content>{comment.content}</Content>}
            {showEditComment && (
              <EditContainer>
                <TextWrapper>
                  <TextArea
                    rows={6}
                    defaultValue={comment.content}
                    onChange={(e) => setCommentContent(e.target.value)}
                  ></TextArea>
                </TextWrapper>
                <EditFooter>
                  <Button
                    onClick={() => editComment()}
                    toRight="yes"
                    color="white"
                    bgColor="royalblue"
                  >
                    EDIT
                  </Button>
                </EditFooter>
              </EditContainer>
            )}
          </CommentBody>
          <CommentFooter>
            {user && comment.user_id === user._id && (
              <FooterItem onClick={() => setShowEditComment(!showEditComment)}>
                <EditIcon />
                &nbsp;
                <P bold size="13">
                  {showEditComment ? "Cancel" : "Edit"}
                </P>
              </FooterItem>
            )}
            {user && comment.user_id === user._id && (
              <FooterItem onClick={() => deleteComment()}>
                <DeleteIcon />
                &nbsp;
                <P bold color="red" size="13">
                  Delete
                </P>
              </FooterItem>
            )}
          </CommentFooter>
        </CommentContent>
      </CommentContainer>
    </CommentWrapper>
  );
};

export default PostComment;
