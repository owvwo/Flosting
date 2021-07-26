import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Certification from './Register/Certification'
import './Home.css';
import { NavLink } from "react-router-dom";
import Footer from './Footer';
import logoimg from '../../images/플로스팅 로고.png'
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import 참여방법Slider from './HowToSubmitSlider.js'
import 매칭진행Slider from './MatchingStageSlider.js'
import 데이지배경 from '../../images/daisy.png'
import 라일락배경 from '../../images/lilac.png'
import 클로버배경 from '../../images/clover.png'
import firebase from './Register/LoginFire.js'
const db = firebase.firestore()

const Container = styled.div`
font-family: 'Noto Sans KR', sans-serif;
left: 0;
width: 100%;
height: calc(100%-50px);
overflow: scroll;
align-items: center;
background-color: white;
position : relative;
`;
const WhatIsFlostingWrap = styled.div`
display: flex
justify-content: center;
`
const DaisyTingWrap = styled.div`
background-color: rgb(238,236,142,0.2);
width: 20rem;
height: 30rem;
border: 2px solid rgb(238,236,142,0.3);
border-radius: 20px;
margin-top: 3rem;
    .highlight{
        box-shadow: inset 0 -20px 0 #FBF38A;
        margin-top: 1rem;
        text-align: left;
        font-size: 1.8rem;
        font-weight: bold;
    }
    .배경이미지{
        img{
            width:20rem;
            position: relative;
            top:-13rem;
        }
    }
`
const LilacTingWrap = styled.div`
background-color: rgb(255,180,224,0.2);
width: 20rem;
height: 30rem;
border: 2px solid rgb(255,180,224,0.3);
border-radius: 20px;
margin-top: 3rem;
    .highlight{
        box-shadow: inset 0 -20px 0 #FFB4E0;
        margin-top: 1rem;
        text-align: left;
        font-size: 1.8rem;
        font-weight: bold;
    }
    .배경이미지{
        img{
            width:20rem;
            position: relative;
            top:-13rem;
        }

`
const CloverTingWrap = styled.div`
background-color: rgb(179,214,189,0.2);
width: 20rem;
height: 30rem;
border: 2px solid rgb(179,214,189,0.3);
border-radius: 20px;
margin-top: 3rem;
    .highlight{
        box-shadow: inset 0 -20px 0 #8DDDA4;
        margin-top: 1rem;
        text-align: left;
        font-size: 1.8rem;
        font-weight: bold;
    }
    .배경이미지{
        img{
            width:20rem;
            position: relative;
            top:-11.5rem;
        }

`
const 참여방법Wrap = styled.div`
width:100%;
.silderDiv{
    display: flex;
    justify-content: center;
    align-items: center;
}
.middleText{
    text-align:center;
    font-weight: bolder;
    font-size: 1.1rem;
    margin-bottom: 5rem;
}
ul{
    margin-top: 1rem;
    margin-left: 4rem;
    margin-bottom: 1rem;
}
.text{
    text-align: center;
    margin-bottom: 1rem;
}
`
const CurrentButton = styled.button`
    font-size: 2rem;
    background-color: rgb(255,180,224,0.2);
    color: white;
    border: rgb(179,214,189,0.3);
    width: 14rem;
    border-radius: 12px;
    padding: 5px;
    &:hover{
        background-color:white;
        color: green;
    }
`
const ResultButton = styled.button`
    font-size: 2rem;
    background-color: rgb(238,236,142,0.2);
    color: white;
    border: rgb(179,214,189,0.3);
    width: 14rem;
    border-radius: 12px;
    padding: 5px;
    &:hover{
        background-color:white;
        color: green;
    }
`



const Home = (props) => {
    let user = props.User;
    let [버튼타이머, 버튼타이머변경] = useState(false);
    let [매칭결과조회여부, 매칭결과조회여부변경] = useState(false);
    let [지난회차, 지난회차변경] = useState();
    let [진행중회차, 진행중회차변경] = useState();
    let [Ongoing, setOngoing] = useState();

    const getVariableInfo = async () => {
        const snapShot = await db.collection('매칭결과변수').doc('variableInfo').get()
        try {
            지난회차변경(snapShot.data()['진행중회차'] - 1)
            진행중회차변경(snapShot.data()['진행중회차'])
        } catch (err) { console.log(err) }
    }
    const getUserOngoing = async () => {
        const getDocIdFromMemberInfo = await db.collection('회원정보').where("ID", "==", props.User.email.split('@')[0]).get()
        getDocIdFromMemberInfo.forEach((doc) => {
            setOngoing(doc.data()['Ongoing'])
        })

    }
    useEffect(() => {
        if (user) {
            getVariableInfo();
            getUserOngoing();
            if (Number(Ongoing) === 진행중회차) { 매칭결과조회여부변경(true) }
            else if (Number(Ongoing) === 지난회차) { 매칭결과조회여부변경(true) }
        }
        setTimeout(function () {
            버튼타이머변경(true);
        }, 2500)
    })


    return (
        <Container>
            <Jumbotron CurrentButton={CurrentButton} 버튼타이머={버튼타이머} 매칭결과조회여부={매칭결과조회여부} />
            <WhatIsFlosting WhatIsFlostingWrap={WhatIsFlostingWrap} />
            <div className='parent'>
                <LilacTing LilacTingWrap={LilacTingWrap} />
                <DaisyTing DaisyTingWrap={DaisyTingWrap} />
                <CloverTing CloverTingWrap={CloverTingWrap} />
            </div>
            <참여방법 참여방법Wrap={참여방법Wrap}></참여방법>
            <매칭방법 참여방법Wrap={참여방법Wrap} />
            <추후업데이트 참여방법Wrap={참여방법Wrap}></추후업데이트>
            <Footer></Footer>
        </Container>

    );
};
export default Home;


function Jumbotron({ CurrentButton, 버튼타이머, 매칭결과조회여부 }) {
    
    const mp4link = "https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/flostingmain.mp4?alt=media&token=" + process.env.REACT_APP_LINK_TOKEN
    return (
        <div className='jb_wrap'>
            <div className='video_wrap'>
                <video muted autoPlay playsInline className="videoview">
                    <source src={mp4link} type="video/mp4">

                    </source>
                </video>
            </div>
            {
                버튼타이머 === true && 매칭결과조회여부 === true
                    ?
                    <div className='result_link'>
                        <NavLink to='/selectresult'>
                            <Fade bottom>
                                <ResultButton>매칭결과보기</ResultButton>
                            </Fade>
                        </NavLink>
                    </div>

                    :
                    null
            }

            {
                버튼타이머 === true
                    ?
                    <div className='jb_link'>
                        <NavLink to='/currentevent'>
                            <Fade bottom>
                                <CurrentButton>현재 진행 중</CurrentButton>
                            </Fade>
                        </NavLink>
                    </div>

                    : null
            }

        </div>
    )
}

function WhatIsFlosting({ WhatIsFlostingWrap }) {

    return (
        <WhatIsFlostingWrap>
            <Fade bottom>
                <div className='intro_title'>Flosting이란?</div>
            </Fade>
            <Flip left>
                <div className='logoimg_wrap'>
                    <img src={logoimg} className='logoimg' />
                </div>
            </Flip>
            <Fade bottom>
                <div className='intro_sh'>Flos<span>라틴어로 '꽃'</span> + Meeting</div>
            </Fade>
            <Fade bottom>
                <div className='aboutName'>
                    Flos는 라틴어로 '꽃'을 의미합니다.<br />
                    데이지와 라일락의 '꽃말'을 <br />
                    적용한 저희 만의 이벤트 이름입니다
                </div>
            </Fade>

        </WhatIsFlostingWrap>

    )
}

function DaisyTing({ DaisyTingWrap }) {

    return (
        <DaisyTingWrap>
            <Fade bottom>
                <div className='내용'>
                    <span className="highlight">'이성친구'를</span><br />
                    원하시나요?
                </div>
                <div className='daisy'>
                    데이지의 꽃말은 '우정'입니다.<br />
                    데이지팅을 통해서<br />
                    새로운 친구와 선후배<br />
                    같은 학교 뿐만 아니라 인근 학교까지!!<br />
                </div>
                <div className='배경이미지'>
                    <img src={데이지배경} />
                </div>

            </Fade>
        </DaisyTingWrap>

    )
}
function CloverTing({ CloverTingWrap }) {

    return (
        <CloverTingWrap>
            <Fade bottom>
                <div className='내용'>
                    <span className="highlight">'동성친구'를</span><br />
                    원하시나요?
                </div>
                <div className='daisy'>
                    클로버의 꽃말은 '행복'입니다.<br />
                    클로버팅을 통해서<br />
                    행복을 나눌 동성 친구를 만들어 보세요!!<br />
                </div>
                <div className='배경이미지'>
                    <img src={클로버배경} />
                </div>

            </Fade>
        </CloverTingWrap>

    )
}

function LilacTing({ LilacTingWrap }) {

    return (
        <LilacTingWrap>
            <Fade bottom>
                <div className='내용'>
                    <span className="highlight">'연인'을</span><br />
                    원하시나요?
                </div>
                <div className='daisy'>
                    라일락의 꽃말은 <br />
                    '새로운 사랑의 싹이 트다'입니다.<br />
                    라일락팅을 통해서<br />
                    운명의 상대를 만나보세요!!<br />
                </div>
                <div className='배경이미지'>
                    <img src={라일락배경} />
                </div>

            </Fade>
        </LilacTingWrap>

    )
}

function 참여방법({ 참여방법Wrap }) {
    return (
        <Fade bottom>
            <참여방법Wrap>
                <div className='목차제목'>
                    <span className='highlight'>참여방법</span>
                </div>
                <div className='silderDiv'>
                    <참여방법Slider />
                </div>
            </참여방법Wrap>
        </Fade>
    )
}
function 매칭방법({ 참여방법Wrap }) {
    return (

        <참여방법Wrap>
            <Fade bottom>
                <div className='잠깐'>
                    <span className='잠깐highlight'>잠깐!</span>
                </div>
            </Fade>
            <Fade bottom>
                <div className='middleText'>
                    매칭은 되었지만 상대방에서 <br />
                    아무런 반응이 없다구요?<br />
                    또는 사정이 생겨 매칭 거절 <br />
                    의사를 표하고 싶으시다구요?<br /><br />
                    플로스팅에서는 매칭이 이루어지면 특별한<br />
                    화면으로 매칭 진행 상황을 보실 수 있습니다.
                </div>
            </Fade>
            <Fade bottom>
                <div className='목차제목'>
                    <span className='highlight'>매칭 단계 진행 방법</span>
                </div>
                <div className='silderDiv'>
                    <매칭진행Slider />
                </div>
            </Fade>
        </참여방법Wrap>

    )
}
function 추후업데이트({ 참여방법Wrap }) {
    return (
        <참여방법Wrap>
            <Fade bottom>
                <div className='목차제목'>
                    <span className='highlight'>추후 업데이트 예정</span>
                </div>
                <ul className='updateList'>
                    <li>
                        매너온도에 따른 티어별 매칭
                    </li>
                    <li>
                        MBTI 조건에 따른 매칭
                    </li>
                    <li>
                        매칭 성공에 따른 이벤트 진행 예정
                    </li>
                    <li>
                        거짓 정보를 이용한 사용자 신고접수 기능 추가
                    </li>
                </ul>
                <div className='text'>
                    오로지 대학생을 위하여 출발하게된 플로스팅은<br />
                    대학생이라면 누구나 다같이 만들어가고자 모든<br />
                    피드백과 의견수렴에 대해 환영하고 있습니다<br />
                    무료 서비스인만큼 많은 참여와 의견 부탁드립니다 :)
                </div>
            </Fade>
        </참여방법Wrap>
    )
}
