import React, { useState } from "react";
import {
  MainWrapper,
  PostsContainer,
  PostsHeader,
  Paragraph,
  PostIcon,
  Button,
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
  setSubreddits

}) => {
  // only show posts from this subreddits
  const [subredditPosts, setSubredditPosts] = useState(
    posts.filter((post) => post.subreddit === subreddit.name)
  );

  return (
    <MainWrapper>
      {postModal && (
        <PostModal
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
            key={post._id}
            posts={subredditPosts}
            setPosts={setSubredditPosts}
            user={user}
            post={post}
          />
        ))}
      </PostsContainer>
      <Sidebar setFlash={setFlash} setShowFlash={setShowFlash} subredditPage subreddits={subreddits} setSubreddits={setSubreddits} subreddit={subreddit} user={user} />
    </MainWrapper>
  );
};

export default Subreddit;
