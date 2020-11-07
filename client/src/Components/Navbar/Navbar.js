import React, { useState } from "react";
import { 
  Nav,
  RedditLogo,
  SearchBarContainer,
  SearchBar,
  Button,
  SearchIcon,
  ButtonGroup,
  UserSection,
} from "./Navbar.components";
import { LoginModal, RegisterModal } from "..";
import { CSSTransition } from "react-transition-group";

const Navbar = ({user, setUser}) => {
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
          user={user}
          setUser={setUser}
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
          user={user}
          setUser={setUser}
        />
      </CSSTransition>

      <RedditLogo color="red" size="32px" />
      <SearchBarContainer>
        <SearchIcon />
        <SearchBar type="text" placeholder="Search"/>
      </SearchBarContainer>
      {user && <UserSection>{user.username}</UserSection>}
      <ButtonGroup>
        {!user && <Button onClick={() => setRegister(true)} color="royalblue" bgColor="white">SIGN UP</Button>}
        {!user && <Button onClick={() => setLogin(true)} color="white" bgColor="royalblue">SIGN IN</Button>}
        {user && <Button onClick={()=> setUser(undefined)} color="royalblue" bgColor="white">LOG OUT</Button>}
      </ButtonGroup>
    </Nav>
  )
}
export default Navbar;