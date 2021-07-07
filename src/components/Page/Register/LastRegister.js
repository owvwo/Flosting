import React, { Component, useEffect, useState } from 'react'
import './Searchbox.css'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import fire from './LoginFire';

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    margin: 0rem 2rem;
    

    h1{
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;
const Password_content = styled.div`
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
    font-size: 0.5rem;
`;
const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 5px;
  border: ${props => {
        if (props.register) return 'none';
        else if (props.login) return '1px solid #E0BCC1';
    }};
  border-radius: 5px;
  height: 3rem;
  width: 300px;
  background-color: ${props => {
        if (props.register) return '#E0BCC1';
        else if (props.login) return '#FFFFFF';
    }};
  color: ${props => {
        if (props.register) return '#FFFFFF';
        else if (props.login) return '#828282';
    }};
`;
const Input = styled.input`
  border : 1px solid #A6A6A6;
  background: #EBEBEB;
  type : text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
  border-radius: 5px;
`;


const LastRegister = (props) => {

    const {auth_regis, S_name, S_num, user, authListener} = props
    const email = S_num + "@flosting.com";
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const clearInputs = () => {
        setPassword('');
    }
    const clearErrors = () =>{
        setPasswordError('');
    }
    // const handleLogin = () =>{
    //     clearErrors();
    //     fire
    //         .auth()
    //         .signInWithEmailAndPassword(email, password)
    //         .catch(err => {
    //             switch(err.code){
    //                 case "auth/invalid-email":
    //                 case "auth/user-disabled":
    //                 case "auth/user-not-found":
    //                     setEmailError(err.message);
    //                     break;
    //                 case "auth/wrong-password":
    //                     setPasswordError(err.message);
    //                     break;
    //             }
    //         });
    // };
    const handleSignUp = () =>{
        clearErrors();
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch(err.code){
                    case "auth/email-already-in-use":
                    // case "auth/invalid-email":
                    //     setEmailError(err.message);
                    //     break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    }
    // const handleLogout = () => {
    //     fire.auth().signOut();
    // }

    useEffect(()=>{
        authListener();
    }, []);
    
    
    if (!auth_regis) { return (<Redirect to='/register' />); }
        else {
            if(user){
                return(
                    <Container>
                        <h1>
                        회원가입 완료
                        </h1>
                        <p>축하드립니다.</p>
                        <School_title>
                            당신 ID
                            <p>{email}</p>
                        </School_title>
                        <School_title>
                            당신 비밀번호
                            <p>{password}</p>
                        </School_title>
                        <NavLink to = '/'>
                        <Button register>
                            홈으로 이동
                        </Button>
                        </NavLink>
                    </Container>
                );
            }
            else{
            return (
                <Container>
                    <h1>
                        플로스팅 회원가입
                    </h1>
                    <Password_content>
                        <School_title>
                            비밀번호
                        </School_title>
                        <School_content>
                            ※ 최소 6글자 이상 문자로 이루어진 문자열로 입력해주세요.
                        </School_content>
                        <Input
                            placeholder="비밀번호 입력"
                            type = "password"
                            required
                            value = {password}
                            onChange = {e => setPassword(e.target.value)}
                        />
                        <p> {passwordError}</p>

                    </Password_content>
                    <School_title>
                            넘어온 ID
                            <p>{email}</p>
                    </School_title>
                    <School_title>
                            넘어온 학교
                            <p>{S_name}</p>
                    </School_title>
                    <Button onClick = {handleSignUp} register>
                        회원가입 완료
                    </Button>
                </Container>
            );
            }
        }
}

export default LastRegister;