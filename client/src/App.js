import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import { 
  Navbar,
  Sidebar,
  Post
} from "./Components";
import { 
  Container,
  MainWrapper,
  PostsContainer,
} from "./App.components";

function App() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(undefined)
  
  // retrieve all posts when the app comp is rendered
  useEffect(() => {
    fetch('/posts', {
      mode: "no-cors"
    })
    .then(res => res.json()
    .then(data => setPosts(data))
    )    
  }, [])
  // check if there's an user in localstorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser) setUser(currentUser)
  }, [])

  return (
    <Container>
      <Navbar user={user} setUser={setUser}/>
      <MainWrapper>
        <PostsContainer>
          {posts.map(post =>
          <Post 
          user={user}
          id={post._id}
          key={post._id}
          creator={post.user}
          content={post.content}
          subreddit={post.subreddit}
          title={post.title}
          votes={post.votes}
          comments={post.comments}
          />
          )}
        </PostsContainer>
        <Sidebar />
      </MainWrapper>
    </Container>
  );
}

export default App;
