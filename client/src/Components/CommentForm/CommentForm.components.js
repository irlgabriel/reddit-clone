import styled from "styled-components";

export const FormWrapper = styled.div`
  padding: .5rem;
  padding-top: 0;
  width: 100%;
`
export const Form = styled.div`

`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: ${({borderColor}) => `1px solid ${borderColor}`};
  border-radius: 5px;

`
export const TextArea = styled.textarea`
  width: 100%;
  margin: 0 auto;
  max-width: 100%;
  min-height: 100px;
  border: none;
  resize: vertical;
  padding: .5rem;
  border-radius: 5px;
  &:focus {
    outline: 0;
  }

`
export const Button = styled.a`
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  border-radius: 4px;
  outline: none;
  border: 1px solid royalblue;
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 12px;
  margin-left: auto;
  background-color: ${({ bgColor }) => `${bgColor}`};
  color: ${({ color }) => `${color}`};
  &:hover {
    text-decoration: none;
  }
`;
export const FormFooter = styled.div`
  display: flex;
  padding: .25rem .5rem;
  width: 100%;
  background: #f9f9f9;
  margin-bottom: auto;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

`
export const P = styled.p`
  font-size: 14px;
`