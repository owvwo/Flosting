import React, {useState} from "react";
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
import Register_page from './Page/Register/Register'
import Terms_page from './Page/Register/Terms'

const Transition = () => {

    const [auth_regis, set_auth_regis] = useState(false);

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
              <Register_page set_auth_regis={set_auth_regis} {...props} />
            )}/>
            <Route path="/register/terms" render={props => (
              <Terms_page auth_regis = {auth_regis} />
            )}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  };
  
  export default Transition;