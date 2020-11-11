import react, {useState, useEffect} from "react";
import { 
  MainWrapper,
  PostsContainer,
} from "./Subreddit.components";
import { Sidebar, Post } from "../../Components";

const Subreddit = ({posts, setPosts, user, subreddit}) => {
  const [subredditPosts, setSubredditPosts] = useState(posts.filter(post => post.subreddit === subreddit.name))

  return (
    <MainWrapper>
      <PostsContainer>
        {
          subredditPosts.map(post => 
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
              downvoted={user && post.downvotes.includes(user._id) ? "yes" : "no"}
            />  
          )
        }
      </PostsContainer>
      <Sidebar />
    </MainWrapper>
  )
}

export default Subreddit;