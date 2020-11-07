import styled from "styled-components";

export const SidebarContainer = styled.div`
  margin-top: .5rem;
  width: 300px;
  margin-left: 1rem;
  max-height: 500px;
  border-radius: 4px;
  border: 1px solid lightgray;
  background-color: white;
  &:hover {
    border: 1px solid black;
  }
  @media screen and (max-width: 960px) {
    display: none;
  }
`
