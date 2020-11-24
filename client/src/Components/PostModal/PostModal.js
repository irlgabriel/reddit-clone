import React, { useState, useEffect } from "react";
import FormData from 'form-data';
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
  TabDiv,
  FlexContainer
} from "./PostModal.components";

const PostModal = ({ subreddits, setFlash, setShowFlash, fromSubreddit, setPosts, posts, user, setPostModal }) => {
  // States for creating subreddit
  const [subreddit, setSubreddit] = useState(fromSubreddit || "");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  // State for type post (image/text)
  const [postType, setPostType] = useState('text');

  const createPost = (e) => {
    e.preventDefault();
    if(!user) return;
    if(!title) return;
    if(!image && !content) return;

    const data = new FormData();
    data.append('user', user._id);
    data.append('subreddit', subreddit);
    data.append('title', title);
    image && data.append('image', image.files[0]);
    content && data.append('content', content);

    axios
      .post("/posts", data)
      .then((res) => {
        setPostModal(false);
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
                name="subreddit"
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
          {
            postType === "text" ? 
          <FormGroup>
            <FlexContainer>
              <TabDiv selected={postType === 'text' ? "yes" : "no"} onClick={() => setPostType('text')}>Content</TabDiv>
              <TabDiv selected={postType === 'image' ? "yes" : "no"} onClick={() => setPostType('image')}>Image</TabDiv>
            </FlexContainer>
            <Label>Content</Label>
            <TextArea
              required
              onChange={(e) => setContent(e.target.value)}
              rows="10"
            ></TextArea>
          </FormGroup>
          : 
          <FormGroup>
              <FlexContainer>
              <TabDiv selected={postType === 'text' ? "yes" : "no"} onClick={() => setPostType('text')}>Content</TabDiv>
              <TabDiv selected={postType === 'image' ? "yes" : "no"} onClick={() => setPostType('image')}>Image</TabDiv>
            </FlexContainer>
            <Label>Image(jpeg/jpg/png, max: 5MB!</Label>
            <input onChange={(e) => setImage(e.target)} name="image" type="file" required/>
          </FormGroup>
          }
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
