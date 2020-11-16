import axios from "axios";
import React, { useState } from "react";
import {
  RegisterWrapper,
  RegisterContainer,
  RegisterForm,
  FormGroup,
  Input,
  Label,
  Button,
  RegisterHeader,
} from "./RegisterModal.components";
const RegisterModal = ({ setFlash, setShowFlash, setUser, setRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const RegisterHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });
    axios
      .post("/users/register", body, config)
      .then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setFlash(res.data.message);
        setShowFlash(true);
        setRegister(false);
      })
      .catch((err) => {
        console.log(err.response)
        setFlash(err.response.data.message)
        setShowFlash(true);
      });
  };

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
            <Input onChange={(e) => setUsername(e.target.value)} type="text" />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Button color="white" bgColor="royalblue">
              REGISTER
            </Button>
          </FormGroup>
        </RegisterForm>
      </RegisterContainer>
    </RegisterWrapper>
  );
};

export default RegisterModal;
