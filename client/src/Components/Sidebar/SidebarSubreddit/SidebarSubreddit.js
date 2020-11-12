import react, { useState, useEffect } from "react";
import axios from "axios"
//Styled comps
import {
  SubredditContainer,
  SubredditInfo,
  SubredditName,
  SubredditMembers,
  Button,
} from "./SidebarSubreddit.components";

const SidebarSubreddit = ({subreddits, setSubreddits, user, sub}) => {
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {

  }, [])

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  }
  const joinSubreddit = async (sub) => {

    if(!user) return;
    const res = await axios.post(`/subreddits/${sub._id}/subscribe`, {user_id: user._id}, config)
    setSubreddits([...subreddits, res.data])
  }
  const leaveSubreddit = async (sub) => {

    if(!user) return;
    const res = await axios.post(`/subreddits/${sub._id}/unsubscribe`, {user_id: user._id}, config)
    setSubreddits([...subreddits, res.data])
  }

  return (
    <SubredditContainer>
      <SubredditInfo>
        <SubredditName to={`/subreddits/${sub.name}`} >r/{sub.name}</SubredditName>
        <SubredditMembers>{sub.members.length} members</SubredditMembers>
      </SubredditInfo>
      { !subscribed && 
        <Button onClick={() => joinSubreddit(sub)} color="white" bgColor="royalblue">JOIN</Button>
      }
      {
        subscribed &&
        <Button type="button" onClick={() => leaveSubreddit(sub)}color="white" bgColor="red"></Button>
      }
    </SubredditContainer>
  )
}
export default SidebarSubreddit;