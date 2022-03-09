import styled from "styled-components";

export const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  right: 20px;
  vertical-align: middle;
  z-index: 40;
  display: none;
  color: rgb(230,5,137);

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    color: white;    
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "rgb(230,5,137)" : "rgb(230,5,137)")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    position: relative;    

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};      
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};      
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};      
    }
  }
`;

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  vertical-align: middle;
  z-index: 20;
  justify-content: space-around;
  svg{
    width:fit-content;    
  }  
  button {
    margin-top:.9em;        
    text-decoration: none;
    font-size: 1.2em;
    border-style: none;
    padding: 0.5em 1.5em;
    border-radius: 1em;
    background-color:rgb(230,5,137);
    width: fit-content;    
    &:hover {
      background-color: rgb(230,5,137);
      cursor: pointer;
      transition: all 200ms ease;
      transform: scale(1.05);
    }
    a{
      color:black;
      text-decoration:none;
    }
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: rgb(0,0,0);
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 1rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

export const Nav = styled.nav`
  width: 100%;
  background-color: black;
  padding: 0.1em 1em 0.1em 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 5em;
  }
`;
