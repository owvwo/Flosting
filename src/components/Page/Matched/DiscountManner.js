import React, { useState } from 'react';
import firebase from '../Register/LoginFire.js'
const db = firebase.firestore()

function DiscountManner(){

    let[stageZero, setStageZero] = useState([]);
    let[chewerList, setChewerList] = useState([]);
    let stageZeroSum = []
    let chewerSum = []
    let chewer = null

    function findStageZero(){
        db.collection("7lilac").where("stage", "==", 'zero')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    stageZeroSum.push(doc.data().userOne['Nick'], doc.data().userTwo['Nick'])
                });
                db.collection("7daisy").where("stage", "==", 'zero')
                .get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        stageZeroSum.push(doc.data().userOne['Nick'], doc.data().userTwo['Nick'])
                        })
                    db.collection("7clover").where("stage", "==", 'zero')
                    .get()
                    .then((querySnapshot)=>{
                        querySnapshot.forEach((doc)=>{
                            stageZeroSum.push(doc.data().userOne['Nick'], doc.data().userTwo['Nick'])
                        })
                        setStageZero(stageZeroSum);
                        console.log(stageZeroSum)
                    })
                })
            })
            .catch(console.log('검색결과없음'))
    }


    function findChewer(){
        db.collection("7lilac").where("stage", "==", 'half').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().userOne['Nick'] === doc.data().메세지보낸사람){
                    chewer = doc.data().userTwo['Nick'];
                    chewerSum.push(chewer)
                }else if(doc.data().userTwo['Nick'] === doc.data().메세지보낸사람){
                    chewer = doc.data().userOne['Nick'];
                    chewerSum.push(chewer)
                }
            });
            db.collection("7daisy").where("stage", "==", "half").get().then((querySnapshot) => {
                querySnapshot.forEach((doc)=>{
                    if(doc.data().userOne['Nick'] === doc.data().메세지보낸사람){
                        chewer = doc.data().userTwo['Nick'];
                        chewerSum.push(chewer)
                    }else if(doc.data().userTwo['Nick'] === doc.data().메세지보낸사람){
                        chewer = doc.data().userOne['Nick'];
                        chewerSum.push(chewer)
                    }
                })
                db.collection("7clover").where("stage", "==", "half").get().then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        if(doc.data().userOne['Nick'] === doc.data().메세지보낸사람){
                            chewer = doc.data().userTwo['Nick'];
                            chewerSum.push(chewer)
                        }else if(doc.data().userTwo['Nick'] === doc.data().메세지보낸사람){
                            chewer = doc.data().userOne['Nick'];
                            chewerSum.push(chewer)
                            console.log(chewerSum)
                        }    
                    })
                    setChewerList(chewerSum);
                })
            })
        })
            .catch(console.log('검색결과없음'))
    }

    function mannerDown(){
        let documentId = null
        let userIdList=[]
        let listSumState = stageZero.concat(chewerList)
        console.log(listSumState)
        listSumState.forEach((user)=>{
            db.collection('회원정보').where("User.Nick", "==", user).get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    console.log(doc.id)
                    documentId = doc.id
                    
                })
                const docRef = db.collection('회원정보').doc(documentId);
                return db.runTransaction((transaction)=>{
                    return transaction.get(docRef).then((doc)=>{
                        if(!doc){throw "Document does not exist!"}
                        const Age = doc.data().User.Age;
                        const Gender = doc.data().User.Gender;
                        const newManner = doc.data().User.Manner - 1;
                        const Nick = doc.data().User.Nick;
                        const Phone = doc.data().User.Phone;
                        const Univ = doc.data().User.Univ;
                        transaction.update(docRef,{User:{
                            Age: Age,
                            Gender:Gender,
                            Manner: newManner,
                            Nick: Nick,
                            Phone: Phone,
                            Univ: Univ
                        }})
                    })
                })
            })
        })

    }

    return(
        <div>
            <button onClick={()=>{findStageZero()}}>잠수탄애들잡아내기</button>
            <button onClick={()=>{findChewer()}}>선톡씹은애들잡아내기</button>     
            <button onClick={()=>{mannerDown()}}>매너온도 차감 버튼</button>      

        </div>
    )
}
export default DiscountManner;