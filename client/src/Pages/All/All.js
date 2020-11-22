import React from "react";
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
} from "./All.components";
const All = ({
  setFlash,
  setShowFlash,
  setLogin,
  setRegister,
  setSubreddits,
  subreddits,
  posts,
  setPosts,
  user,
  setUser,
  setFilter,
  postModal,
  setPostModal,
  subredditModal,
  setSubredditModal,
  sort,
  setSort
}) => {
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
                key={post._id}
                setRegister={setRegister}
                setLogin={setLogin}
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

export default All;
