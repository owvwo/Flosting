import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from '../Register/LoginFire.js'

import Footer from '../Footer';
import StageZero from './StageZero.js';
import StageHalf from './StageHalf.js';
import StageSuccess from './StageSuccess.js';



function ShowingResult(props){
    const db = firebase.firestore()
    const user = props.User;
    const loggedEmail = user.email

    const stage = 'success'
    const [유저닉네임, 유저닉네임변경] = useState(null);
    const [로그인상태, 로그인상태변경] = useState(false);
    const [유저정보, 유저정보변경] = useState(null);
    let 유저이메일 = ''
    let 유저아이디 = ''
    // const [유저이메일, 유저이메일변경] = useState(null);
    // const [유저아이디, 유저아이디변경] = useState(null);

    useEffect(()=>{
        if(user){
        // 유저아이디알아내기()
        // 유저닉네임호출()
        }
    }, [user]);
      
    function 유저아이디알아내기() {
        firebase.auth().onAuthStateChanged(function(user){
            유저이메일 = user.email
            유저아이디 = 유저이메일.split('@')[0]
            console.log(유저아이디)
            return 유저아이디;
        });
    }

    // async function getUserNick() {

        // console.log(유저아이디)
        // const userEmail = User.email;
        // console.log(User.email)

        // const userId = userEmail.split('@')[0]
        // console.log(userId)

    function getFrom매칭결과() {
        const snapshot = db.collection('매칭결과').where('userOne.Nick', '==', '왕발').get()
        snapshot.forEach( (doc)=>{
            console.log(doc.data());
        })
    }

    function 유저닉네임호출() {
        const snapshot = db.collection('회원정보').where('ID', '==', 유저아이디).get()
        snapshot.forEach( (doc)=>{
            console.log(doc.data());
        })
    }

    
    return(
        <div>
            {
                stage === 'zero' && <StageZero/>
            }

            {
                stage === 'half' && <StageHalf/>
            }
            {
                stage === 'success' && <StageSuccess/>
            }
            <Footer/>
        </div>
    )
}
export default ShowingResult;