import React, { useEffect, useState } from 'react';
import firebase from '../Register/LoginFire.js'

function DiscountManner(){
    const db = firebase.firestore()

    let[차감리스트, 차감리스트변경] = useState([]);
    function onclickHandler(){
        console.log('hi')
        db.collection("7lilac").where("stage", "==", 'zero')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data().userOne['Nick'])
                    console.log(doc.data().userTwo['Nick'])
                    차감리스트변경((prev)=>[doc.data().userOne['Nick'], ...prev])
                    차감리스트변경((prev)=>[doc.data().userTwo['Nick'], ...prev])
                });
            })
            .catch(console.log('검색결과없음'))
        console.log(차감리스트)
    }

    return(
        <div>
            <button onClick={()=>{onclickHandler()}}>매너도 깎아버려!</button>      
        </div>
    )
}
export default DiscountManner;