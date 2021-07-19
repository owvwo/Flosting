import './App.css';
import React, {Component, useState, useEffect} from 'react';
import {
  BrowserView,
  MobileView,
} from "react-device-detect"; //모바일 및 브라우저 따로 위함.
import Navbar from './components/Nav/Navbar';
import Transition from './components/Transitionpage';
import ScrollToTop from './components/ScrollToTop';
import fire from './components/Page/Register/LoginFire'


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
          <p>컴퓨터 뷰</p>
          <p>박정부</p>
        </BrowserView>
        <MobileView>
          <Navbar User = {User}/>
          <Transition User = {User}/>
        </MobileView>
      </div>
    );

}

export default App;
