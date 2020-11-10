import styled from "styled-components";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

export const CommentWrapper = styled.div`

`
export const DotsGroup = styled.div`
  display: inline-flex;
  flex-direction: column;
`
export const CommentContainer = styled.div`

`
export const CommentContent = styled.div`
  display: inline-block;
  padding: 0;
`
export const Username = styled.span`
  font-size: 11px;
  font-weight: 100;
  color: black;
`
export const Upvotes = styled.span`
  font-size: 10px;
  color: darkgray;
`
export const TimeAgo = styled.span`
  font-size: 10px;
  color: darkgray;
`
export const CommentBody = styled.div`
`

export const Upvote = styled(GoArrowUp)`
  font-size: 24px;
`
export const Downvote = styled(GoArrowDown)`
  font-size: 24px;
`
export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
`