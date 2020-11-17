import React, { useState, useEffect } from "react";
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
  PageFilter,
  FilterOption,
  DropdownContainer,
  DropdownIcon
} from "./Navbar.components";
import { LoginModal, RegisterModal } from "..";
import { CSSTransition } from "react-transition-group";

const Navbar = ({ setFlash, setShowFlash, showLogin, setLogin, showRegister, setRegister, subreddits, user, setUser }) => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState([]);
  const logoutUser = () => {
    localStorage.removeItem("currentUser");
    setUser(undefined);
    setShowFlash(true);
    setFlash("Logged out successfully!");
  };
  useEffect(() => {
    const results = subreddits.filter((subreddit) =>
      subreddit.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);
  return (
    <Nav>
      <CSSTransition
        in={showLogin}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <LoginModal setFlash={setFlash} setShowFlash={setShowFlash} setLogin={setLogin} user={user} setUser={setUser} />
      </CSSTransition>

      <CSSTransition
        in={showRegister}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <RegisterModal
          setFlash={setFlash}
          setShowFlash={setShowFlash}
          setRegister={setRegister}
          user={user}
          setUser={setUser}
        />
      </CSSTransition>

      <Link to="/">
        <RedditLogo color="red" size="32px" />
      </Link>
      {
        user &&
        <PageFilter>
          <FilterOption>ALL</FilterOption>
          <DropdownContainer>
            <DropdownIcon />
          </DropdownContainer>
        </PageFilter>
      }
      <SearchBarContainer>
        <SearchIcon />
        <SearchBar
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSearchResults(true)}
          onBlur={() => setTimeout(() => setShowSearchResults(false), 150)}
          value={searchQuery}
          type="text"
          placeholder="Search subreddits..."
        />
        {showSearchResults && (
          <SearchResults>
            {searchResults.map((res) => (
              <Result to={`/subreddits/${res.name}`} key={res._id}>
                {res.name}
              </Result>
            ))}
          </SearchResults>
        )}
      </SearchBarContainer>
      {user && (
        <UserSection to={`/users/${user.username}`}>
          {user.username}
        </UserSection>
      )}
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
