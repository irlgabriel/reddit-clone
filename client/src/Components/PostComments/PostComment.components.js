import styled from "styled-components";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

export const CommentWrapper = styled.div`
`
export const DotsGroup = styled.div`
  display: inline-block;
`
export const CommentContainer = styled.div`

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
`
export const Downvote = styled(GoArrowDown)`
`