import styled from "styled-components";
import { 
  GoArrowDown, 
  GoArrowUp
} from "react-icons/go";
import { BsDot } from "react-icons/bs";
import { RiMessageFill, RiShareForwardFill } from "react-icons/ri";
import { FaSave, FaTrash } from "react-icons/fa";


export const PostContainer = styled.div`
  margin: .5rem 0;
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
    width: 95vw;
  }
`
export const DotsWrapper = styled.div`
  background-color: whitesmoke;
  min-width: 40px;
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
  flex: 1;
  display: flex;
  flex-direction: column;
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
  color: ${({me}) => (me ? "lightsalmon" : "gray")};
  &:before {
    content: "posted by";
    color: gray;
  }
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
export const DeleteIcon = styled(FaTrash)`
  color: red;
`