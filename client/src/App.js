import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Navbar, Sidebar, Post, PostModal, SubredditModal } from "./Components";
import {
  Container,
  MainWrapper,
  PostsContainer,
  PostsHeader,
  PostIcon,
  RedditLogo,
  Paragraph,
} from "./App.components";
import { CSSTransition } from "react-transition-group";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(undefined);
  const [postModal, setPostModal] = useState(false);
  const [subredditModal, setSubredditModal] = useState(false);
  // retrieve all posts when the app comp is rendered
  useEffect(() => {
    /*
    fetch('/posts', {
      mode: "no-cors"
    })
    .then(res => res.json()
    .then(data => setPosts(data))
    )*/
    axios.get("/posts").then((res) => setPosts(res.data));
  }, []);
  // check if there's an user in localstorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  return (
    <Container>
      <CSSTransition
        in={postModal}
        classNames="fade"
        timeout={300}
        unmountOnExit
      >
        <PostModal
          setPosts={setPosts}
          posts={posts}
          user={user}
          setPostModal={setPostModal}
        />
      </CSSTransition>
      <CSSTransition
        in={subredditModal}
        classNames="fade"
        timeout={300}
        unmountOnExit
      >
        <SubredditModal user={user} setSubredditModal={setSubredditModal} />
      </CSSTransition>
      <Navbar user={user} setUser={setUser} />
      <MainWrapper>
        <PostsContainer>
          <PostsHeader onClick={() => setSubredditModal(true)}>
            <RedditLogo />
            <Paragraph>Create a new Subreddit.</Paragraph>
          </PostsHeader>
          <PostsHeader onClick={() => setPostModal(true)}>
            <PostIcon />
            <Paragraph>Create a Post.</Paragraph>
          </PostsHeader>
          {posts.map((post) => (
            <Post
              user={user}
              id={post._id}
              key={post._id}
              creator={post.user}
              content={post.content}
              subreddit={post.subreddit}
              title={post.title}
              upvotes={post.upvotes}
              downvotes={post.downvotes}
              comments={post.comments}
            />
          ))}
        </PostsContainer>
        <Sidebar />
      </MainWrapper>
    </Container>
  );
}

export default App;