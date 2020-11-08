import React from "react";
import { CSSTransiton } from "react-transition-group";
import {
  SidebarContainer,
  Header,
  Title,
  Description,
  RedditLogo,
} from "./Sidebar.components";

const Sidebar = () => {
  //960px hidden
  return (
    <SidebarContainer>
      <Header>
        <Title></Title>
      </Header>
      <Description></Description>
    </SidebarContainer>
  );
};

export default Sidebar;
