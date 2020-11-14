import styled from "styled-components";
import { Link } from "react-router-dom";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { BsDot } from "react-icons/bs";
import { RiMessageFill, RiShareForwardFill, RiPencilFill } from "react-icons/ri";
import { FaSave, FaTrash } from "react-icons/fa";

export const PostWrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  margin: 0.5rem 0;
`;
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
  width: 100%;
`;
export const PostContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem;
  padding-bottom: 0;
`;
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
  color: ${({ me }) => (me === "yes" ? "lightsalmon" : "gray")};
  &:before {
    content: "posted by";
    color: gray;
  }
`;
export const MiddleDot = styled(BsDot)``;
export const CreatedAt = styled.p``;

export const PostBody = styled.div`
  flex: 1;
  width: 100%;
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
  width: 100%;
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
export const CommentIcon = styled(RiMessageFill)``;
export const ShareIcon = styled(RiShareForwardFill)``;
export const SaveIcon = styled(FaSave)``;
export const DeleteIcon = styled(FaTrash)`
  color: red;
`;

export const CommentsWrapper = styled.div`
  width: 100%;
  min-height: 50px;
  padding: 0.5rem 0;
  padding-top: 0;
`;
export const NotLoggedIn = styled.div`
  width: 90%;
  margin: 0 auto;
  border: 1px solid lightgray;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
`;
export const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  border-radius: 4px;
  outline: none;
  border: 0;
  padding: 0.3rem 1.5rem;
  font-weight: bold;
  font-size: 12px;
  margin-left: ${({toRight}) => (toRight === "yes" ? "auto" : "0")};
  background-color: ${({ bgColor }) => `${bgColor}`};
  color: ${({ color }) => `${color}`};
  &:hover {
    text-decoration: none;
  }

`;

export const Bold = styled.b`
  color: ${({ color }) => color};
`;

export const P = styled.p`
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
`;

export const ButtonGroup = styled.div``;

export const SortBy = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: 0.25rem 0;
  border-bottom: 1px solid lightgray;
`;
export const SortByDropdown = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    background: lightskyblue;
  }
`;
export const OptionContainer = styled.div`
  background: white;
  &:hover {
    background: lightskyblue;
  }
`;
export const EditIcon = styled(RiPencilFill)`

`
export const EditPost = styled.div`
  flex: 1;
  width: 100%;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 14px;
`
export const EditTitleWrapper = styled.div`
  position: relative;
  padding-left: 75px;
  border: 1px solid darkgray;

  width: 100%;
`
export const TitleAbsolute = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #dae0e6;
  padding: 0 .25rem;
  width: 65px;
  font-weight: bold;
`
export const EditTitle = styled.input`
  width: 100%;
  background: white;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  font-size: 14px;
  border: 0;
`
export const EditContentWrapper = styled.div`
  position: relative;
  padding-left: 75px;
  width: 100%;
  border: 1px solid darkgray;
  border-top: 0;
`
export const ContentAbsolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #dae0e6;
  padding: 0 .25rem;
  width: 65px;
`
export const EditContent = styled.textarea`
  width: 100%;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 14px;
  border: 0;
`
export const SumbitEdit = styled(Button)`
  
`
export const EditFooter = styled.div`
  display: flex;
  padding: .25rem 0;
`