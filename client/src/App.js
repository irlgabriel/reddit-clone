import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import { Home } from "./Pages";
import { Container } from "./App.components";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(undefined);
  const [postModal, setPostModal] = useState(false);
  const [subredditModal, setSubredditModal] = useState(false);

  // retrieve all posts when the app comp is rendered
  useEffect(() => {
    axios.get("/posts").then((res) => setPosts(res.data));
  }, []);
  // check if there's an user in localstorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  return (
    <Container>
      <Home user={user} setUser={setUser} posts={posts} setPosts={setPosts} postModal={postModal} setPostModal={setPostModal} subredditModal={subredditModal} setSubredditModal={setSubredditModal}/>
    </Container>
  );
}

export default App;
