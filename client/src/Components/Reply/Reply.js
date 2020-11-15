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
  EditReplyFooter
} from "./Reply.components"
import { set } from "mongoose";
const Reply = ({comment_id, post_id, reply, user, setReplies}) => {
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
      setReplies([...setReplies, res.data]);
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
        <UpVote />
        <DownVote />
      </UpvotesWrapper>
      <ReplyContainer>
        <ReplyHeader>
          <P size="12px" color="black">{replyUser}&nbsp;&middot;&nbsp;</P>
          <P size="12px" color="darkgray">{reply.upvotes.length - reply.downvotes.length} points&nbsp;&middot;&nbsp;</P>
          <P size="12px" color="darkgray">{moment(reply.createdAt).fromNow()}</P>
        </ReplyHeader>
        {
          !showReplyEdit && 
          <ReplyBody>
            {reply.content}  
          </ReplyBody>
        }
        
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
      </ReplyContainer>
    </ReplyWrapper>
  )
}

export default Reply;