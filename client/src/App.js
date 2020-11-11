import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, generatePath } from "react-router-dom";
import axios from "axios";
import "./App.css";

import { Navbar } from "./Components";
import { Home, Subreddit, Profile } from "./Pages";
import { Container } from "./App.components";

function App() {
  const [posts, setPosts] = useState([]);
  const [subreddits, setSubreddits] = useState([])
  const [user, setUser] = useState(undefined);
  const [users, setUsers] = useState([])
  const [postModal, setPostModal] = useState(false);
  const [subredditModal, setSubredditModal] = useState(false);

  // when comp is rendered first time
  useEffect(() => {
    // check if there's an user in localstorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
    // retrieve all posts when 
    axios.get("/posts").then((res) => setPosts(res.data));
    // retrieve all subreddits 
    axios.get("/subreddits").then((res) => setSubreddits(res.data));
    // retrieve all users
    axios.get("/users").then(res => setUsers(res.data))
  }, []);
    

  return (
    <Container>
      <Router>
        <Navbar subreddits={subreddits} user={user} setUser={setUser} />
        <Route exact path="/">
          <Home user={user} setUser={setUser} posts={posts} setPosts={setPosts} postModal={postModal} setPostModal={setPostModal} subredditModal={subredditModal} setSubredditModal={setSubredditModal}/>
        </Route>
        {
          subreddits.map(subreddit => 
            <Route key={subreddit._id} exact path={generatePath("/subreddits/:name", {name: subreddit.name})}>
              <Subreddit user={user} postModal={postModal} setPostModal={setPostModal} setPosts={setPosts} posts={posts} subreddit={subreddit}/>
            </Route>
          )
        }
        {
          users.map(user => 
            <Route key={user._id} exact path={generatePath("/users/:name", {name: user.username})}>
              <Profile user={user}/>
            </Route>
          )
        }
      </Router>
    </Container>
  );
}

export default App;
