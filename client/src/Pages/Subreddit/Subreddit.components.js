import styled from "styled-components";
import { BsFilePost } from "react-icons/bs";
export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #dae0e6;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
`;
export const PostsContainer = styled.div`
  width: 600px;
  min-width: 400px;
`;
export const PostsHeader = styled.div`
  margin-top: 0.5rem;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 4px;
  &:hover {
    border: 1px solid black;
  }
`;
export const PostIcon = styled(BsFilePost)`
  font-size: 24px;
  color: royalblue;
  margin: 0 0.25rem;
`;
export const Paragraph = styled.p`
  font-size: 20px;
`;
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
  margin-right: 0.25rem;
  background-color: ${({ bgColor }) => `${bgColor}`};
  color: ${({ color }) => `${color}`};
  &:hover {
    text-decoration: none;
  }
  &:first-child {
    margin: 0 0.25rem;
  }
  &:hover {
    opacity: .75;
  }
`;
export const ParagraphSlim = styled.p`
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
`;