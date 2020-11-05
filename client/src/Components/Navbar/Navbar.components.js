import styled from "styled-components";
import { FaReddit, FaSearch } from "react-icons/fa";


export const Nav = styled.div`
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  position: relative;
  padding: .5rem 1.25rem;
`
export const RedditLogo = styled(FaReddit)`
  margin-right: 1.25rem;
`
export const SearchBarContainer = styled.div`
  position: relative;
  flex: 1;
`
export const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: 20px;
  color: gray;
`
export const SearchBar = styled.input`
  border-radius: 5px;
  background-color: #f9f9f9;
  border: none;
  outline: none;
  padding: .5rem .75rem;
  padding-left: 50px;
  font-size: 16px;
  box-sizing: content-box;
  border: 1px solid lightgray;

  &:hover {
    border: 1px solid royalblue;
  }
  &:focus {
    border: 1px solid royalblue;
  }
`
export const ButtonGroup = styled.div`
  display: flex;
  button {
    &:first-child {
      margin: 0 5px;
    }
  }  
`
export const Button = styled.button`
  border-radius: 4px;
  outline: none;
  border: 1px solid royalblue;
  padding: .5rem .75rem;
  font-weight: bold;
  background-color: ${({bgColor}) => (`${bgColor}`)};
  color: ${({color}) => (`${color}`)};
`