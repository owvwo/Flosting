import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch, useLocation } from "react-router-dom";
import "./Transitionpage.css";
import Home_page from './Page/Home'
import Login_page from './Page/Login'
import Submit_page from './Page/Submit'
import Confirm_page from './Page/Confirm'
import Account_page from './Page/Account'
import About_page from './Page/About'
import AD_page from './Page/Ad'
import History_page from './Page/History'
import styled from "styled-components";

const Container = styled.div`

`;
const Transition = () => {

  
    const location = useLocation();
  
    return (
      <Container>
      <TransitionGroup className="transition-group">
        <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
          <Switch location={location}>
            <Route exact path="/" component={Home_page} />
            <Route path="/login" component={Login_page} />
            <Route path="/submit" component={Submit_page} />
            <Route path="/confirm" component={Confirm_page} />
            <Route path="/account" component={Account_page} />
            <Route path="/about" component={About_page} />
            <Route path="/history" component={History_page} />
            <Route path="/ad" component={AD_page} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      </Container>
    );
  };
  
  export default Transition;