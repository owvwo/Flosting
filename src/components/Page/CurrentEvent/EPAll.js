import { React, useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./../../../images/001.png";
import Footer from "../Footer";
import Fade from "react-reveal/Fade";
import { Link, Redirect } from "react-router-dom";
import Notice from "./Notice";
import Period from "./Period";
import fire from "../Register/LoginFire";
import {
  createMuiTheme,
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

const Boldtheme = createMuiTheme({
  palette: {
    primary: {
      main: "#E0BCC1",
    },
  },
  typography: {
    fontSize: 10,
    fontWeightRegular: 700,
    fontFamily: "Noto Sans KR",
  },
});
const SubmitButton = styled.button`
  color: rgb(0,0,0,0.9);
  background-color: rgb(0,0,0,0.05);
  border: 2px solid rgb(0,0,0,0.9);
  border-radius: 10px;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.4rem;
  &:hover{
    background-color: rgb(0,0,0,0.9);
    color: white;
`
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
    text-align: center;
    width: 15rem;
    margin-bottom: -2rem;
  }
  .submitBtn {
    width: 23rem;
    height: 3rem;
    background-color: ;
  }
`;

const ButtonContainer = styled.div``;

function EP1(props) {
  const { EP_School_Name, EP_Num, EP_Start_Day, EP_End_Day, EP_Result_Day } =
    props;
  const user = props.User;
  const period = EP_Start_Day + "~" + EP_End_Day;
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [checkUserUniv, setCheckUserUniv] = useState("");
  const [open, setOpen] = useState(false);
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
  if (!JSON.parse(localStorage.getItem("user"))) {
    return <Redirect to="/login" />;
  } else if (!EP_End_Day) {
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
          {index === -1 ? (
            <ThemeProvider theme={Boldtheme}>
              <ButtonContainer>
<<<<<<< HEAD
                <SubmitButton className="submitBtn" onClick={handleOpen}>
=======
                <button className="submitBtn" onClick={handleOpen}>
>>>>>>> d297d1f96bfadde0ea876a169b60189a98b4c75a
                  신청하기
                </SubmitButton>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"학교 오류"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      해당 이벤트 참여 대상자가 아닙니다.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      창 닫기
                    </Button>
                  </DialogActions>
                </Dialog>
              </ButtonContainer>
            </ThemeProvider>
          ) : (
            <ButtonContainer>
              <Link to="/submit">
<<<<<<< HEAD
                <SubmitButton className="submitBtn">신청하기</SubmitButton>
=======
                <button className="submitBtn">신청하기</button>
>>>>>>> d297d1f96bfadde0ea876a169b60189a98b4c75a
              </Link>
            </ButtonContainer>
          )}

          <Fade bottom>
            <Period EP_Result_Day = {EP_Result_Day} period={period}></Period>
            <Notice />
          </Fade>
        </Container>
        <Footer></Footer>
      </div>
    );
  }
}
export default EP1;
