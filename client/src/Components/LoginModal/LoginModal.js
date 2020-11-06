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
    console.log("form submitted")
    fetch("/users/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user,
        password: password,
      })
    })
    .then(res => console.log(res))
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