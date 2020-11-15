import React from "react";
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

  SubredditSection
} from "./Sidebar.components";

const Sidebar = ({ profilePage, subredditPage, homePage, subreddit, user, profileUser, subreddits, setSubreddits }) => {

  //960px hidden
  return (
    <SidebarContainer>
      
      {
        /* show some info about user if sidebar is shown in the Profile Page */
        profilePage && 
        <Title>{profileUser.username}</Title>
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
          <SidebarSubreddit key={sub._id} subreddits={subreddits} setSubreddits={setSubreddits} sub={sub} user={user} />
        )
      }
      {
        /* if subredditPage prop is provided we show some info about this particular subreddit like the amount of members
        sub status and sub description */
        subredditPage && 
        <SubredditSection>
          <SidebarSubreddit subreddits={subreddits} setSubreddits={setSubreddits} sub={subreddit} user={user}/>
          <Description>{subreddit.description}</Description>
        </SubredditSection>
      }
      <Header>
        <LogoDiv>
          <MongoLogo />
          <img src="/expressjs-icon.svg" width="32px" />
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
