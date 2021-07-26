import React, { useState, useEffect } from "react";
import firebase from '../Register/LoginFire.js'

const db = firebase.firestore()

function Timer(){
  const [days, setDays] = useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [지금까지, 지금까지변경] = useState();
  const [time,setTime] = useState();

  const getVariableInfo = async() => {
    const snapShot = await db.collection('매칭결과변수').doc('variableInfo').get()
    try{
        setTime(snapShot.data()['마감시간'])
    }catch(err){console.log(err)}
}

  useEffect(()=>{
    getVariableInfo();
    const 현재까지 = Date.now()
    const 마감시간 = new Date(time);
    const 마감까지 = 마감시간.getTime()
    const 남은시간 = 마감까지 - 현재까지
  
    const seconds변환 = parseInt(남은시간 / 1000)
    const minutes변환 = parseInt(seconds변환/60)
    const hours변환 = parseInt(minutes변환/60)
    const days변환 = parseInt(hours변환/24)
    setDays(days변환)
    setHours(hours변환-days*24)
    setMinutes(minutes변환-days*24*60-hours*60)
    setSeconds(seconds변환-days*24*60*60-hours*60*60-minutes*60)
    
    setInterval(() => {
      지금까지변경(Date.now())
    }, 1000);
  },[지금까지,time])
  return(
    <div>
      {hours}시간 {minutes}분 {seconds}초 남았습니다!!
    </div>
  )
}
export default Timer;
