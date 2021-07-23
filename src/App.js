import './App.css';
import React, {Component, useState, useEffect} from 'react';
import {
  isBrowser,
  isMobile,
  BrowserView,
  MobileView,
} from "react-device-detect"; //모바일 및 브라우저 따로 위함.
import styled from 'styled-components';
import Navbar from './components/Nav/Navbar';
import Transition from './components/Transitionpage';
import ScrollToTop from './components/ScrollToTop';
import fire from './components/Page/Register/LoginFire'
import { render } from '@testing-library/react';
import { red } from '@material-ui/core/colors';

const TransferMobile = styled.div`
  .inner{
    width:25rem;
    margin: 0 auto;
  }
`

function App(){

  const [User, setUser] = useState('');
  
  useEffect(() => {
    authListener();
  }, []);


  const authListener = () => {
    fire.auth().onAuthStateChanged(user=>{
      if (user) {
          // store the user on local storage
          localStorage.setItem('user', true);
          setUser(user);
      } else {
          // removes the user from local storage on logOut
          setUser("");
          localStorage.removeItem('user');
      }
  })
  };

    
    return(
      <div>
        <ScrollToTop></ScrollToTop>
        <BrowserView>
          <TransferMobile>
            <div className='inner'>
              <div>데스크탑에서 보여지는 화면입니다</div>
              <Navbar User = {User}/>
              <Transition User = {User}/>
            </div>
          </TransferMobile>
        </BrowserView>
        <MobileView>
          <Navbar User = {User}/>
          <Transition User = {User}/>
        </MobileView>
      </div>
    );

}

export default App;
