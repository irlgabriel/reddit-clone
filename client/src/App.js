import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, generatePath } from "react-router-dom";
import axios from "axios";
import "./App.css";


// Components
import { CSSTransition } from "react-transition-group";
import { Navbar } from "./Components";
import { Home, Subreddit, Profile } from "./Pages";
import { Container, FlashContainer} from "./App.components";

function App() {
  const [posts, setPosts] = useState([]);
  const [subreddits, setSubreddits] = useState([]);
  const [user, setUser] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [postModal, setPostModal] = useState(false);
  const [subredditModal, setSubredditModal] = useState(false);
  const [sort, setSort] = useState("New");
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [flashMessage, setFlash] = useState("");

  const compareByDate = (a, b) => {
    return a.createdAt >= b.createdAt ? -1 : 1;
  }

  const compareByVotes = (post1, post2) => {
    const post1_upvotes = post1.upvotes.length - post1.downvotes.length;
    const post2_upvotes = post2.upvotes.length - post2.downvotes.length;
    return post1_upvotes > post2_upvotes ? -1 : 1;
  }


  // SORT LOGIC
  useEffect(() => {
    if(sort === "New") {
      setPosts(posts => [...posts].sort(compareByDate));
     } else {
      setPosts(posts => [...posts].sort(compareByVotes)); 
     }
  }, [sort])

  // fetch data when app is rendered
  useEffect(() => {
    // check if there's an user in localstorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);

    // ASYNC
    // retrieve all posts
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data.sort(compareByDate));
    }
    fetchPosts();
    // retrieve all subreddits
    const fetchSubreddits = async () => {
      const res = await axios.get("/subreddits");
      setSubreddits(res.data);
    }
    fetchSubreddits();
    // retrieve all users
    const fetchUsers = async () => {
      const res = await axios.get("/users");
      setUsers(res.data);
    }
    fetchUsers();
    
  }, []);

  // Everytime a flash message is displayed we reset the state after 3000ms.
  useEffect(() => {
    setTimeout(() => {
      setFlash("");
      setShowFlash(false);
    }, 3000)
  }, [showFlash])
  return (
    <Container>
      {
        
        <CSSTransition
          in={showFlash}
          timeout={300}
          unmountOnExit
          classNames="fade"
        >
          <FlashContainer>
            <p>{flashMessage}</p>
          </FlashContainer>
        </CSSTransition>
      }
      <Router>
        <Navbar
          setFlash={setFlash}
          setShowFlash={setShowFlash}
          showLogin={showLogin}
          setLogin={setLogin}
          showRegister={showRegister}
          setRegister={setRegister}
          subreddits={subreddits}
          user={user} 
          setUser={setUser} 
        />
        <Route exact path="/">
          <Home
            setFlash={setFlash}
            setShowFlash={setShowFlash}
            showLogin={showLogin}
            setLogin={setLogin}
            showRegister={showRegister}
            setRegister={setRegister}
            user={user}
            setUser={setUser}
            posts={posts}
            setPosts={setPosts}
            setSubreddits={setSubreddits}
            postModal={postModal}
            setPostModal={setPostModal}
            subredditModal={subredditModal}
            setSubredditModal={setSubredditModal}
            subreddits={subreddits}
            sort={sort}
            setSort={setSort}
          />
        </Route>
        {
          subreddits.map((subreddit) => (
            <Route
              key={subreddit._id}
              exact
              path={generatePath("/subreddits/:name", { name: subreddit.name })}
            >
              <Subreddit
                setFlash={setFlash}
                setShowFlash={setShowFlash}
                subreddits={subreddits}
                setSubreddits={setSubreddits}
                setRegister={setRegister}
                setLogin={setLogin}
                user={user}
                postModal={postModal}
                setPostModal={setPostModal}
                setPosts={setPosts}
                posts={posts}
                subreddit={subreddit}
              />
            </Route>
          ))}
        {
          users.map((profileUser) => (
            <Route
              key={profileUser._id}
              exact
              path={generatePath("/users/:name", {
                name: profileUser.username,
              })}
            >
              <Profile
                setFlash={setFlash}
                setShowFlash={setShowFlash}
                setPosts={setPosts}
                posts={posts}
                profileUser={profileUser}
                user={user}
              />
            </Route>
          ))}
      </Router>
    </Container>
  );
}

export default App;
