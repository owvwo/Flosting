import React, { useState } from 'react';
import styled from 'styled-components';
import RightNav from './RightNav';

const Styledicon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 20;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 1.5rem;
    height: 0.1rem;
    background-color: ${({ open }) => open ? '#241C16' : '#333'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.5s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Menutitle = styled.div`
display: none;
@media (max-width: 768px){
  display : flex;
  width: 1.5rem;
  height: 1rem;
  position: fixed;
  top: 35px;
  right: 20px;
  text-align: center;
  justify-content : center;
  font-size: 0.5rem;
  font-family: 'Nanum Gothic', sans-serif;
}

`;
const Navicon = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Styledicon open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </Styledicon>
      <Menutitle>
        메뉴
      </Menutitle>
      <RightNav open={open} setOpen = {setOpen}/>
    </>
  )
}

export default Navicon