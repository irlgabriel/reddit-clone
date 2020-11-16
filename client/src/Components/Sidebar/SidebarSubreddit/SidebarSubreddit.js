import React, { useState, useEffect } from "react";
import axios from "axios"
//Styled comps
import {
  SubredditContainer,
  SubredditInfo,
  SubredditName,
  SubredditMembers,
  Button,
  DisabledButton
} from "./SidebarSubreddit.components";

const SidebarSubreddit = ({ setFlash, setShowFlash, subreddits, setSubreddits, user, sub}) => {
  const [subscribed, setSubscribed] = useState(false)
  const [members, setMembers] = useState(sub.members.length)

  useEffect(() => {
    !user 
    ? setSubscribed(false) 
    : sub.members.includes(user._id) ? setSubscribed(true) : setSubscribed(false);
  }, [user])

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  }
  const joinSubreddit = (sub) => {
    if(!user) return;
    axios.post(`/subreddits/${sub._id}/subscribe`, {user_id: user._id}, config)
    .then(res => {
      setSubreddits(subreddits.map(sub => sub._id === res.data._id ? res.data : sub))
      setSubscribed(true);
      setMembers(members + 1);
      setFlash(res.data.message);
      setShowFlash(true);
    })
    .catch(e => console.log(e))
  }
  const leaveSubreddit = (sub) => {
    if(!user) return;
    axios.post(`/subreddits/${sub._id}/unsubscribe`, {user_id: user._id}, config)
    .then(res => {
      setSubreddits(subreddits.map(sub => sub._id === res.data._id ? res.data : sub))
      setSubscribed(false);
      setMembers(members - 1);
      setFlash(res.data.message);
      setShowFlash(true);
    })
    .catch(e => console.log(e));
  }

  return (
    <SubredditContainer>
      <SubredditInfo>
        <SubredditName to={`/subreddits/${sub.name}`} >r/{sub.name}</SubredditName>
        <SubredditMembers>{members} members</SubredditMembers>
      </SubredditInfo>
      { !subscribed && user &&  
        <Button onClick={() => joinSubreddit(sub)} color="white" bgColor="royalblue">JOIN</Button>
      }
      {
        subscribed && user && 
        <Button type="button" onClick={() => leaveSubreddit(sub)}color="white" bgColor="red">LEAVE</Button>
      }
      {
        !user &&
        <DisabledButton disabled type="button" color="black" bgColor="#e9e9e9">JOIN</DisabledButton>
      }
    </SubredditContainer>
  )
}
export default SidebarSubreddit;