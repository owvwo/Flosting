import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import {NavLink} from 'react-router-dom';
import TimerComponent from './Timer.js'
import fire from '../Register/LoginFire.js'
import profileImageBoy from '../../../images/profile_boy_default.png';
import profileImageGirl from '../../../images/profile_girl_default.png';

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
        font-family: 'Do Hyeon', sans-serif;
        border-top: 3px solid rgb(218,219,247, 0.8);
        height: 15rem;
        text-align: center;
        margin-top: 4rem;
        font-size: 1.5rem;
    }

`

const NoticeMessage = styled.div`
 list-style: none;
 li{
     font-size: 0.6rem;
     margin-bottom: 2rem;
 }
`
const TitleWrap = styled.div`

    color: rgb(0,0,0, 0.75);
    background: rgb(0,0,0, 0.05);
    width: 20rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content : center;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;

    font-size : 2rem;
    text-align : center;
    margin-top: 1rem;
`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content : center;
    flex-direction: column;

`

const LeftProfileWrap = styled.div`
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-right: 1.5rem;

    .defaultPicBox{
        list-style: none;
        a{
            
            .LookProfile{
                font-family: 'Do Hyeon', sans-serif;
                margin-bottom: 5px;
                border-radius : 5px;
                background: rgb(0,0,0, 0.1);
            }
        }
    }
    .defaultPic{
        width: 6rem;
        height: 6rem;
        background-color: grey;
        border-radius: 50%;
    }

    .profileInfo{
        list-style: none;
        width: 8rem;
        .UserNick{
            font-weight: 700;
        }
        .UserUniv{
            font-size: 0.5rem;
        }
        .UserManner{
            font-size: 0.5rem;
        }
        .UserPhone{
            background: rgb(209,240,228,0.8);
            font-size: 0.9rem;
            font-weight: 700;
            
        }
    }
`

const RightProfileWrap = styled.div`
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-left: 1.5rem;

.defaultPicBox{
    list-style: none;
    a{
        
        .LookProfile{
            font-family: 'Do Hyeon', sans-serif;
            margin-bottom: 5px;
            border-radius : 5px;
            background: rgb(0,0,0, 0.1);
        }
    }
}
.defaultPic{
    width: 6rem;
    height: 6rem;
    background-color: grey;
    border-radius: 50%;
}

.profileInfo{
    list-style: none;
    width: 8rem;
    .UserNick{
        font-weight: 700;
    }
    .UserUniv{
        font-size: 0.5rem;
    }
    .UserManner{
        font-size: 0.5rem;
    }
    .UserPhone{
        background: rgb(209,240,228,0.8);
        font-size: 0.9rem;
        font-weight: 700;
        
    }
}
`


function StageSuccess(props){
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
            <Title/>
            <div className='ProfileWrap'>
                <LeftProfile 유저1={유저1} 메세지보낸사람={메세지보낸사람}/>
                <RightProfile 유저2={유저2} 메세지보낸사람={메세지보낸사람}/>
            </div>
            <div className='text'>
                플로스팅을 이용해주셔서 감사합니다 :)<br/>
            </div>
            <Footer/>
        </Container>
    )
}
export default StageSuccess;


function Title(){
    return(
        <TitleContainer>
            <TitleWrap>
            매칭 완료!
            </TitleWrap>
            <NoticeMessage><li>표시와 다르게 연락이 진행되지 않았다면 카카오 채널을 통해 문의해주세요!</li></NoticeMessage>
        </TitleContainer>
    )
}

function LeftProfile({유저1, 메세지보낸사람}){

    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#2B2A28'
      }

    let profileImage=null;

    if(유저1['Gender'] === 'boy'){
        profileImage = profileImageBoy
    }else if(유저1['Gender'] === 'girl') {
        profileImage = profileImageGirl
    }

    return(
            <LeftProfileWrap>
            <div className='defaultPicBox'>
                <NavLink to = {`/userprofile/${유저1['Nick']}`} style={noneactiveStyle}><li className = "LookProfile">프로필 보기</li></NavLink>
                <img src={profileImage} className='defaultPic'/>
            </div>
                <div className='profileInfo'>
                <li className="UserNick">{유저1['Nick']}[{유저1['Age']}]</li>
                <li className="UserPhone">{유저1['Phone'].substring(0,3)}-{유저1['Phone'].substring(3,7)}-{유저1['Phone'].substring(7)}</li>  
                <li className="UserUniv">{유저1['Univ']}</li>
            </div>
            </LeftProfileWrap>
    )
}

function RightProfile({유저2, 메세지보낸사람}){
    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#2B2A28'
      }

    let profileImage=null;

    if(유저2['Gender'] === 'boy'){
        profileImage = profileImageBoy
    }else if(유저2['Gender'] === 'girl') {
        profileImage = profileImageGirl
    }

    return(
        <RightProfileWrap>
            <div className='defaultPicBox'>
                <NavLink to = {`/userprofile/${유저2['Nick']}`} style={noneactiveStyle}><li className = "LookProfile">프로필 보기</li></NavLink>
                <img src={profileImage} className='defaultPic'/>
            </div>
                <div className='profileInfo'>
                <li className="UserNick">{유저2['Nick']}[{유저2['Age']}]</li>
                <li className="UserPhone">{유저2['Phone'].substring(0,3)}-{유저2['Phone'].substring(3,7)}-{유저2['Phone'].substring(7)}</li>  
                <li className="UserUniv">{유저2['Univ']}</li>
            </div>
        </RightProfileWrap>
    )
}

