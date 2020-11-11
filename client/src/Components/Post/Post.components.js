import styled from "styled-components";
import { Link } from "react-router-dom";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { BsDot } from "react-icons/bs";
import { RiMessageFill, RiShareForwardFill } from "react-icons/ri";
import { FaSave, FaTrash } from "react-icons/fa";


export const PostWrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  margin: 0.5rem 0;

`
export const PostContainer = styled.div`
  background-color: white;
  width: 600px;
  min-height: 150px;
  position: relative;
  display: flex;
  border: 1px solid lightgray;
  border-radius: 4px;
  &:hover {
    border: 1px solid black;
  }
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;
export const DotsWrapper = styled.div`
  background-color: whitesmoke;
  min-width: 40px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;
export const DotsContainer = styled.div`
  height: 80px;
  width: 100%;  
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const DotsCount = styled.p`
  font-weight: bold;
  color: ${({ upvoted, downvoted }) =>
    upvoted === "yes" ? "red" : downvoted === "yes" ? "blue" : "gray"};
`;
export const UpDot = styled(GoArrowUp)`
  color: ${({ upvoted }) => (upvoted === "yes" ? "red" : "gray")};
  font-size: 24px;
  cursor: pointer;
`;
export const DownDot = styled(GoArrowDown)`
  color: ${({ downvoted }) => (downvoted === "yes" ? "blue" : "gray")};
  font-size: 24px;
  cursor: pointer;
`;
export const PostContentWrapper = styled.div`
 
`;
export const PostContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: .5rem;
  padding-bottom: 0;
`
export const PostHeader = styled.div`
  display: flex;
  align-items: center;
`;
export const SubredditName = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 14px;
  font-weight: bold;

`;
export const Creator = styled(Link)`
  font-family: "Open Sans", sans-serif;
  text-decoration: none;
  font-weight: 300;
  font-size: 12px;
  color: ${({ me }) => (me ? "lightsalmon" : "gray")};
  &:before {
    content: "posted by";
    color: gray;
  }
`;
export const MiddleDot = styled(BsDot)``;
export const CreatedAt = styled.p``;

export const PostBody = styled.div`
  flex: 1;
`;
export const PostTitle = styled.p`
  font-size: 24px;
`;
export const PostContent = styled.p`
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 14px;
`;
export const PostFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 4px 0;
`;
export const FooterLink = styled.div`
  padding: 0.25rem;
  color: darkgray;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: lightgray;
    text-decoration: none;
  }
`;
export const CommentIcon = styled(RiMessageFill)`
`;
export const ShareIcon = styled(RiShareForwardFill)`
`;
export const SaveIcon = styled(FaSave)`
`;
export const DeleteIcon = styled(FaTrash)`
  color: red;
`;

export const CommentsWrapper = styled.div`
  width: 100%;
  min-height: 50px;
  padding: .5rem 0;
  padding-top: 0;
`
export const NotLoggedIn = styled.div`
  width: 90%;
  margin: 0 auto;
  border: 1px solid lightgray;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .5rem;

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
  margin-right: .25rem;
  background-color: ${({ bgColor }) => `${bgColor}`};
  color: ${({ color }) => `${color}`};
  &:hover {
    text-decoration: none;
  }
  &:first-child {
    margin: 0 0.25rem;
  }
`;

export const Bold = styled.b`
  color: ${({color}) => (color)}
`

export const P = styled.p`
  font-size: ${({size}) => (size)};
  color: ${({color}) => (color)};
`

export const ButtonGroup = styled.div`
`

export const SortBy = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: .25rem 0;
  border-bottom: 1px solid lightgray;
`
export const SortByDropdown = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    background: lightskyblue;
  }
`
export const OptionContainer = styled.div`
  background: white;
  &:hover {
    background: lightskyblue;
  }
`