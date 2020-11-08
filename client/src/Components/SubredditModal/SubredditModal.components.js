import styled from "styled-components";

export const SubredditModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: rgba(173, 216, 230, 0.4);
`;
export const SubredditModalContainer = styled.div`
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

export const SubredditForm = styled.form`
  margin: 0.25rem 0;
`;
export const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid lightgray;
  border-radius: 2px;
  outline: none;
  background: white;
  width: 100%;
`;
export const Label = styled.label``;
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
