import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring'
import Footer from '../Footer';
import TimerComponent from './Timer.js'
import fire from '../Register/LoginFire.js'
import profileImageBoy from '../../../images/profile_boy_default.png';
import profileImageGirl from '../../../images/profile_girl_default.png';
import { NavLink,Link } from 'react-router-dom';
const db = fire.firestore()

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .ProfileWrap{
        display: flex;
    }
    .text{
        height: 12rem;
        text-align: center;
        margin-top: 3rem;
        font-size: 1.1rem;
    }

`

const TimerWrap = styled.div`
text-align: center;
color: red;
margin-top: 1rem;
`

const TitleWrap = styled.div`
color: white;
background-color: grey;
width: 20rem;
font-size : 2rem;
text-align : center;
margin-top: 1rem;
margin-bottom: 2rem;
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


function StageHalf(props){
    const 유저1 = props.유저1
    const 유저2 = props.유저2
    const 닉네임 = props.닉네임
    const 발전단계변경 = props.발전단계변경
    const 메세지보낸사람 = props.메세지보낸사람

    console.log(props.컬렉션)
    console.log(props.문서번호)
    let[연락상태, 연락상태변경] = useState(false);
    useEffect(()=>{
    },[])

    return(
        <Container>
            <Timer/>
            <Title/>
            <div className='ProfileWrap'>
                <LeftProfile 유저1={유저1} 메세지보낸사람={메세지보낸사람}/>
                <RightProfile 유저2={유저2} 메세지보낸사람={메세지보낸사람}/>
            </div>
            <div className='text'>
                서로 연락중인데 계속 이 화면이 지속되면<br/>
                상대방에게 매칭결과 탭에서 '답장했어요' 버튼을<br/>
                눌러 매칭 성공화면으로 넘어가도록 하셔야<br/>
                매너온도에 악영향을 미치지 않습니다.<br/>
            </div>
            <Footer/>
        </Container>
    )
}
export default StageHalf;

function Timer(){
    return(
        <TimerWrap>
            <div>
                플로스팅 종료까지
            </div>
            <TimerComponent/>
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

function LeftProfile({유저1, 메세지보낸사람}){

    let profileImage=null;

    if(유저1['Gender'] === 'boy'){
        profileImage = profileImageBoy
    }else if(유저1['Gender'] === 'girl') {
        profileImage = profileImageGirl
    }

    let profileNickName = 유저1['Nick']
    
    return(
            <LeftProfileWrap>
                <div className='decisionState'>
                    {
                    메세지보낸사람 === 유저1['Nick']
                    ? <div>메세지보냈음!</div>
                    : <div>결정중</div>
                    }
                </div>
                <div>
                    <img src={profileImage} className='defaultPic'/>
                </div>
                <div className='profileInfo'>
                    {유저1['Nick']}님<br/>
                    <Link to = {`/userprofile/${profileNickName}`}><div>프로필 보기</div></Link>
                </div>
            </LeftProfileWrap>
    )
}

function RightProfile({유저2, 메세지보낸사람}){

    let profileImage=null;

    if(유저2['Gender'] === 'boy'){
        profileImage = profileImageBoy
    }else if(유저2['Gender'] === 'girl') {
        profileImage = profileImageGirl
    }
    let profileNickName = 유저2['Nick']
    return(
        <RightProfileWrap>
            <div className='decisionState'>
                {
                메세지보낸사람 === 유저2['Nick']
                ? <div>메세지보냈음!</div>
                : <div>결정중</div>
                }
            </div>
            <div>
                    <img src={profileImage} className='defaultPic'/>
                </div>
            <div className='profileInfo'>
                {유저2['Nick']}님<br/>
                <Link to = {`/userprofile/${profileNickName}`}><div>프로필 보기</div></Link>
            </div>
        </RightProfileWrap>
    )
}

