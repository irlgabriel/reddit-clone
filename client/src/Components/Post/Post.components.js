import styled from "styled-components";
import { 
  GoArrowDown, 
  GoArrowUp
} from "react-icons/go";
import { BsDot } from "react-icons/bs";

export const PostContainer = styled.div`
  background-color: white;
  width: 600px;
  min-height: 30vh;
  position: relative;
  border: 1px solid lightgray;
  border-radius: 4px;
  &:hover {
    border: 1px solid black;
  }
`
export const DotsWrapper = styled.div`
  background-color: whitesmoke;
  display: inline-block;
  min-width: 40px;
  position: absolute;
  top: 0;
  bottom: 0;

`
export const DotsContainer = styled.div`
  height: 80px;
  width: 100%;
  padding: .5rem 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`
export const DotsCount = styled.p`
  font-weight: bold;
`
export const UpDot = styled(GoArrowUp)`
  color: gray;
  font-size: 24px;
`
export const DownDot = styled(GoArrowDown)`
  color: gray;
  font-size: 24px;
`
export const Topbar = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  padding: .25rem;
`
export const SubredditName = styled.p`
  font-size: 14px;
  font-weight: bold;

`
export const Creator = styled.p`
  font-size: 14px;
  &:before {
    content: "posted by";
  }
`

export const MiddleDot = styled(BsDot)`

`