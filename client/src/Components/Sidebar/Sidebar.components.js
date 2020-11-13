import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaReddit, FaNode, FaReact } from "react-icons/fa";
import { SiMongodb, SiHeroku } from "react-icons/si";
export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-top: auto;
  font-size: 24px;
`;
export const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
  svg,
  img {
    margin-left: 0.5rem;
  }
`;
export const Title = styled.p``;
export const Subtitle = styled.p`
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;
export const Description = styled.p``;
export const RedditLogo = styled(FaReddit)`
  color: red;
  margin: 0 0.5rem;
`;
export const NodeLogo = styled(FaNode)`
  color: green;
`;
export const ReactLogo = styled(FaReact)`
  color: lightblue;
`;
export const MongoLogo = styled(SiMongodb)`
  color: green;
`;
export const HerokuLogo = styled(SiHeroku)`
  color: purple;
`
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`
export const FlexRow = styled.div`
  display: flex;
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
export const DisabledButton = styled.button`
  border: 0;
  outline: 0;
  background-color: ${({ bgColor }) => `${bgColor}`};
  color: ${({ color }) => `${color}`};
  padding: 0.35rem 2rem;
  font-family: 'Open-sans';
  font-size: 13px;
  cursor: not-allowed;
`