import react, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar, Post } from "../../Components";
import {
  MainWrapper,
  UserActivities,
  PostsContainer,
} from "./Profile.components";
const Profile = ({ user, posts, profileUser }) => {
  const [userPosts, setUserPosts] = useState(
    posts.filter((post) => post.user === profileUser._id)
  );

  return (
    <MainWrapper>
      <UserActivities>
        {/** Search for posts/comments made by this user here */}
        <PostsContainer>
          {userPosts.map((post) => (
            <Post
              posts={userPosts}
              setPosts={setUserPosts}
              user={user}
              id={post._id}
              key={post._id}
              creator_id={profileUser._id}
              content={post.content}
              subreddit={post.subreddit}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
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
      </UserActivities>
      <Sidebar profilePage user={user} profileUser={profileUser} />
    </MainWrapper>
  );
};

export default Profile;
