import React from "react";
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
  LogoDiv
} from "./Sidebar.components";

const Sidebar = () => {
  //960px hidden
  return (
    <SidebarContainer>
      <Header>
        <LogoDiv>
          <MongoLogo />
          <img src="/expressjs-icon.svg" width="32px"/>
          <ReactLogo />
          <NodeLogo/>
        </LogoDiv>
        <Title>Powered by mongoDB, Express, React and nodeJS!</Title>
        <Subtitle>Deployed on &nbsp;<HerokuLogo />Heroku!</Subtitle>
      </Header>
      <Description>This application is built solely for learning purposes!  </Description>
    </SidebarContainer>
  );
};

export default Sidebar;
