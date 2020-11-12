import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, generatePath } from "react-router-dom";
import axios from "axios";
import "./App.css";

import { Navbar } from "./Components";
import { Home, Subreddit, Profile } from "./Pages";
import { Container } from "./App.components";

function App() {
  const [posts, setPosts] = useState([]);
  const [subreddits, setSubreddits] = useState([]);
  const [user, setUser] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [postModal, setPostModal] = useState(false);
  const [subredditModal, setSubredditModal] = useState(false);

  // when comp is rendered first time
  useEffect(() => {
    // check if there's an user in localstorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);

    
    // ASYNC
    // retrieve all posts
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
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
      setUsers(res.data)
    }
    fetchUsers();
  }, []);

  return (
    <Container>
      <Router>
        <Navbar subreddits={subreddits} user={user} setUser={setUser} />
        <Route exact path="/">
          <Home
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
