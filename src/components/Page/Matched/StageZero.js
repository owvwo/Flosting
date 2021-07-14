import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { useSpring, animated } from 'react-spring'
import Footer from '../Footer';
import TimerComponent from './Timer.js'
import fire from '../Register/LoginFire.js'
const db = fire.firestore()

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .ProfileWrap{
        display: flex;
    }
`

const TimerWrap = styled.div``

const TitleWrap = styled.div`
color: white;
background-color: grey;
width: 20rem;
font-size : 2rem;
text-align : center;
margin-top: 2rem;
font-weight : bolder
`
const LeftProfileWrap = styled.div`
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-right: 1.5rem;

    .defaultPic{
        width: 6rem;
        height: 6rem;
        background-color: grey;
        border-radius: 50%;
    }

    .profileInfo{
        width: 8rem;
    }
`

const RightProfileWrap = styled.div`
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-left: 1.5rem;

    .defaultPic{
        width: 6rem;
        height: 6rem;
        background-color: grey;
        border-radius: 50%;
    }

    .profileInfo{
        width: 8rem;
    }
`

const ButtonWrap = styled.div`
text-align:center;
margin-top: 2rem;
`
const Agree = styled.button`
margin-bottom: 1rem;
width: 13rem;
height: 3rem;
border : 1px solid yellow;
border-radius: 40px;
background-color: pink;
&:hover{
    background-color: yellow;
    color: pink;
`
const Refuse = styled.button`
margin-bottom: 1rem;
width: 13rem;
height: 3rem;
border : 1px solid yellow;
border-radius: 40px;
background-color: red;
&:hover{
    background-color: grey;
    color: pink;
`


function ResultInit(){

    let[결정상태,결정상태변경] = useState('결정중');
    let[연락상태, 연락상태변경] = useState(false);
    let[매칭진행단계, 매칭진행단계변경] = useState('초기상태');
    useEffect(()=>{
        db.collection('매칭결과').add(
            {
                userOne : {
                    Nick: '왕발',
                    Age : 25,
                    Univ : 'dku',
                    Phone : '01099202603',
                    Manner : 36.5,
                },
                userTwo : {
                    Nick: '미나',
                    Age : 26,
                    Univ : 'dku',
                    Phone : '01038555555',
                    Manner : 38.5,
                },
                stage : 'zero',
                메세지보낸사람 : '',
                거절한사람 : ''

            }
        ).then(()=>{
            alert('알림 신청이 완료되었습니다!')
        })

    },[])

    return(
        <Container>
            <TimerComponent/>
            <Title/>
            <div className='ProfileWrap'>
                <LeftProfile 결정상태={결정상태}/>
                <RightProfile />
            </div>
            <Button 연락상태변경={연락상태변경} 매칭진행단계변경={매칭진행단계변경}/>
            <Footer/>
        </Container>
    )
}
export default ResultInit;

function Timer(){
    return(
        <TimerWrap>
        </TimerWrap>
    )
}

function Title(){
    return(
        <TitleWrap>
            매칭 진행 중
        </TitleWrap>
    )
}

function LeftProfile({결정상태}){
    return(
            <LeftProfileWrap>
                <div>{결정상태}</div>
                <div className='defaultPic'></div>
                <div className='profileInfo'>
                    로그인 한 사람<br/>
                    이름(나이)<br/>
                    학교<br/>
                    전화번호<br/>
                </div>
            </LeftProfileWrap>
    )
}

function RightProfile(){
    return(
        <RightProfileWrap>
            <div>결정중</div>
            <div className='defaultPic'></div>
            <div className='profileInfo'>
                로그인 한 사람과 <br/>
                매칭된 사람(나이)<br/>
                학교<br/>
                전화번호<br/>
            </div>
        </RightProfileWrap>
    )
}

function Button({연락상태변경, 매칭진행단계변경}){
    function onClick_sendMessage(){
        const result = window.confirm('정말로 먼저 연락을 보내셨나요?');
        if(result){
            연락상태변경(true);
            매칭진행단계변경('')
            alert('용기있는 당신 매너온도가 상승했습니다!')
        }else{연락상태변경(false)}
    }
    function onClick_refuse(){
        const result = window.confirm('정말로 거절하실건가요? 매너온도가 차감됩니다.');
        if(result){
            연락상태변경(true)
            alert('매칭을 거절하셨습니다. 매너온도가 차감되었습니다.')
        }else{연락상태변경(false)}
    }

    return(
        <ButtonWrap>
            <Agree onClick={onClick_sendMessage}>먼저 연락했어요!</Agree>
            <Refuse onClick={onClick_refuse}>거절할래요</Refuse>
        </ButtonWrap>
    )
}









// function LoopObject() {
//     // const styles = useSpring({
//     //   loop: { reverse: true },
//     //   from: { x: 0 },
//     //   to: { x: 100 },
//     // })
  
//     return (
//       <animated.div
//         style={{
//           width: 80,
//           height: 80,
//           backgroundColor: '#46e891',
//           borderRadius: 16,
//           ...styles,
//         }}
//       />
//     )
//   }