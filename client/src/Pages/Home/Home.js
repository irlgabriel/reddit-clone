import React, {useEffect} from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import { Sidebar, Post, PostModal, SubredditModal } from "../../Components";
import {
  MainWrapper,
  PostsContainer,
  SortSection,
  SortOption,
  PostsHeader,
  PostIcon,
  RedditLogo,
  Paragraph,
  BestIcon,
  NewIcon,
  Button
} from "./Home.components";
const Home = ({
  setFlash,
  setShowFlash,
  setLogin,
  setRegister,
  setSubreddits,
  subreddits,
  posts,
  setPosts,
  user,
  postModal,
  setPostModal,
  subredditModal,
  setSubredditModal,
  sort,
  setSort
}) => {
  // query subreddit posts
  useEffect(() => {
    user && axios.get(`/posts/${user._id}/subscribed`)
    .then(res => {
      setPosts(res.data.posts);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  // reload subscribed posts when subreddits changes
  useEffect(() => {
    user && axios.get(`/posts/${user._id}/subscribed`)
    .then(res => {
      setPosts(res.data.posts);
    })
  }, [subreddits])
  return (
    <div> 
      {/* PostModal and SubredditModal transitions */}
      <CSSTransition
        in={postModal}
        classNames="fade"
        timeout={300}
        unmountOnExit
      >
        <PostModal
          setFlash={setFlash}
          setShowFlash={setShowFlash}
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
        <SubredditModal
          setFlash={setFlash}
          setShowFlash={setShowFlash}
          user={user}
          subreddits={subreddits}
          setSubreddits={setSubreddits}
          setSubredditModal={setSubredditModal}
        />
      </CSSTransition>
      <MainWrapper>
        <PostsContainer>
          {
            user && 
            <PostsHeader onClick={() => setSubredditModal(true)}>
              <RedditLogo />
              <Paragraph>Create a new Subreddit.</Paragraph>
            </PostsHeader>
          }
          {
            user &&
            <PostsHeader onClick={() => setPostModal(true)}>
              <PostIcon />
              <Paragraph>Create a Post.</Paragraph>
            </PostsHeader>
          }
          {
            !user &&
            <PostsHeader>
              <Button onClick={() => setRegister(true)} color="royalblue" bgColor="white">SIGN UP</Button>
              <Paragraph>or</Paragraph>&nbsp;
              <Button onClick={() => setLogin(true)} color="white" bgColor="royalblue">SIGN IN</Button>
              <Paragraph>to create posts/subreddits</Paragraph>
            </PostsHeader>
          }
          {
            posts.length !== 0 && 
            <SortSection>
              <SortOption onClick={() => setSort("New")} selected={sort === "New" ? "yes" : "no"}>
                <NewIcon />&nbsp;New  
              </SortOption>
              <SortOption onClick={() => setSort("Best")} selected={sort === "Best" ? "yes" : "no"}>
                <BestIcon />&nbsp;Best
              </SortOption>
            </SortSection>
          }
          {
            posts.map((post) => (
              <Post
                setFlash={setFlash}
                setShowFlash={setShowFlash}
                posts={posts}
                setPosts={setPosts}
                user={user}
                post={post}
              />
            ))}
          {
            !posts.length && 
            <PostsHeader>
              <Paragraph>No posts? Subscribe to some communities!</Paragraph>
            </PostsHeader>
          }
        </PostsContainer>
        <Sidebar setFlash={setFlash} setShowFlash={setShowFlash} homePage setSubreddits={setSubreddits} user={user} subreddits={subreddits} />
      </MainWrapper>
    </div>
  );
};

export default Home;
