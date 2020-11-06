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
  useEffect(() => {
    fetch('/posts', {
      mode: "no-cors"
    })
    .then(res => res.json()
      .then(data => setPosts(data))
    
    )    
  }, [])

  return (
    <Container>
      <Navbar />
      <MainWrapper>
        <PostsContainer>
          {posts.map(post =>
          <Post 
          key={post._id}
          user={post.user}
          content={post.content}
          subreddit={post.subreddit}
          title={post.title}
          votes={post.votes}
          comments={post.comments}
          />
          )}
        </PostsContainer>
        <Sidebar>

        </Sidebar>
      </MainWrapper>
    </Container>
  );
}

export default App;
