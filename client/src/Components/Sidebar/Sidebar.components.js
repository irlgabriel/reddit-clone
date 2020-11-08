import styled from "styled-components";
import { FaReddit } from "react-icons/fa";

export const SidebarContainer = styled.div`
  margin-top: 0.5rem;
  width: 300px;
  min-height: 500px;
  margin-left: 1rem;
  padding: 0.5rem;
  max-height: 500px;
  border-radius: 4px;
  border: 1px solid lightgray;
  background-color: white;
  overflow-x: hidden;
  &:hover {
    border: 1px solid black;
  }
  @media screen and (max-width: 960px) {
    display: none;
  }
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
`;
export const Title = styled.p``;
export const Description = styled.p`
  padding-left: 0.5rem;
`;
export const RedditLogo = styled(FaReddit)`
  color: red;
  margin: 0 0.5rem;
`;
