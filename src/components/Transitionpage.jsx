import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch, useLocation } from "react-router-dom";
import "./Transitionpage.css";
import Home_page from './Page/Home'
import Login_page from './Page/Login/Login'
import Submit_page from './Page/Submit/Submit'
import EditSubmit_page from './Page/Submit/components/EditSubmit'
import Confirm_page from './Page/Confirm'
import Account_page from './Page/Account'
import About_page from './Page/About'
import AD_page from './Page/Ad'
import History_page from './Page/History'
import Register_page from './Page/Register/Register'
import Terms_page from './Page/Register/Terms'
import LastRegister_page from './Page/Register/LastRegister'
import My_page from './Page/Mypage/Mypage'
import fire from './Page/Register/LoginFire'
import ShowingResult from './Page/Matched/ShowingResult'
import CurrentEvent from "./Page/CurrentEvent";
import 건대 from "./Page/건대.js"
import Alarm from "./Page/Alarm";


const Transition = (props) => {

  const [auth_regis, set_auth_regis] = useState(false);
  const [S_num, set_S_num] = useState("");
  const [S_name, set_S_name] = useState("");

  const user = props.User;
  const location = useLocation();

  return (
    <TransitionGroup className="transition-group">
      <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
        <Switch location={location}>
          <Route exact path="/" component={Home_page} />
          <Route exact path="/currentevent" component={CurrentEvent} />
          <Route exact path="/currentevent/alarm" component={Alarm} />
          <Route exact path="/currentevent/event1" component={건대} />
          <Route exact path="/currentevent/event2" component={건대} />
          <Route exact path="/currentevent/event3" component={건대} />
          <Route exact path="/currentevent/event4" component={건대} />
          <Route path="/login" component={Login_page} />
          <Route path="/submit"><Submit_page User = {user}/></Route>
          <Route path="/editsubmit"><EditSubmit_page User = {user}/></Route>
          <Route path="/confirm" component={Confirm_page} />
          <Route path="/account" component={Account_page} />
          <Route path="/about" component={About_page} />
          <Route path="/history" component={History_page} />
          <Route path="/ad" component={AD_page} />
          <Route path="/showingresult"><ShowingResult User = {user}/></Route>
          <Route path="/my"><My_page User = {user} /></Route>
          <Route exact path="/register" render={props => (
            <Register_page
              S_num = {S_num}
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
              {...props} />
          )} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Transition;