import React, { useState, useEffect } from "react";

function Timer(props){
  const 남은시간 = props.남은시간
  const [days, setDays] = useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [지금까지, 지금까지변경] = useState();

  useEffect(()=>{

    const 현재까지 = Date.now()
    
    const 마감시간 = new Date('2021-07-16T10:00:00');
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
  },[지금까지])
  return(
    <div>
      {days}일 {hours}시간 {minutes}분 {seconds}초 남음
    </div>
  )
}
export default Timer;
