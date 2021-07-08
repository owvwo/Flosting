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
const Nicname_content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 2rem;
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
const RegButton = styled.button`
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
    
    const clearErrors = () =>{
        setPasswordError('');
    }

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
        fire
            .firestore()
            .collection("회원정보")
            .add({
              ID: S_num,
              Password: password,
              School_name: S_name,
            })
            .then(() => {
              
            })
            .catch((error) => {
              alert(error.message);
            });
    }

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
                        <RegButton register>
                            홈으로 이동
                        </RegButton>
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
                    <Nicname_content>
                        <School_title>
                            닉네임
                        </School_title>
                        <School_content>
                            ※ 한글과 영어로 이루어진 문자열로, 2~6글자로 설정해주세요.
                        </School_content>
                        <Input
                            placeholder="닉네임 입력"
                            type = "text"
                            required
                        />
                    </Nicname_content>
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
                        <School_title>
                            비밀번호 확인
                        </School_title>
                        <Input
                            placeholder="비밀번호 입력"
                            type = "password"
                            required
                            value = {password}
                            onChange = {e => setPassword(e.target.value)}
                        />
                        <p> {passwordError}</p>

                    </Password_content>
                    <RegButton onClick = {handleSignUp} register>
                        회원가입 완료
                    </RegButton>
                </Container>
            );
            }
        }
}

export default LastRegister;