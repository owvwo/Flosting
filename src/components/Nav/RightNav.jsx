import React from 'react';
import styled, { withTheme } from 'styled-components';
import{NavLink} from 'react-router-dom';

const Ul = styled.ul`
  z-index: 10;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background: linear-gradient(to top, #D9C6A0, #D9B7A0);
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    opacity: ${({ open }) => open ? '0.8' : '0.5'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #0F0807;
      text-align: right;
    }
    li:after{
        content: "";
        display: block;
        width: 200px;
        border-bottom: 1px solid #AB9B87;
        margin-top: 5px;
        margin-left: auto;
    }
  }
`;



const RightNav = ({ open }) => {

    const activeStyle ={
        color: '#7A7671'
    };
    const noneactiveStyle={
        textDecoration: 'none',
        color: '#2B2A28'
    }

  return (
    <Ul open={open}>
      <li>
          <NavLink exact = {true} activeStyle={activeStyle} style = {noneactiveStyle} to= "/">홈</NavLink>
      </li>
      <li>
          <NavLink activeStyle={activeStyle} style = {noneactiveStyle} to= "/submit">플로스팅 신청</NavLink>
      </li>
      <li>
          <NavLink activeStyle={activeStyle} style = {noneactiveStyle} to= "/confirm">플로스팅 확인</NavLink>
      </li>
      <li>
          <NavLink activeStyle={activeStyle} style = {noneactiveStyle} to= "/account">결제 안내</NavLink>
      </li>
      <li>
          <NavLink activeStyle={activeStyle} style = {noneactiveStyle} to= "/history">플로스팅 역사</NavLink>
      </li>
      <li>
          <NavLink activeStyle={activeStyle} style = {noneactiveStyle} to= "/about">제작 기획</NavLink>
      </li>
      <li>
          <NavLink activeStyle={activeStyle} style = {noneactiveStyle} to= "/ad">광고 문의</NavLink>
      </li>
    </Ul>
  )
}

export default RightNav