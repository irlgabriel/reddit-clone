import styled from "styled-components";
import { 
  GoArrowDown, 
  GoArrowUp
} from "react-icons/go";
import { BsDot } from "react-icons/bs";
import { RiMessageFill, RiShareForwardFill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";


export const PostContainer = styled.div`
  background-color: white;
  width: 600px;
  min-height: 150px;
  position: relative;
  border: 1px solid lightgray;
  border-radius: 4px;
  &:hover {
    border: 1px solid black;
  }
  @media screen and (max-width: 960px) {
    width: 95vw;
  }
`
export const DotsWrapper = styled.div`
  background-color: whitesmoke;
  display: inline-block;
  min-width: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
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
  color: ${({liked}) => (liked === 'yes' ? "red" : liked === "no" ? "blue" : "gray")};
`
export const UpDot = styled(GoArrowUp)`
  color: ${({liked}) => (liked === 'yes' ? "red" : "gray")};
  font-size: 24px;
  cursor: pointer;
`
export const DownDot = styled(GoArrowDown)`
  color: ${({liked}) => (liked === 'no' ? "blue" : "gray")};
  font-size: 24px;
  cursor: pointer;
`
export const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //height: 100%; // No idea why this does not work so I will use absolute position instead
  position: absolute;
  left: 40px;
  bottom: 0;
  top: 0;
  right: 0;
  padding: .5rem;

`
export const PostHeader = styled.div`
  display: flex;
  align-items: center;
`
export const SubredditName = styled.p`
  font-size: 14px;
  font-weight: bold;

`
export const Creator = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  font-size: 12px;
  color: gray;
`
export const MiddleDot = styled(BsDot)`

`
export const CreatedAt = styled.p`
  
`

export const PostBody = styled.div`
  flex: 1;
`
export const PostTitle = styled.p`
  font-size: 24px;
`
export const PostContent = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  font-size: 14px;
`
export const PostFooter = styled.div`
  display: flex;
  margin-top: auto;
`
export const FooterLink = styled.a`
  padding: .25rem;
  color: darkgray;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    background: lightgray;
    text-decoration: none;
  }
  
`
export const CommentIcon = styled(RiMessageFill)`

`
export const ShareIcon = styled(RiShareForwardFill)`

`
export const SaveIcon = styled(FaSave)`

`