import React from 'react';
import styled from 'styled-components';
import {GiSpotedFlower } from 'react-icons/gi'
import {NavLink} from 'react-router-dom'

const Logicon = styled.div`
  display: none;
  @media (max-width: 768px){
  display: flex;  
  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  top: 10px;
  right: 60px;
  }
`;


const Menutitle = styled.div`
  display: none;
  @media (max-width: 768px){
  display: flex;
  width: 1.5rem;
  height: 1rem;
  position: fixed;
  top: 35px;
  right: 60px;
  text-align: center;
  font-size: 0.5rem;
  font-family: 'Nanum Gothic', sans-serif;
  }

`;

const Loginicon = () => {
  const activeStyle = {
    color: '#000000'
  };
  const noneactiveStyle = {
    color: '#000000'
  }

    return (
        <>
            <Logicon>
                <NavLink activeStyle={activeStyle} style = {noneactiveStyle} to= "/login">
                  <GiSpotedFlower size = "1.5em" />
                </NavLink>
            </Logicon>
            <Menutitle>
            로그인
            </Menutitle>

        </>
    )
}

export default Loginicon