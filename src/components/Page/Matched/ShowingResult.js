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

    let 유저이메일 = null
    let 유저아이디 = null
    let [닉네임, 닉네임변경] = useState('');
    let [발전단계, 발전단계변경] = useState('');
    let [메세지보낸사람, 메세지보낸사람변경] = useState('');
    let [거절한사람, 거절한사람변경] = useState('');
    let [유저1, 유저1변경] = useState('');
    let [유저2, 유저2변경] = useState('');
    let [몇회차,몇회차변경] = useState();

    useEffect(()=>{
        if(user){
        유저이메일 = user.email
        유저아이디 = 유저이메일.split('@')[0];

        const promise_몇회차 = new Promise((resolve, reject) => {

            db.collection("회원정보").where("ID", "==", 유저아이디)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    몇회차변경(doc.data()['Ongoing'])
                });
            })
                resolve(몇회차);
        })

        const promise_닉네임 = new Promise((resolve, reject) => {

            db.collection("회원정보").where("ID", "==", 유저아이디)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    닉네임변경(doc.data()['User']['Nick'])
                });
            })
                resolve(닉네임);
        })

        Promise.all([promise_닉네임,promise_몇회차]).then((value) => {
            const collectionName = String(value[1]) 
            const Nickname = value[0]

            db.collection(collectionName).where("userOne.Nick", "==", Nickname)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    유저1변경(doc.data()['userOne'])
                    유저2변경(doc.data()['userTwo'])
                    발전단계변경(doc.data()['stage'])
                    메세지보낸사람변경(doc.data()['메세지보낸사람'])
                    거절한사람변경(doc.data()['거절한사람'])
                
                });
            })
            if(발전단계 === ''){
                db.collection(collectionName).where("userTwo.Nick", "==", Nickname)
                .get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        유저1변경(doc.data()['userOne'])
                        유저2변경(doc.data()['userTwo'])
                        발전단계변경(doc.data()['stage'])
                        메세지보낸사람변경(doc.data()['메세지보낸사람'])
                        거절한사람변경(doc.data()['거절한사람'])
    
                    })
                })
            }
        })
    
        } // if문 끝
    }, [user, 닉네임])

    
    return(
        <div>
            {
                발전단계 === 'zero' && <StageZero 유저1={유저1} 유저2={유저2}/>
            }

            {
                발전단계 === 'half' && <StageHalf/>
            }
            {
                발전단계 === 'success' && <StageSuccess/>
            }
        </div>
    )
}
export default ShowingResult;















    // function 닉네임호출(){
    //     db.collection("회원정보").where("ID", "==", 유저아이디)
    //     .get()
    //     .then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.id, " => ", doc.data()['User']['Nick']);
    //             유저닉네임 = doc.data()['User']['Nick']
    //         });
    //     })
    //     .catch((error) => {
    //         console.log("Error getting documents: ", error);
    //     });
    // }



    // const promise = new Promise((resolve, reject) => {
    //     db.collection("회원정보").where("ID", "==", '32164205')
    //     .get()
    //     .then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             닉네임변경(doc.data()['User']['Nick'])
    //         });
    //     })
    //         resolve(닉네임);
    // })
    // promise.then((닉네임) => {
    //     db.collection("매칭결과").where("userOne.Nick", "==", 닉네임)
    //     .get()
    //     .then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.data());
    //         });
    //     })
    // })
