import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import { BsFilePost} from "react-icons/bs";
import { FaReddit } from "react-icons/fa";

export const Container = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  background-color: #DAE0E6;
`
export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #DAE0E6;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
`
export const PostsContainer = styled.div`
  min-width: 600px;
`
export const PostsHeader = styled.div`
  margin-top: .5rem;
  cursor: pointer;
  padding: .25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 4px;
  &:hover { 
    border: 1px solid black;
  }
`
export const PostIcon = styled(BsFilePost)`
  font-size: 24px;
  &:hover {
    color: red;
  }
`
export const RedditLogo = styled(FaReddit)`
  font-size: 24px;
  &:hover {
    color: red;
  }
`
export const Paragraph = styled.p`
  font-size: 20px;
`