import styled from "styled-components";
import { FaReddit, FaSearch } from "react-icons/fa";


export const Nav = styled.div`
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: .5rem 1.25rem;
`
export const RedditLogo = styled(FaReddit)`
  margin-right: 1.25rem;
  
`
export const SearchBarContainer = styled.div`
  position: relative;
  flex: 1;
  margin: 0 auto;
  max-width: 656px;

`
export const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 8px;
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
  border: 1px solid lightgray;
  width: 100%;
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
export const Button = styled.a`
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  outline: none;
  border: 1px solid royalblue;
  padding: .55rem 2rem;
  font-weight: bold;
  font-size: 12px;
  background-color: ${({bgColor}) => (`${bgColor}`)};
  color: ${({color}) => (`${color}`)};
  &:hover {
    text-decoration: none;
  }
  &:first-child {
    margin: 0 .25rem;
  }
`
export const UserSection = styled.p`
  color: gray;
  padding: 0 .5rem;
  &:hover {
    cursor: pointer;
  }
`
export const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  
`