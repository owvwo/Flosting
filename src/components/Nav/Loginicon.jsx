import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GiSpotedFlower } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
import fire from '../Page/Register/LoginFire'

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
  const [user, setUser] = useState('');

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  }

  useEffect(() => {
    authListener();
  }, []);

  const activeStyle = {
    color: '#000000'
  };
  const noneactiveStyle = {
    color: '#000000'
  }

  if (user) {
    return (
      <div onClick = {handleLogout}>
        <Logicon>
            <GiSpotedFlower size="1.5em" />
        </Logicon>
        <Menutitle>
          로그아웃
        </Menutitle>

      </div>
    );
  } else {
    return (
      <>
        <Logicon>
          <NavLink activeStyle={activeStyle} style={noneactiveStyle} to="/login">
            <GiSpotedFlower size="1.5em" />
          </NavLink>
        </Logicon>
        <Menutitle>
          로그인
        </Menutitle>

      </>
    );
  }
}

export default Loginicon