import axios from "axios";
import React, { useState } from "react";
import {
  LoginWrapper,
  LoginContainer,
  LoginForm,
  FormGroup,
  Input,
  Label,
  Button,
  LoginHeader
} from "./LoginModal.components";
const LoginModal = ({setLogin, user, setUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const body = JSON.stringify({
      username: username,
      password: password,
    });
    axios.post("/users/login", body, config)
    .then(res => {
      // Logged in Successfully!
      setUser(res.data.user);
    })
    .catch(err => console.log(err))
  }

  return (
    <LoginWrapper onClick={() => setLogin(false)}>
      <LoginContainer onClick={(e) => e.stopPropagation()}>
        <LoginHeader>LOG IN</LoginHeader>
        <LoginForm onSubmit={(e) => loginHandler(e)}>
          <FormGroup>
            <Label>Username</Label>
            <Input onChange={(e) => setUsername(e.target.value)} type="text"/>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input onChange={(e) => setPassword(e.target.value)} type="password" />
          </FormGroup>
          <FormGroup>
            <Button color="white" bgColor="royalblue">LOG IN</Button>
          </FormGroup>
        </LoginForm>
      </LoginContainer>
    </LoginWrapper>
  )
}

export default LoginModal;