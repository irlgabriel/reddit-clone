import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaReddit, FaSearch } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io"

export const Nav = styled.div`
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
`;
export const RedditLogo = styled(FaReddit)`
  margin-right: 1.25rem;
`;
export const SearchBarContainer = styled.div`
  position: relative;
  flex: 1;
  margin: 0 auto;
  max-width: 656px;
`;
export const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 8px;
  left: 15px;
  font-size: 20px;
  color: gray;
  z-index: 4;
`;
export const SearchBar = styled.input`
  position: relative;
  border-radius: 5px;
  background-color: #f9f9f9;
  border: none;
  outline: none;
  padding: 0.5rem 0.75rem;
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
`;
export const ButtonGroup = styled.div`
  display: flex;
  button {
    &:first-child {
      margin: 0 5px;
    }
  }
`;
export const Button = styled.a`
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  outline: none;
  border: 1px solid royalblue;
  padding: 0.55rem 2rem;
  font-weight: bold;
  font-size: 12px;
  background-color: ${({ bgColor }) => `${bgColor}`};
  color: ${({ color }) => `${color}`};
  &:hover {
    text-decoration: none;
  }
  &:first-child {
    margin: 0 0.25rem;
  }
  &:hover {
    opacity: .75;
  }
`;
export const UserSection = styled(Link)`
  text-decoration: none;
  color: black;
  color: gray;
  padding: 0 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;
export const RouteLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SearchResults = styled.div`
  box-shadow: 0px 0px 13px 0px rgba(79, 79, 79, 1);
  border: 1px solid lightgray;
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
  max-height: 150px;
  overflow-y: scroll;
`;
export const Result = styled(Link)`
  text-decoration: none;
  color: black;
  width: 100%;
  padding: 0.5rem;
  background: white;
  &:hover {
    background: #f9f9f9;
  }
`;

export const PageFilter = styled.div`
  position: relative;
  border: 1px solid lightgray;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: .5rem;
  width: 100px;  
  margin: 0 .5rem;

  &:hover{
    border: 1px solid black;
  }
`
export const FilterOption = styled.p`

`
export const DropdownIcon = styled(IoIosArrowDropdownCircle)`
  font-size: 1.5rem;
  color: red;
`
export const DropdownContainer = styled.div`
  background-color: #dae0e6;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  top: 0;
  bottom: 0;
  right: 0;
  width: 30px;
  &:hover {
    cursor: pointer;
  }
`