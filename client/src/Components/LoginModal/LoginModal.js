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
const LoginModal = ({setLogin}) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const body = {
      username: user,
      password: password,
    }
    const token = localStorage.getItem('token');
    if(token) config.headers['x-auth-token'] = token;
    axios.post("/users/login", body, config)
    .then(res => {
      console.log(res);
      
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
            <Input onChange={(e) => setUser(e.target.value)} type="text"/>
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