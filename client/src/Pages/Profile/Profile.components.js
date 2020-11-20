import styled from "styled-components";

export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #dae0e6;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
`;
export const UserActivities = styled.div`
  width: 600px;
  min-width: 400px;
`;
export const PostsContainer = styled.div``;
export const CommentsContainer = styled.div``;
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
export const Paragraph = styled.p`
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
`;