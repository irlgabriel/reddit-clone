import react, { useState } from "react";
import axios from "axios";
import {
  SubredditModalWrapper,
  SubredditModalContainer,
  FormGroup,
  Header,
  SubredditForm,
  Input,
  Label,
  Button  
} from "./SubredditModal.components";
const SubredditModal = ({user, setSubredditModal}) => {
  const [subredditName, setSubredditName] = useState('')
  const createSubreddit = () => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const body = {
      name: subredditName,
      creator: user._id,
    }
    axios.post("/subreddits", body, config)
    .then(res => {
      console.log(res);
    })
  }
  return (
    <SubredditModalWrapper onClick={() => setSubredditModal(false)}>
      <SubredditModalContainer onClick={(e) => e.stopPropagation()}>
        <SubredditForm onSubmit={() => createSubreddit()}>
          <Header>Create a new Subreddit!</Header>
          <FormGroup>
            <Label>Name</Label>
            <Input onChange={(e) => setSubredditName(e.target.value)} type="text"/>
          </FormGroup>
          <FormGroup>
            <Button color="white" bgColor="royalblue">Submit</Button>
          </FormGroup>
        </SubredditForm>
      </SubredditModalContainer>
    </SubredditModalWrapper>
  )
}

export default SubredditModal