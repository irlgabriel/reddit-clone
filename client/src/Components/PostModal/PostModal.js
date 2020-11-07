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
} from "./PostModal.components";

const PostModal = ({setPostModal}) => {
  const [subreddits, setSubreddits] = useState([])
  useEffect(() => {
    axios.get("/subreddits")
    .then(res => setSubreddits(res.data))
  }, [])
  return (
    <PostModalWrapper onClick={() => setPostModal(false)}>
      <PostModalContainer onClick={(e) => e.stopPropagation()}>
        <PostForm>
          <Header>Create a new Post</Header>
          <FormGroup>
            <Label>Subreddit</Label>
            <Select name="subreddits">
              {subreddits.map(subreddit =>
                <Option value={`${subreddit.name}`}>{subreddit.name}</Option>
                )
              }
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Title</Label>
            <Input type="text" />
          </FormGroup>
          <FormGroup>
            <Label>Content</Label>
            <TextArea rows="10"></TextArea>
          </FormGroup>
          <FormGroup>
            <Button type="submit" color="white" bgColor="royalblue">Post</Button>
          </FormGroup>
        </PostForm>
      </PostModalContainer>
    </PostModalWrapper>
  )
}

export default PostModal;