import styled from "styled-components";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { RiMessageFill } from "react-icons/ri";

export const CommentWrapper = styled.div`

`
export const DotsGroup = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 0 .5rem;
`
export const CommentContainer = styled.div`
  display: flex;
  padding: .25rem .5rem;
`
export const CommentContent = styled.div`
  display: inline-block;
  padding: 0;
  margin-bottom: auto;
`
export const Username = styled.span`
  font-size: 12px;
  font-weight: 100;
  color: black;
`
export const Upvotes = styled.span`
  font-size: 11px;
  color: darkgray;
`
export const TimeAgo = styled.span`
  font-size: 11px;
  color: darkgray;
`
export const Upvote = styled(GoArrowUp)`
  font-size: 24px;
  color: darkgray;
  &:hover {
    cursor: pointer;
  }
`
export const Downvote = styled(GoArrowDown)`
  font-size: 24px;
  color: darkgray;
  &:hover {
    cursor: pointer;
  }
`
export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
`
export const CommentBody = styled.div`
`

export const CommentFooter = styled.div`
  display: flex;
`
export const Content = styled.p`
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 13px;
`
export const P = styled.p`
  font-size: ${({size}) => (size + "px")};
  font-weight: ${({bold}) => (bold ? "bold" : "")};
  color: ${({color}) => (color)};
  user-select: none;
  cursor: pointer;
`
export const CommentIcon = styled(RiMessageFill)`
  color: darkgray;
`
export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 2px;
  padding-left: 0;
  &:hover {
    background: lightgray;
  }
`