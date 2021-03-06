import React, { useState } from "react";
import axios from "axios";
import {
  SubredditModalWrapper,
  SubredditModalContainer,
  FormGroup,
  Header,
  SubredditForm,
  Input,
  Label,
  Button,
  TextArea
} from "./SubredditModal.components";

const SubredditModal = ({
  setShowFlash,
  setFlash,
  subreddits,
  setSubreddits,
  user,
  setSubredditModal,
}) => {
  
  const [subredditName, setSubredditName] = useState("");
  const [subredditDesc, setSubredditDesc] = useState("");
  const createSubreddit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = {
      name: subredditName,
      description: subredditDesc,
      creator: user._id,
    };
    axios.post("/subreddits", body, config)
    .then((res) => {
    console.log(res);

    setSubredditModal(false);
    console.log(subreddits, res.data.sub)
    setSubreddits([...subreddits, res.data.sub]);
    setFlash(res.data.message);
    setShowFlash(true);
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
      setFlash(err.response.message);
      setShowFlash(true);
    })
  };
  return (
    <SubredditModalWrapper onClick={() => setSubredditModal(false)}>
      <SubredditModalContainer onClick={(e) => e.stopPropagation()}>
        <SubredditForm onSubmit={(e) => createSubreddit(e)}>
          <Header>Create a new Subreddit!</Header>
          <FormGroup>
            <Label>Name</Label>
            <Input
              required
              onChange={(e) => setSubredditName(e.target.value)}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <TextArea required onChange={(e) => {setSubredditDesc(e.target.value)}} rows={5} />
          </FormGroup>
          <FormGroup>
            <Button color="white" bgColor="royalblue">
              Submit
            </Button>
          </FormGroup>
        </SubredditForm>
      </SubredditModalContainer>
    </SubredditModalWrapper>
  );
};

export default SubredditModal;
