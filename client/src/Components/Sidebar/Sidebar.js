import Axios from "axios";
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
} from "./Sidebar.components";

const Sidebar = ({ user, profileUser, subreddits, setSubreddits }) => {
  

  //960px hidden
  return (
    <SidebarContainer>
      {profileUser && 
        <Title>{profileUser.username}</Title>
      }
      <Title>Popular Subreddits</Title>
      {subreddits &&
        subreddits
          .slice(0, 3)
          .map(sub => 
            <SidebarSubreddit key={sub._id} subreddits={subreddits} setSubreddits={setSubreddits} sub={sub} user={user} />
          )}
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
