import react, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar, Post } from "../../Components";
import { 
  MainWrapper, 
  UserActivities,
  CommentsContainer,
  PostsContainer,
} from "./Profile.components";
const Profile = ({posts, setPosts, user}) => {
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    setUserPosts(posts.filter(post => post.user === user._id));
  }, [])
  return (
    <MainWrapper>
      <UserActivities>
        {/** Search for posts/comments made by this user here */}
        <PostsContainer>
        {
          userPosts.map(post => 
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

      </UserActivities>
      <Sidebar profileUser={user}/>
    </MainWrapper>
  )
}

export default Profile;