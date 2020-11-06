import React from "react";
import { 
  Nav,
  RedditLogo,
  SearchBarContainer,
  SearchBar,
  Button,
  SearchIcon,
  ButtonGroup
} from "./Navbar.components";

const Navbar = () => {
  return (
    <Nav>
      <RedditLogo color="red" size="32px" />
      <SearchBarContainer>
        <SearchIcon />
        <SearchBar type="text" placeholder="Search"/>
      </SearchBarContainer>
      <ButtonGroup>
        <Button href="/users/login" color="royalblue" bgColor="white">LOG IN</Button>
        <Button href="/users/register" color="white" bgColor="royalblue">SIGN IN</Button>
      </ButtonGroup>
    </Nav>
  )
}
export default Navbar;