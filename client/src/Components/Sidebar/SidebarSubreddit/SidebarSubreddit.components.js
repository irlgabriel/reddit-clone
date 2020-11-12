import styled from "styled-components";
import { Link } from "react-router-dom";

export const SubredditContainer = styled.div`
  padding: 0.5rem;
  text-decoration: none;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 14px;

`;
export const SubredditInfo = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;

`
export const SubredditName = styled(Link)`
  color: black;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold !important;
  &:hover {
    background: lightgray;
  }
`
export const SubredditMembers = styled.p`

`
export const Button = styled.button`
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  outline: none;
  border: 0;
  padding: 0.35rem 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
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