import React, { useState } from "react";
import axios from "axios";
import { 
  Nav,
  RedditLogo,
  SearchBarContainer,
  SearchBar,
  Button,
  SearchIcon,
  ButtonGroup,
  UserSection,
  Link
} from "./Navbar.components";
import { LoginModal, RegisterModal } from "..";
import { CSSTransition } from "react-transition-group";

const Navbar = ({user, setUser}) => {
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const logoutUser = () => {
    /*
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    axios.post("http://localhost:4000/users/logout", user, config)
    */
   localStorage.removeItem('currentUser');
   setUser(undefined);
  }
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

      <Link href ="/"><RedditLogo color="red" size="32px" /></Link>
      <SearchBarContainer>
        <SearchIcon />
        <SearchBar type="text" placeholder="You can try to search but I have not implemented this feature yet"/>
      </SearchBarContainer>
      {user && <UserSection>{user.username}</UserSection>}
      <ButtonGroup>
        {!user && <Button onClick={() => setRegister(true)} color="royalblue" bgColor="white">SIGN UP</Button>}
        {!user && <Button onClick={() => setLogin(true)} color="white" bgColor="royalblue">SIGN IN</Button>}
        {user && <Button onClick={()=> logoutUser()} color="royalblue" bgColor="white">LOG OUT</Button>}
      </ButtonGroup>
    </Nav>
  )
}
export default Navbar;