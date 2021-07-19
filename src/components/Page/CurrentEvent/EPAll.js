import { React, useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./../../../images/플로스팅 로고.png";
import Footer from "../Footer";
import Fade from "react-reveal/Fade";
import { Link, Redirect } from "react-router-dom";
import Notice from "./Notice";
import Period from "./Period";
import fire from "../Register/LoginFire";

const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  .title {
    margin-top: 15px;
    font-size: 2rem;
    font-weight: bolder;
  }
  .subtitle {
    font-weight: bold;
    margin-top: 10px;
  }
  img {
    width: 15rem;
  }
  .submitBtn {
    width: 80%;
    height: 3rem;
    background-color: ;
  }
`;

function EP1(props) {

  const {
    EP_School_Name,
    EP_Num,
    EP_Start_Day,
    EP_End_Day,
    EP_Result_Day
  } = props;
  const user = props.User;
  const period = EP_Start_Day +  "~" + EP_End_Day;
  const ep = EP_Num;
  const eventUniv = EP_School_Name;
  const dbUser = [
    {
      Age: "",
      Gender: "",
      Manner: "",
      Nick: "",
      Phone: "",
      Univ: "",
    },
  ];
  const [User, setUser] = useState(dbUser);
  const db = fire.firestore();
  useEffect(() => {
    if (user) {
      const s_id = user.email.split("@");
      db.collection("회원정보")
        .where("ID", "==", s_id[0])
        .get()
        .then((querySnapshot) => {
          if (querySnapshot) {
            querySnapshot.forEach((doc) => {
              setUser(doc.data().User);
            });
          } else {
            console.log("데이터없어");
          }
        });
    }
  }, [user]);

  let index = eventUniv.indexOf(User.Univ);
  const EP = "EP1";
  if (!JSON.parse(localStorage.getItem("user"))) {
    return <Redirect to="/login" />;
  }else if(!EP_End_Day){
    return <Redirect to="/currentevent" />;
  } else {
    return (
      <div>
        <Container>
          <div className="title">플로스팅 일정안내</div>
          <div className="subtitle">{ep}회차</div>
          <div className="subtitle">
            {eventUniv[0]} & {eventUniv[1]}
          </div>
          <img src={Logo} />
          <Link to={index === -1 ? "/currentevent" : "/submit"}>
            <button className="submitBtn">신청하기</button>
          </Link>
          <Fade bottom>
            <Period period={period}></Period>
            <Notice />
          </Fade>
        </Container>
        <Footer></Footer>
      </div>
    );
  }
}
export default EP1;
