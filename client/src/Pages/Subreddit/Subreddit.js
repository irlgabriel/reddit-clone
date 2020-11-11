import react, {useState, useEffect} from "react";
import { 
  MainWrapper,
  PostsContainer,
  PostsHeader,
  Paragraph,
  PostIcon
} from "./Subreddit.components";
import { Sidebar, Post, PostModal } from "../../Components";

const Subreddit = ({setPostModal, postModal, posts, setPosts, user, subreddit}) => {
  const [subredditPosts, setSubredditPosts] = useState(posts.filter(post => post.subreddit === subreddit.name))

  return (
    <MainWrapper>
      {
        postModal && <PostModal fromSubreddit={subreddit.name} setPostModal={setPostModal} user={user} posts={posts} setPosts={setPosts}/>
      }
      <PostsContainer>
      <PostsHeader onClick={() => setPostModal(true)}>
        <PostIcon />
        <Paragraph>Create a Post.</Paragraph>
      </PostsHeader>
        {
          subredditPosts.map(post => 
            <Post
              posts={subredditPosts}
              setPosts={setSubredditPosts}
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