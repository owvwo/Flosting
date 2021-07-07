import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch, useLocation } from "react-router-dom";
import "./Transitionpage.css";
import Home_page from './Page/Home'
import Login_page from './Page/Login/Login'
import Submit_page from './Page/Submit/Submit'
import Confirm_page from './Page/Confirm'
import Account_page from './Page/Account'
import About_page from './Page/About'
import AD_page from './Page/Ad'
import History_page from './Page/History'
import Register_page from './Page/Register/Register'
import Terms_page from './Page/Register/Terms'
import LastRegister_page from './Page/Register/LastRegister'
import fire from './Page/Register/LoginFire'

const Transition = () => {

  const [auth_regis, set_auth_regis] = useState(false);
  const [S_num, set_S_num] = useState("");
  const [S_name, set_S_name] = useState("");
  const [user, setUser] = useState('');


  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
        if(user){
            setUser(user);
        }else{
            setUser("");
        }
    });
  };

  const location = useLocation();

  return (
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
          <Route exact path="/register" render={props => (
            <Register_page
              set_S_num={set_S_num}
              set_S_name={set_S_name}
              set_auth_regis={set_auth_regis}
              {...props} />
          )} />
          <Route path="/register/terms" render={props => (
            <Terms_page
              auth_regis={auth_regis}
              S_num={S_num}
              S_name={S_name}
              {...props} />
          )} />
          <Route path="/register/last" render={props => (
            <LastRegister_page
              auth_regis={auth_regis}
              S_num={S_num}
              S_name={S_name}
              user = {user}
              authListener = {authListener}
              {...props} />
          )} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Transition;