import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PostModalWrapper,
  PostModalContainer,
  PostForm,
  FormGroup,
  Label,
  Input,
  Button,
  Option,
  Select,
  TextArea,
  Header,
  DisabledText,
} from "./PostModal.components";

const PostModal = ({ setFlash, setShowFlash, fromSubreddit, setPosts, posts, user, setPostModal }) => {
  const [subreddits, setSubreddits] = useState([]);
  // States for creating subreddit
  const [subreddit, setSubreddit] = useState(fromSubreddit || "");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const createPost = (e) => {
    e.preventDefault();
    if(!title || !content) return;
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      user,
      subreddit,
      title,
      content,
    });
    axios
      .post("/posts", body, config)
      .then((res) => {
        setPostModal(false);
        console.log(posts);
        setPosts([res.data.post, ...posts])
        setFlash(res.data.message);
        setShowFlash(true);
      })
      .catch((err) => {
        console.log(err);
        if(err.response) {
          setFlash(err.response.data.message);
          setShowFlash(true);
        }
      })
  };
  return (
    <PostModalWrapper onClick={() => setPostModal(false)}>
      <PostModalContainer onClick={(e) => e.stopPropagation()}>
        <PostForm onSubmit={(e) => createPost(e)}>
          <Header>Create a new Post</Header>
          <FormGroup>
            <Label>Subreddit</Label>
            {fromSubreddit && <DisabledText>{fromSubreddit}</DisabledText>}
            {!fromSubreddit && (
              <Select
                defaultValue={fromSubreddit || subreddit.name}
                onChange={(e) => setSubreddit(e.target.value)}
                name="subreddits"
              >
                {subreddits.map((subreddit) => (
                  <Option key={subreddit.name} value={`${subreddit.name}`}>{subreddit.name}</Option>
                ))}
              </Select>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Title</Label>
            <Input required onChange={(e) => setTitle(e.target.value)} type="text" />
          </FormGroup>
          <FormGroup>
            <Label>Content</Label>
            <TextArea
              required
              onChange={(e) => setContent(e.target.value)}
              rows="10"
            ></TextArea>
          </FormGroup>
          <FormGroup>
            <Button type="submit" color="white" bgColor="royalblue">
              Post
            </Button>
          </FormGroup>
        </PostForm>
      </PostModalContainer>
    </PostModalWrapper>
  );
};

export default PostModal;
