import React from 'react';
import styled from 'styled-components';
import {GiSpotedFlower } from 'react-icons/gi'

const Logicon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  top: 10px;
  right: 60px;
`;


const Menutitle = styled.div`
  width: 1.5rem;
  height: 1rem;
  position: fixed;
  top: 35px;
  right: 60px;
  text-align: center;
  font-size: 8px;
  font-family: 'Nanum Gothic', sans-serif;

`;

const Loginicon = () => {
  
    return (
        <>
            <Logicon>
                <GiSpotedFlower size = "1.5em" />
            </Logicon>
            <Menutitle>
            로그인
            </Menutitle>

        </>
    )
}

export default Loginicon