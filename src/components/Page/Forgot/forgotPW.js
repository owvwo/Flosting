import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import fire from '../Register/LoginFire'


const Colortheme = createMuiTheme({
    palette: {
        primary: {
            main: '#E0BCC1'
        }
    },
    typography: {
        fontSize: 10,
        fontWeightRegular: 700,
        fontFamily: "Noto Sans KR"
    }

})

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    

    h1{
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;
const School_number = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 2rem;
`;
const School_name = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 2rem;
`;

const School_title = styled.div`
    font-size: 1.0rem;
    color: '#828282';
    margin: 0.5rem 0rem;
`;
const School_content = styled.div`
    margin: 5px 0 0 0;
    font-size: 0.5rem;
    list-style : none;
    li{
        font-size: 0.5rem;
    }
`;
const Input = styled.input`

  border : 1px solid #A6A6A6;
  color: black;
  font-family: 'Noto Sans KR', sans-serif;
  type : text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const PhoneButton = styled.button`

  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 1rem 0rem 1rem 0rem;
  border: none;
  border-radius: 5px;
  height: 3rem;
  width: 100%;
  background-color: #E0BCC1;
  color: #FFFFFF;
  opacity: ${props => {
        if (props.disabled) return '0.5';
        else return '1.0';
    }};
  cursor: ${props => {
        if (props.disabled) return 'default';
        else return 'pointer'
    }};
`;
const Error_message = styled.div`
    margin-left : 0.2rem;
    font-size: 0.5rem;
    color: ${props => props.limitnum ? '#00AB6F' : '#EF0C00'};
`
const Input_password = styled.input`
  border-radius: 5px;
  border : 1px solid #A6A6A6;
  background: #EBEBEB;
  type : text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
`;

const Error_message_Password = styled.div`
    margin-left : 0.2rem;
    font-size: 0.5rem;
    color: ${props => props.limitnum ? (props.limitnum_C ? '#00AB6F' : '#F55C29') : '#EF0C00'};
`


const forgotPW = (props) => {


    const db = fire.firestore();
    const { 
        canchangePW,
        setlimitpassword_C, limitpassword_C,
        setlimitpassword, limitpassword,
        setcorrespass, correspass, 
        repasswordError, setrepasswordError,
        setPasswordError, passwordError,
        password2, setPassword2,
        ID_msg, setID_msg,
        Phone_num_msg, setPhone_num_msg,
        limitPhone_number, setlimitPhone_number,
        limitnum, setlimitnum,
        password, setPassword,
        ID, setID,
        limitID, setlimitID,
        goNext, setgoNext,
        Phone_number, setPhone_number } = props

    const handleNumChange = (e) => {
        let pattern = /[^|a-z|0-9|]/gi; // ?????? ?????? ??????
        e.target.value = e.target.value.replace(pattern, '');
        if (e.target.value.length > 13) //????????? ??????
            e.target.value = e.target.value.slice(0, 13);

        setID(e.target.value);

        if (((e.target.value).length <= 13 && (e.target.value).length >= 8)) {
            setlimitnum(true);
        } else {
            setlimitnum(false);
        }

    }

    const handlePhoneChange = (e) => {
        let pattern = /[^0-9]/gi; // ?????? ?????? ??????
        e.target.value = e.target.value.replace(pattern, '');
        if (e.target.value.length > 11) //????????? ??????
            e.target.value = e.target.value.slice(0, 11);

        setPhone_number(e.target.value);

        if (((e.target.value).length == 11)) {
            setlimitPhone_number(true);
            setPhone_num_msg('????????? ????????? ??????????????????.')
        } else {
            setlimitPhone_number(false);
            setPhone_num_msg('????????? ????????? 11????????? ??????!')
        }

    }
    const handlePassChange = (e) => {
        if (e.target.value.length > 20) //????????? ??????
            e.target.value = e.target.value.slice(0, 20);
        setPassword(e.target.value);

        if ((e.target.value).length == 0) {
            setPasswordError("??????????????? ??????????????????.");
            setlimitpassword(false);
        } else if ((e.target.value).length < 6) {
            setPasswordError("?????? ??????!");
            setlimitpassword(false);
        } else if ((e.target.value).length < 10) {
            setPasswordError("??????");
            setlimitpassword(true);
            setlimitpassword_C(false);
        } else if ((e.target.value).length < 20) {
            setPasswordError("?????? ??????");
            setlimitpassword_C(true);
        }

        if ((e.target.value).length == 0) {
            setrepasswordError("??????????????? ??????????????????.");
            setcorrespass(false);
        } else if ((e.target.value) == password2) {
            setrepasswordError("???????????? ??????!");
            setcorrespass(true);
        } else {
            setrepasswordError("???????????? ?????????!");
            setcorrespass(false);
        }
    }

    const handlerePassChange = (e) => {
        if (e.target.value.length > 20) //????????? ??????
            e.target.value = e.target.value.slice(0, 20);
        setPassword2(e.target.value);

        if ((e.target.value).length == 0) {
            setrepasswordError("??????????????? ??????????????????.");
            setcorrespass(false);
        } else if ((e.target.value) == password) {
            setrepasswordError("???????????? ??????!");
            setcorrespass(true);
        } else {
            setrepasswordError("???????????? ?????????!");
            setcorrespass(false);
        }
    }
    
    const handleCheckButton = () => {
        let Infodb = db.collection("????????????");
        let query = Infodb.where("ID", "==", ID).get().then((querySnapshot) => {
            if (querySnapshot.size) {
                querySnapshot.forEach((doc) => {
                    if (doc.data().User.Phone != Phone_number) {
                        alert("???????????? ID??? ????????? ????????? ????????? ???????????? ?????????.")
                    } else {
                        DoCertification();
                    }
                });
            } else {
                alert("???????????? ID??? ????????? ????????? ?????????.")
            }
        });
    }

    const handleChangePassword = () =>{

        const letID = ID+'@flosting.com'
        // console.log(letID);
        // console.log(password);
        fetch("https://bjvy462n18.execute-api.ap-northeast-2.amazonaws.com/0727/chps", {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: JSON.stringify({
        'email' : letID,
        'changepassword' : password
      })
    }).then(res => res.json())
      .then(data => {
          alert('??????????????? ??????????????? ?????????????????????.');
          window.location.href = '/login';
      })
      .catch(err => console.error(err))
    }

    function callback(response) {
        const {
            imp_uid,
            success,
            merchant_uid,
            error_msg,
        } = response;

        if (success) {
            setgoNext(true);
        } else {
            setgoNext(false);
            alert("??????????????? ?????????????????????.")
        }

    }

    const DoCertification = () => {
        let earlydata = {
            company: '????????? ?????????',            // ????????? ?????? URL
            name: '',                           // ??????
            phone: Phone_number,                          // ????????????
            birth: '',                          //????????????
            gender: '',                        //??????
            min_age: '18'                        //?????? ??? ??????                       
        };

        const { IMP } = window;
        IMP.init('imp73280791');


        /* 4. ???????????? ??? ???????????? */
        IMP.certification(earlydata, callback);

    }
    return (
        <ThemeProvider theme={Colortheme}>
            <div>
                {goNext ? (
                    <Container>
                        <h1>
                            ???????????? ??????
                        </h1>
                        <School_content>
                            <li>??? ?????? 6?????? ?????? ????????? ???????????? ???????????? ??????????????????.</li>
                        </School_content>

                        <Input_password
                            placeholder="???????????? ??????"
                            type="password"
                            required
                            value={password}
                            onChange={handlePassChange}
                        />
                        <Error_message_Password limitnum_C={limitpassword_C} limitnum={limitpassword}>
                            {passwordError}
                        </Error_message_Password>
                        <School_title>
                            ???????????? ??????
                        </School_title>
                        <Input_password
                            placeholder="???????????? ?????????"
                            type="password"
                            required
                            value={password2}
                            onChange={handlerePassChange}
                        />
                        <Error_message limitnum={correspass}>
                            {repasswordError}
                        </Error_message>
                        <PhoneButton disabled={!canchangePW} onClick={handleChangePassword}>
                            ???????????? ??????
                        </PhoneButton>
                    </Container>
                ) :
                    <Container>
                        <h1>
                            ???????????? ??????
                        </h1>
                        <School_content>
                            <li></li>
                        </School_content>
                        <School_number>
                            <School_title>
                                ?????????
                            </School_title>
                        </School_number>
                        <Input
                            limitnum={limitnum}
                            placeholder="???????????? ???????????????"
                            onChange={handleNumChange}
                        />
                        <Error_message limitnum={limitID}>
                            {ID_msg}
                        </Error_message>
                        <School_number>
                            <School_title>
                                ????????? ??????
                            </School_title>
                        </School_number>

                        <Input
                            placeholder="????????? ????????? ??????????????????."
                            onChange={handlePhoneChange}>
                        </Input>
                        <Error_message limitnum={limitPhone_number}>
                            {Phone_num_msg}
                        </Error_message>
                        <PhoneButton disabled={!limitPhone_number} onClick={handleCheckButton}>
                            ????????? ??????
                        </PhoneButton>
                    </Container>
                }

            </div>
        </ThemeProvider>
    );
}

export default forgotPW;