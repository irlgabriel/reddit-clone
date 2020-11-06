import React, { useState } from "react";
import { 
  Nav,
  RedditLogo,
  SearchBarContainer,
  SearchBar,
  Button,
  SearchIcon,
  ButtonGroup
} from "./Navbar.components";
import { LoginModal, RegisterModal } from "..";
import { CSSTransition } from "react-transition-group";

const Navbar = () => {
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  return (
    <Nav>
      <CSSTransition
        in={showLogin}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <LoginModal
          setLogin={setLogin}
        />
      </CSSTransition>

      <CSSTransition
        in={showRegister}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <RegisterModal
          setRegister={setRegister}
        />
      </CSSTransition>

      <RedditLogo color="red" size="32px" />
      <SearchBarContainer>
        <SearchIcon />
        <SearchBar type="text" placeholder="Search"/>
      </SearchBarContainer>
      <ButtonGroup>
        <Button onClick={() => setRegister(true)} color="royalblue" bgColor="white">SIGN UP</Button>
        <Button onClick={() => setLogin(true)} color="white" bgColor="royalblue">SIGN IN</Button>
      </ButtonGroup>
    </Nav>
  )
}
export default Navbar;