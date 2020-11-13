import styled from "styled-components";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { RiMessageFill, RiPencilFill } from "react-icons/ri";

export const CommentWrapper = styled.div``;
export const DotsGroup = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;
export const CommentContainer = styled.div`
  display: flex;
  padding: 0.25rem 0.5rem;
  width: 100%;
`;
export const CommentContent = styled.div`
  display: block;
  width: 100%;
  padding: 0;
  margin-bottom: auto;
`;
export const Username = styled.span`
  font-size: 12px;
  font-weight: 100;
  color: black;
`;
export const Upvotes = styled.span`
  font-size: 11px;
  color: ${({downvoted, upvoted}) => (downvoted === "yes" ? "blue" : upvoted === "yes" ? "red" : "darkgray")};
`;
export const TimeAgo = styled.span`
  font-size: 11px;
  color: darkgray;
`;
export const Upvote = styled(GoArrowUp)`
  font-size: 24px;
  color: ${({upvoted}) => (upvoted === "yes" ? "red" : "darkgray")};
  &:hover {
    cursor: pointer;
  }
`;
export const Downvote = styled(GoArrowDown)`
  font-size: 24px;
  color: ${({downvoted}) => (downvoted === "yes" ? "blue" : "darkgray")};
  &:hover {
    cursor: pointer;
  }
`;
export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
`;
export const CommentBody = styled.div`
  width: 100%;
`;

export const CommentFooter = styled.div`
  display: flex;
`;
export const Content = styled.p`
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 13px;
`;
export const P = styled.p`
  font-size: ${({ size }) => size + "px"};
  font-weight: ${({ bold }) => (bold ? "bold" : "")};
  color: ${({ color }) => color};
  user-select: none;
  cursor: pointer;
`;
export const CommentIcon = styled(RiMessageFill)`
  color: darkgray;
`;
export const EditIcon = styled(RiPencilFill)`
  color: black;
`
export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 2px;
  padding-left: 0;
  &:hover {
    background: lightgray;
  }
`;
export const TextArea = styled.textarea`
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 13px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  resize: vertical;
`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-radius: 5px;
`
export const EditContainer = styled.div`
  padding: 0.5rem;
  padding-top: 0;
  width: 100%;
`
export const Button = styled.a`
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  outline: none;
  border: 1px solid royalblue;
  padding: 0.25rem 2rem;
  font-weight: bold;
  font-size: 12px;
  margin-right: .5rem;  
  background-color: ${({ bgColor }) => `${bgColor}`};
  color: ${({ color }) => `${color}`};
  margin-left: ${({toRight}) => (toRight === "yes" ? "auto" : "0")};
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