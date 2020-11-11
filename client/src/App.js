import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

import { Navbar } from "./Components";
import { Home } from "./Pages";
import { Container } from "./App.components";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(undefined);
  const [postModal, setPostModal] = useState(false);
  const [subredditModal, setSubredditModal] = useState(false);

  // when comp is rendered first time
  useEffect(() => {
    // check if there's an user in localstorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
    // retrieve all posts when the app comp is rendered
    axios.get("/posts").then((res) => setPosts(res.data));
  }, []);
    

  return (
    <Container>
      <Navbar user={user} setUser={setUser} />
      <Router>
        <Route exact path="/">
          <Home user={user} setUser={setUser} posts={posts} setPosts={setPosts} postModal={postModal} setPostModal={setPostModal} subredditModal={subredditModal} setSubredditModal={setSubredditModal}/>
        </Route>
      </Router>
    </Container>
  );
}

export default App;
