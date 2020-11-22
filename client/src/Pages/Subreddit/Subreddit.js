import React, { useState } from "react";
import {
  MainWrapper,
  PostsContainer,
  PostsHeader,
  Paragraph,
  PostIcon,
  Button,
  ParagraphSlim,

} from "./Subreddit.components";
import { Sidebar, Post, PostModal } from "../../Components";

const Subreddit = ({
  setFlash,
  setShowFlash,
  setPostModal,
  postModal,
  posts,
  setPosts,
  user,
  subreddit,
  setRegister,
  setLogin,
  subreddits,
  setSubreddits,

}) => {
  // only show posts from this subreddits
  const [subredditPosts, setSubredditPosts] = useState(
    posts.filter((post) => post.subreddit === subreddit.name)
  );

  return (
    <MainWrapper>
      {postModal && (
        <PostModal
          setFlash={setFlash}
          setShowFlash={setShowFlash}
          fromSubreddit={subreddit.name}
          setPostModal={setPostModal}
          user={user}
          posts={posts}
          setPosts={setPosts}
        />
      )}
      <PostsContainer>
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
        {subredditPosts.map((post) => (
          <Post
            setLogin={setLogin}
            setRegister={setLogin}
            setShowFlash={setShowFlash}
            setFlash={setFlash}
            key={post._id}
            posts={subredditPosts}
            setPosts={setSubredditPosts}
            user={user}
            post={post}
          />
        ))}
        {
          subredditPosts.length === 0 && 
          <PostsHeader>
            <ParagraphSlim>No posts? Subscribe to some communities!</ParagraphSlim>
          </PostsHeader>
        }
      </PostsContainer>
      <Sidebar setFlash={setFlash} setShowFlash={setShowFlash} subredditPage subreddits={subreddits} setSubreddits={setSubreddits} subreddit={subreddit} user={user} />
    </MainWrapper>
  );
};

export default Subreddit;
