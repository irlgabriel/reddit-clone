import React, {useState, useEffect} from "react";
import axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { SidebarSubreddit } from "..";
import {
  SidebarContainer,
  Header,
  Title,
  Subtitle,
  Description,
  MongoLogo,
  ReactLogo,
  NodeLogo,
  HerokuLogo,
  LogoDiv,
  RedditAge,
  ProfileUsername,
  SubredditSection,
  KarmaCount,
  ProfileContainer,
  ProfileBody,
  ProfileHeader,
  Button,
} from "./Sidebar.components";

const Sidebar = ({ setFlash, setShowFlash, profilePage, subredditPage, homePage, subreddit, user, profileUser, subreddits, setSubreddits }) => {
  const [karma, setKarma] = useState(0);
  const history = useHistory()
  const deleteSubreddit = () => {
    window.confirm("Are you sure you want to delete this subreddit?") && 
    axios.delete(`/subreddits/${subreddit._id}`)
    .then(res => {
      console.log(subreddits, res.data.sub);
      setSubreddits(subreddits.filter(sub => sub._id !== subreddit._id))
      setFlash(res.data.message);
      setShowFlash(true);
      history.push("/all");
    })
    .catch(err => console.log(err.response))
  }

  // calculate karma info on render
  useEffect(() => {
    if(!user) return;
    axios.get(`/users/${user._id}/karma`)
    .then(res => {
      console.log(res);
      setKarma(res.data.karma)
    
    });
  }, [])
  //960px hidden
  return (
    <SidebarContainer>
      
      {
        /* show some info about user if sidebar is shown in the Profile Page */
        profilePage && 
        <ProfileContainer>
          <ProfileHeader>
            <ProfileUsername>{profileUser.username}</ProfileUsername>
            <RedditAge>Account created {moment(profileUser.createdAt).fromNow()}</RedditAge>
          </ProfileHeader>
          <ProfileBody>
            <KarmaCount count={karma}>
              Karma: {karma}
            </KarmaCount>
          </ProfileBody> 
        </ProfileContainer>
      }
      {
        /* if subreddits prop is provided we show some info about popular subreddits with links to them */
        homePage && 
        <Title>Popular Subreddits</Title>
      }     
      {
        homePage && 
        subreddits
        .slice(0, 3)
        .map(sub => 
          <SidebarSubreddit setFlash={setFlash} setShowFlash={setShowFlash} key={sub._id} subreddits={subreddits} setSubreddits={setSubreddits} sub={sub} user={user} />
        )
      }
      {
        /* if subredditPage prop is provided we show some info about this particular subreddit like the amount of members
        sub status and sub description */
        subredditPage && 
        <SubredditSection>
          <SidebarSubreddit setFlash={setFlash} setShowFlash={setShowFlash} subreddits={subreddits} setSubreddits={setSubreddits} sub={subreddit} user={user}/>
          <Description>{subreddit.description}</Description>
          <Button onClick={() => deleteSubreddit()} color="red" bgColor="white">DELETE</Button>
        </SubredditSection>
      }
      <Header>
        <LogoDiv>
          <MongoLogo />
          <img alt="express-logo" src="/expressjs-icon.svg" width="32px" />
          <ReactLogo />
          <NodeLogo />
        </LogoDiv>
        <Title>Powered by mongoDB, Express, React and nodeJS!</Title>
        <Subtitle>
          Deployed on &nbsp;
          <HerokuLogo />
          Heroku!
        </Subtitle>
      </Header>
      <Description>
        This application is built solely for learning purposes!{" "}
      </Description>
    </SidebarContainer>
  );
};

export default Sidebar;
