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
  ReplyContainer,
  ReplyFooter,
} from "./PostComment.components";
const PostComment = ({
  offset = 0,
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
  const [showReply, setShowReply] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [commentAuthor, setCommentAuthor] = useState(undefined);
  const [replyContent, setReplyContent] = useState("")
  const [replies, setReplies] = useState([]);
  
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const getCommentUser = async (comment_id) => {
    try {
      const res = await axios.get(`/posts/${post_id}/comments/${comment_id}`)
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
  const getReplies = async (comment_id) => {
    const res = await axios.get(`/posts/${post_id}/comments/${comment_id}/replies`)
    console.log(res.data);
    setReplies(res.data);
  }

  const createReply = () => {
    if(!user) return;
    axios.post(`/posts/${post_id}/comments/${comment._id}/`, {user_id: user._id, content: replyContent})
    .then(res => {
      setShowReply(false);
      setReplies([...replies, res.data.reply])
      setFlash(res.data.message);
      setShowFlash(true);
      
    })
    .catch(err => {
      console.log(err, err.response); 
    })
  }
  const deleteReply = () => {
    if(!user) return;
    window.confirm("Are you sure you want to delete this reply?") && 
    axios.delete(`/posts/${post_id}/comments/${comment._id}`, {user_id: user._id}, config)
    .then(res => {
      setReplies(replies.filter(reply => reply._id !== res.data.reply._id))
      setFlash(res.data.message);
      setShowFlash(true);
    })
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
          comments.map((comm) => (comm._id === comment._id ? res.data.comment : comm))
        );
        setFlash(res.data.message);
        setShowFlash(true);
      })
      .catch((err) => {
        console.log(err);
        //setFlash(err.response.data.message);
        //setShowFlash(true);
      });
  };
  const upvoteComment = () => {
    if (!user) return;
    const body = JSON.stringify({ user_id: user._id });
    axios
      .post(`/posts/${post_id}/comments/${comment._id}/upvote`, body, config)
      .then((res) => {
        console.log(res);
        console.log(comments);
        console.log(res.data)
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
        console.log(res);
        setComments(
          comments.map((comm) => (comm._id === comment._id ? res.data : comm))
        );
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getCommentUser(comment._id);
    getReplies(comment._id);
  }, [])

  // Update downvote/upvote state when comments prop changes
  useEffect(() => {
    user && comment.upvotes.includes(user._id) ? setUpvoted("yes") : setUpvoted("no");
    user && comment.downvotes.includes(user._id) ? setDownvoted("yes") : setDownvoted("no");
  }, [comments])

  return (
    <CommentWrapper>
      <CommentContainer offset={offset}>
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
            <FooterItem onClick={() => user && setShowReply(!showReply)}>
              <CommentIcon/>
              &nbsp;
              <P size="13">
                {showReply ? "Cancel" : "Reply"}
              </P>
            </FooterItem>
            {user && comment.user_id === user._id && (
              <FooterItem onClick={() => setShowEditComment(!showEditComment)}>
                <EditIcon color="orange"/>
                &nbsp;
                <P color="orange" size="13">
                  {showEditComment ? "Cancel" : "Edit"}
                </P>
              </FooterItem>
            )}
            {user && comment.user_id === user._id && (
              <FooterItem onClick={() => deleteComment()}>
                <DeleteIcon />
                &nbsp;
                <P color="red" size="13">
                  Delete
                </P>
              </FooterItem>
            )}
            {
              showReply &&
              <ReplyContainer>
                <TextArea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} required placeholder="Reply..."/>
                <ReplyFooter>
                  <Button
                    style={{marginTop: ".5rem"}}
                    onClick={() => createReply()}
                    toRight="yes"
                    color="white"
                    bgColor="royalblue"
                  >
                    Reply
                  </Button>
                </ReplyFooter>
              </ReplyContainer>

            }
          </CommentFooter>
        </CommentContent>
      </CommentContainer>
      {
        replies.map(reply => 
          <PostComment 
            key={reply._id}
            offset={offset + 40}
            setFlash={setFlash}
            setShowFlash={setShowFlash}
            comments={replies}
            setComments={setReplies}
            post_id={reply._id}
            comment={reply}
            user={user}
          />
        )
      }
    </CommentWrapper>
  );
};

export default PostComment;
