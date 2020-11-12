import react from "react";
import { CSSTransition } from "react-transition-group";
import { Sidebar, Post, PostModal, SubredditModal } from "../../Components";
import {
  MainWrapper,
  PostsContainer,
  PostsHeader,
  PostIcon,
  RedditLogo,
  Paragraph,
} from "./Home.components";
const Home = ({
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
}) => {
  return (
    <div>
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
        <SubredditModal
          user={user}
          setSubreddits={setSubreddits}
          setSubredditModal={setSubredditModal}
        />
      </CSSTransition>
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
          {
            posts.map((post) => (
              <Post
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
                upvoted={user && post.upvotes.includes(user._id) ? "yes" : "no"}
                downvoted={
                  user && post.downvotes.includes(user._id) ? "yes" : "no"
                }
              />
            ))}
        </PostsContainer>
        <Sidebar setSubreddits={setSubreddits} user={user} subreddits={subreddits} />
      </MainWrapper>
    </div>
  );
};

export default Home;
