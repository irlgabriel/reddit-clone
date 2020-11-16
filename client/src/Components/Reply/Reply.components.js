import styled from "styled-components";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { RiMessageFill, RiPencilFill } from "react-icons/ri";
import { Link } from "react-router-dom";
export const ReplyIcon = styled(RiMessageFill)`
  color: darkgray;
`

export const EditIcon = styled(RiPencilFill)`
  color: black;
`
export const ReplyWrapper = styled.div`
  padding-left: 3rem;
  width: 100%;
  display: flex;
  padding-right: .5rem;
`
export const ReplyContainer = styled.div`
  width: 100%;
`
export const ReplyHeader = styled.div`
  font-size: 12px;
  font-weight: 100;
`
export const ReplyBody = styled.div`
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 13px;
`
export const ReplyFooter = styled.div`
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 13px;
  width: 100%;
`
export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  padding: .25rem 2px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background: lightgray;
  }
`
export const UpvotesWrapper = styled.div`
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: auto;
`
export const UpVote = styled(GoArrowUp)`
  color: ${({ upvoted }) => (upvoted === "yes" ? "red" : "gray")};
  font-size: 24px;
  cursor: pointer;
`;
export const DownVote = styled(GoArrowDown)`
  color: ${({ downvoted }) => (downvoted === "yes" ? "blue" : "gray")};
  font-size: 24px;
  cursor: pointer;
`;
export const P = styled.span`
  font-size: ${({size}) => (size)};
  color: ${({me, color}) => ( me === "yes" ? "lightcoral" : color)};
`
export const Upvotes = styled.span`
  font-size: ${({size}) => (size)};
  color: ${({upvoted, downvoted}) => ( upvoted === "yes" ? "red" : downvoted === "yes" ? "blue" : "gray")};
`
export const EditReplyWrapper = styled.div`
  width: 100%;

`
export const EditReplyFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
export const EditReplyText = styled.textarea`
  resize: vertical;
  width: 100%;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 14px;
  padding: .25rem;
`
export const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  font-family: 'Times New Roman', Times, serif;
  text-decoration: none;
  border-radius: 4px;
  outline: none;
  border: 0;
  padding: 0.3rem 1.5rem;
  font-weight: bold;
  font-size: 12px;
  margin-left: auto;
  background-color: ${({ bgColor }) => `${bgColor}`};
  color: ${({ color }) => `${color}`};
  &:hover {
    text-decoration: none;
    opacity: .75;
  }

`;
export const Username = styled(Link)`
  font-size: 12px;
  text-decoration: none;
  color: ${({me}) => (me === "yes") ? "lightcoral" : "black"}
`
export const ReplyFooterNotLoggedIn = styled.div`
  display: flex;
  
  align-items: center;
`