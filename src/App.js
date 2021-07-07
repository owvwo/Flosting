import './App.css';
import React, {Component} from 'react';
import {
  BrowserView,
  MobileView,
} from "react-device-detect"; //모바일 및 브라우저 따로 위함.
import Navbar from './components/Nav/Navbar';
import Transition from './components/Transitionpage';
import ScrollToTop from './components/ScrollToTop';


class App extends Component {
  render(){

    return(
      <div>
        <ScrollToTop></ScrollToTop>
        <BrowserView>
          <p>컴퓨터 뷰</p>
          <p>박정부</p>
        </BrowserView>
        <MobileView>
          <Navbar />
          <Transition />
        </MobileView>
      </div>
    );
  }

}

export default App;
