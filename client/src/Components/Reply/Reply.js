import React, {useState, useEffect} from "react";
import axios from "axios";
import moment from "moment";
import {
  ReplyWrapper,
  ReplyBody,
  ReplyContainer,
  ReplyFooter,
  ReplyHeader,
  UpvotesWrapper,
  UpVote,
  DownVote,
  P,
  FooterItem,
  EditIcon,
  ReplyIcon,
  Button,
  EditReplyText,
  EditReplyWrapper,
  EditReplyFooter,
  Upvotes,
  Username,
  ReplyFooterNotLoggedIn
} from "./Reply.components"
import { set } from "mongoose";
const Reply = ({comment_id, post_id, replies, reply, user, setReplies}) => {
  const [replyUser, setReplyUser] = useState('')
  const [showReplyEdit, setShowReplyEdit] = useState(false);
  const [replyContent, setReplyContent] = useState(reply.content);

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const editReply = () => {
    if(!user) return;
    const data = {
      content: replyContent,
      user_id: user._id
    }
    axios.put(`posts/${post_id}/comments/${comment_id}/${reply._id}`, data, config)
    .then(res => {
      setReplies(replies.map(doc => doc._id === reply._id ? res.data : doc));
      setShowReplyEdit(false);
    })
    .catch(err => console.log(err))
  }
  const upvoteReply = () => {
    if(!user) return;
    const data = {
      user_id: user._id
    }
    axios.post(`posts/${post_id}/comments/${comment_id}/${reply._id}/upvote`, data, config)
    .then(res => {
      setReplies(replies.map(doc => doc._id === reply._id ? res.data : doc));
    })
    .catch(err => console.log(err))
  }
  const downvoteReply = () => {
    if(!user) return;
    const data = {
      user_id: user._id
    }
    axios.post(`posts/${post_id}/comments/${comment_id}/${reply._id}/downvote`, data, config)
    .then(res => {
      setReplies(replies.map(doc => doc._id === reply._id ? res.data : doc));
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get(`users/${reply.user_id}`)
    .then(res=> setReplyUser(res.data.username))
  }, [])
  
  return(
    <ReplyWrapper>
      <UpvotesWrapper>
        <UpVote upvoted={user && reply.upvotes.includes(user._id) ? "yes" : "no"} onClick={() => upvoteReply()} />
        <DownVote downvoted={user && reply.downvotes.includes(user._id) ? "yes" : "no" } onClick={() => downvoteReply()} />
      </UpvotesWrapper>
      <ReplyContainer>
        <ReplyHeader>
          <Username to={`/users/${replyUser}`} me={user && replyUser === user.username ? "yes" : "no"}>{replyUser}&nbsp;</Username>
          <Upvotes 
          upvoted={user && reply.upvotes.includes(user._id) ? "yes" : "no"} 
          size="12px" color="darkgray"
          downvoted={user && reply.downvotes.includes(user._id) ? "yes" : "no"}
          >
            {reply.upvotes.length - reply.downvotes.length} points&nbsp;&middot;&nbsp;
          </Upvotes>
          <P size="12px" color="darkgray">{moment(reply.createdAt).fromNow()}</P>
        </ReplyHeader>
        {
          !showReplyEdit && 
          <ReplyBody>
            {reply.content}  
          </ReplyBody>
        }
        {
          user &&
          <ReplyFooter>
            {
              showReplyEdit && 
              <EditReplyWrapper>
                <EditReplyText value={replyContent} onChange={(e) => setReplyContent(e.target.value)} >

                </EditReplyText>
                <EditReplyFooter>
                  <Button onClick={() => editReply()} color="white" bgColor="royalblue">EDIT</Button>
                </EditReplyFooter>
              </EditReplyWrapper>
            }
            <FooterItem>
              <ReplyIcon/>&nbsp;
              <p style={{color: "darkgray"}}>Reply</p>
            </FooterItem>
            {
              user && replyUser === user.username && 
              <FooterItem onClick={() => setShowReplyEdit(!showReplyEdit)}>
                <EditIcon />&nbsp;
                {!showReplyEdit ?  <p>Edit</p> : <p>Cancel</p>}
              </FooterItem>
            }
          </ReplyFooter>
        }
        {
          !user && 
          <ReplyFooterNotLoggedIn>
            
          </ReplyFooterNotLoggedIn>
        }
      </ReplyContainer>
    </ReplyWrapper>
  )
}

export default Reply;