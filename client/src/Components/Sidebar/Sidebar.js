import axios from "axios";
import React, { useState, useEffect } from "react";
import { SidebarSubreddit } from "..";
import { CSSTransiton } from "react-transition-group";
import {
  SidebarContainer,
  Header,
  Title,
  Subtitle,
  Description,
  RedditLogo,
  MongoLogo,
  ReactLogo,
  NodeLogo,
  HerokuLogo,
  LogoDiv,
  FlexColumn,
  FlexRow,
  Button,
  DisabledButton
} from "./Sidebar.components";

const Sidebar = ({ subreddit, user, profileUser, subreddits, setSubreddits }) => {

  //960px hidden
  return (
    <SidebarContainer>
      
      {
        /* show some info about user if sidebar is shown in the Profile Page */
        profileUser && 
        <Title>{profileUser.username}</Title>
      }
      {
        /* if subreddits prop is provided we show some info about popular subreddits with links to them */
        subreddits && 
        <Title>Popular Subreddits</Title>
      }     
      {
        subreddits && !subreddit && 
        subreddits
        .slice(0, 3)
        .map(sub => 
          <SidebarSubreddit key={sub._id} subreddits={subreddits} setSubreddits={setSubreddits} sub={sub} user={user} />
        )
      }
      {
        /* if subreddit prop is provided we show some info about this particular subreddit like the amount of members */
        subreddit && 
        <SidebarSubreddit subreddits={subreddits} setSubreddits={setSubreddits} sub={subreddit} user={user}/>
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
