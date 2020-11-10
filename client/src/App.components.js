import styled from "styled-components";
import { BsFilePost } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";

export const Container = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  background-color: #dae0e6;
`;
export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #dae0e6;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
`;
export const PostsContainer = styled.div`
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
export const RedditLogo = styled(FaReddit)`
  color: red;
  font-size: 24px;
  margin: 0 0.25rem;
`;
export const Paragraph = styled.p`
  font-size: 20px;
`;
