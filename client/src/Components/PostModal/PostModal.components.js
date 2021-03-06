import styled from "styled-components";

export const PostModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(173, 216, 230, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
export const PostModalContainer = styled.div`
  background: white;
  border-radius: 5px;
  min-width: 400px;
  max-width: 600px;
  padding: 0.5rem;
  z-index: 3;
`;
export const FormGroup = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;

  &:last-child {
    width: 100%;
    text-align: center;
  }
`;
export const Header = styled.h2`
  text-align: center;
`;

export const PostForm = styled.form`
  margin: 0.25rem 0;
`;
export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 2px;
  outline: none;
  background: white;
  width: 100%;
`;
export const Label = styled.label`
  margin: .25rem 0;
`;
export const Button = styled.button`
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  outline: none;
  border: 1px solid royalblue;
  padding: 0.5rem 2rem;
  font-weight: bold;
  font-size: 12px;
  background-color: ${({ bgColor }) => `${bgColor}`};
  color: ${({ color }) => `${color}`};
  &:hover {
    text-decoration: none;
  }
`;
export const Select = styled.select``;
export const Option = styled.option``;
export const TextArea = styled.textarea`
  padding: 0.5rem;
`;
export const DisabledText = styled.p`
  background-color: lightgray;
  text-align: center;
  user-select: none;
  padding: 0.25rem 0;
`;
export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`
export const TabDiv = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  padding: .5rem;
  user-select: none;
  cursor: pointer;
  background: ${({selected}) => (selected === "yes" ? "#dae0e6" : "white")}
`