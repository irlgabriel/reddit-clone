import styled from "styled-components";

export const LoginWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(173,216,230,.4);
  
  z-index: 2;
`

export const LoginContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: .5rem;
  min-width: 400px;
  max-width: 600px;
  margin: 0 auto;
  background: white;
  z-index: 3;
`
export const LoginHeader = styled.h2`
  text-align: center;
`
export const LoginForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`
export const FormGroup = styled.div`
  margin-bottom: .5rem;
  &:last-child{
    width: 100%;
    text-align: center;
  }
`
export const Input = styled.input`
  padding: .5rem .75rem;
  border: 1px solid lightgray;
  border-radius: 2px;
  outline: none;
  background: white;
  width: 100%;
`
export const Label = styled.p`
  margin: .25rem 0;
`

export const Button = styled.a`
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  outline: none;
  border: 1px solid royalblue;
  padding: .5rem 2rem;
  font-weight: bold;
  font-size: 12px;
  background-color: ${({bgColor}) => (`${bgColor}`)};
  color: ${({color}) => (`${color}`)};
  &:hover {
    text-decoration: none;
  }
`