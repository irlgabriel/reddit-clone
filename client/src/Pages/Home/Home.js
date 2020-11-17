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
  setUser,
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
          <SortSection>
            <SortOption onClick={() => setSort("New")} selected={sort === "New" ? "yes" : "no"}>
              <NewIcon />&nbsp;New  
            </SortOption>
            <SortOption onClick={() => setSort("Best")} selected={sort === "Best" ? "yes" : "no"}>
              <BestIcon />&nbsp;Best
            </SortOption>
          </SortSection>
          {
            posts.map((post) => (
              <Post
                setFlash={setFlash}
                setShowFlash={setShowFlash}
                posts={posts}
                setPosts={setPosts}
                user={user}
                id={post._id}
                key={post._id}
                creator_id={post.user}
                content={post.content}
                subreddit={post.subreddit}
                title={post.title}
                upvotes={post.upvotes}
                downvotes={post.downvotes}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                upvoted={user && post.upvotes.includes(user._id) ? "yes" : "no"}
                downvoted={user && post.downvotes.includes(user._id) ? "yes" : "no"}
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
