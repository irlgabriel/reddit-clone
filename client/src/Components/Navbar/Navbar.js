import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
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
  DropdownIcon,
  DropdownCollapse,
  HomeIcon,
  RiseIcon,
} from "./Navbar.components";
import { LoginModal, RegisterModal } from "..";
import { CSSTransition } from "react-transition-group";

const Navbar = ({ filter, setFilter, setFlash, setShowFlash, showLogin, setLogin, showRegister, setRegister, subreddits, user, setUser }) => {
  const location = useLocation();
  const history = useHistory();
  const [showDropdown, setDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const logoutUser = () => {
    //localStorage.removeItem("currentUser");
    axios.post('/users/logout')
    .then(res => {
      setUser(undefined);
      setFlash(res.data.message);
      setShowFlash(true);
      history.push("/all");
    })
    .catch(err => console.log(err))
  };
  // on search query change
  useEffect(() => {
    const results = subreddits.filter((subreddit) =>
      subreddit.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  // on filter change
  useEffect(() => {
    filter === "HOME" ? history.push("/") : history.push("/all")
  }, [filter])
  
  // on page change
  useEffect(() => {
    const path = history.location.pathname.split('/')[1].toUpperCase()
    console.log(path);
    switch(path) {
      case '': 
        setFilter("HOME")
        break;
      case 'HOME':
        setFilter("ALL");
        break;
    }
  }, [history.location.pathname])
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

      <Link to={user ? "/" : "/all"}>
        <RedditLogo color="red" size="32px" />
      </Link>
      {
        user && (location.pathname === "/" || location.pathname === "/all") && 
        <PageFilter onBlur={() => setDropdown(false)} onClick={() => setDropdown(!showDropdown)}>
          <FilterOption>{filter === "HOME" ? <HomeIcon/> : <RiseIcon />}{filter}</FilterOption>
          <DropdownContainer>
            <DropdownIcon /> 
          </DropdownContainer>
          {
            showDropdown && 
            <DropdownCollapse>
              <FilterOption onClick={(e) => setFilter(e.target.innerText)}>{filter === "HOME" ? "ALL" : "HOME"}</FilterOption>
            </DropdownCollapse>
          }
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
