import React, { useState, useEffect } from "react";
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
  RouteLink as Link,
  SearchResults,
  Result,
} from "./Navbar.components";
import { LoginModal, RegisterModal } from "..";
import { CSSTransition } from "react-transition-group";

const Navbar = ({ subreddits, user, setUser }) => {
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState([]);
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
    localStorage.removeItem("currentUser");
    setUser(undefined);
  };
  useEffect(() => {
    setSearchResults(subreddits.filter(subreddit => subreddit.name.toLowerCase().includes(searchQuery.toLowerCase())))
  }, [searchQuery])
  return (
    <Nav>
      <CSSTransition
        in={showLogin}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <LoginModal setLogin={setLogin} user={user} setUser={setUser} />
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

      <Link to="/">
        <RedditLogo color="red" size="32px" />
      </Link>
      <SearchBarContainer>
        <SearchIcon />
        <SearchBar
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSearchResults(true)}
          onBlur={() => setShowSearchResults(false)}
          value={searchQuery}
          type="text"
          placeholder="Search subreddits..."
        />
        {showSearchResults && 
          <SearchResults>
            {
              searchResults.map(res => 
                <Result key={res._id}>{res.name}</Result>
              )
            }
          </SearchResults>
        }
      </SearchBarContainer>
      {user && <UserSection>{user.username}</UserSection>}
      <ButtonGroup>
        {!user && (
          <Button
            onClick={() => setRegister(true)}
            color="royalblue"
            bgColor="white"
          >
            SIGN UP
          </Button>
        )}
        {!user && (
          <Button
            onClick={() => setLogin(true)}
            color="white"
            bgColor="royalblue"
          >
            SIGN IN
          </Button>
        )}
        {user && (
          <Button
            onClick={() => logoutUser()}
            color="royalblue"
            bgColor="white"
          >
            LOG OUT
          </Button>
        )}
      </ButtonGroup>
    </Nav>
  );
};
export default Navbar;
