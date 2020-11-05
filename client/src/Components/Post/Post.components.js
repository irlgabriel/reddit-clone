import styled from "styled-components";
import { 
  GoArrowDown, 
  GoArrowUp
} from "react-icons/go";

export const PostContainer = styled.div`
  background-color: white;
  width: 600px;
  min-height: 30vh;
`
export const DotsWrapper = styled.div`
  background-color: whitesmoke;
  display: inline-block;
  min-width: 40px;
  height: 100%;

`
export const DotsContainer = styled.div`
  height: 80px;
  width: 100%;
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