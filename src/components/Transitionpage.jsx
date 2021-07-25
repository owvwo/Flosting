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
import My_page from './Page/Mypage/Mypage'
import ShowingResult from './Page/Matched/ShowingResult'
import CurrentEvent from "./Page/CurrentEvent/CurrentEvent";
import 건대 from "./Page/건대.js"
import SelectResult from '../components/Page/Matched/SelectResult.js';
import LilacResult from '../components/Page/Matched/LilacResult.js';
import CloverResult from '../components/Page/Matched/CloverResult.js';
import DasiyResult from '../components/Page/Matched/DasiyResult.js';
import EPall from './Page/CurrentEvent/EPAll';
import Alarm from "./Page/Alarm";
import Admin_page from "./Page/Manager/Admin";
import EventMain from "./Page/subEvent/EventMain"
import NoticeDetail from "./Page/subEvent/NoticeDetail";
import EventDetail from "./Page/subEvent/EventDetail";

const Transition = (props) => {

  const [auth_regis, set_auth_regis] = useState(false);
  const [S_num, set_S_num] = useState("");
  const [S_name, set_S_name] = useState("");
  const [EP_School_Name, setEP_School_Name] = useState([]);
  const [EP_Num, setEP_Num] = useState('');
  const [EP_Start_Day, setEP_Start_Day] = useState('');
  const [EP_End_Day, setEP_End_Day] = useState('');
  const [EP_Result_Day, setEP_Result_Day] = useState('');

  const [S_Event, setS_Event] = useState("");

  const user = props.User;
  const location = useLocation();

  return (
    <TransitionGroup className="transition-group">
      <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
        <Switch location={location}>
          <Route exact path="/" component={Home_page} />
          <Route exact path="/currentevent"><CurrentEvent 
          User = {user}
          setEP_School_Name = {setEP_School_Name}
          setEP_Num = {setEP_Num}
          setEP_Start_Day = {setEP_Start_Day}
          setEP_End_Day = {setEP_End_Day}
          setEP_Result_Day = {setEP_Result_Day}
          /></Route>
          <Route exact path="/currentevent/EP"><EPall
          User = {user}
          EP_School_Name = {EP_School_Name}
          EP_Num = {EP_Num}
          EP_Start_Day = {EP_Start_Day}
          EP_End_Day = {EP_End_Day}
          EP_Result_Day = {EP_Result_Day}
          /></Route>
          <Route exact path="/currentevent/alarm" component={Alarm} />
          <Route path="/login" component={Login_page} />
          <Route path="/submit"><Submit_page EP_Num = {EP_Num} User = {user}/></Route>
          <Route path="/confirm" component={Confirm_page} />
          <Route exact path="/subevent" component={EventMain} />
          <Route exact path="/subevent/notice" component={NoticeDetail} />
          <Route exact path="/subevent/event" component={EventDetail}/>
          <Route path="/account" component={Account_page} />
          <Route path="/about" component={About_page} />
          <Route path="/history" component={History_page} />
          <Route exact path="/ad" component={AD_page} />
          <Route exact path="/admin" component={Admin_page} />
          <Route path="/selectresult"><SelectResult User = {user}/></Route>
          <Route path="/lilacresult"><LilacResult User = {user}/></Route>
          <Route path="/cloverresult"><CloverResult User = {user}/></Route>
          <Route path="/daisyresult"><DasiyResult User = {user}/></Route>
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