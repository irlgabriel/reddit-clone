import React, { useState } from "react";
import { Sidebar, Post } from "../../Components";
import {
  MainWrapper,
  UserActivities,
  PostsContainer,
} from "./Profile.components";
const Profile = ({ setFlash, setShowFlash, user, posts, profileUser }) => {
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
              key={post._id}
              posts={userPosts}
              setPosts={setUserPosts}
              user={user}
              creator_id={profileUser._id}
              post={post}
            />
          ))}
        </PostsContainer>
      </UserActivities>
      <Sidebar setFlash={setFlash} setShowFlash={setShowFlash} profilePage user={user} profileUser={profileUser} />
    </MainWrapper>
  );
};

export default Profile;
