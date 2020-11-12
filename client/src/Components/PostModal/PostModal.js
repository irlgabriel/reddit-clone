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

const PostModal = ({ fromSubreddit, setPosts, posts, user, setPostModal }) => {
  const [subreddits, setSubreddits] = useState([]);
  const [subreddit, setSubreddit] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // Seed state with the available subreddits
  useEffect(() => {
    axios.get("/subreddits").then((res) => {
      setSubreddits(res.data);
      if (res.data.length > 0) setSubreddit(res.data[0].name);
    });
  }, []);
  const createPost = (e) => {
    e.preventDefault();
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
        setPosts([...posts, res.data]);
      })
      .catch((err) => console.log(err));
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
                onChange={(e) => setSubreddit(e.target.value)}
                name="subreddits"
              >
                {subreddits.map((subreddit) => (
                  <Option value={`${subreddit.name}`}>{subreddit.name}</Option>
                ))}
              </Select>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Title</Label>
            <Input onChange={(e) => setTitle(e.target.value)} type="text" />
          </FormGroup>
          <FormGroup>
            <Label>Content</Label>
            <TextArea
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
