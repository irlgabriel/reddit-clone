import React, { useState } from "react";
import {
  RegisterWrapper,
  RegisterContainer,
  RegisterForm,
  FormGroup,
  Input,
  Label,
  Button,
  RegisterHeader
} from "./RegisterModal.components";
const RegisterModal = ({setRegister}) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const RegisterHandler = (e) => {
    e.preventDefault();
    fetch("/users/register", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user,
        email: email,
        password: password,
      })
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <RegisterWrapper onClick={() => setRegister(false)}>
      <RegisterContainer onClick={(e) => e.stopPropagation()}>
        <RegisterHeader>REGISTER</RegisterHeader>
        <RegisterForm onSubmit={RegisterHandler}>
        <FormGroup>
            <Label>Email</Label>
            <Input onChange={(e) => setEmail(e.target.value)} type="email" />
          </FormGroup>
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
        </RegisterForm>
      </RegisterContainer>
    </RegisterWrapper>
  )
}

export default RegisterModal;