import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Certification from './Register/Certification'
import logo from '../../images/giphy.gif'
import './Home.css';
import { NavLink } from "react-router-dom";
import Footer from './Footer';
import logoimg from '../../images/플로스팅 로고.png'
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import 참여방법Slider from './HowToSubmitSlider.js'
import 데이지배경 from '../../images/daisy.png'
import 라일락배경 from '../../images/lilac.png'
import 클로버배경 from '../../images/clover.png'

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
// background-color: rgb(215,174,232,0.2);
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
`

const CurrentButton = styled.button`
    font-size: 2rem;
    background-color: rgb(179,214,189,0.2);
    color: white;
    border: rgb(179,214,189,0.3);
    width: 14rem;
    border-radius: 12px;
    padding: 5px;
    &:hover{
        background-color:white;
        color: yellow;
    }
`



const Home = () =>{
    let[버튼타이머,버튼타이머변경] = useState(false);


    useEffect(()=>{
        setTimeout(function(){
            버튼타이머변경(true);
        },3000)
    })


    return(
        <Container>
            <Jumbotron CurrentButton={CurrentButton} 버튼타이머={버튼타이머} />
            <WhatIsFlosting WhatIsFlostingWrap={WhatIsFlostingWrap}/>  
            <div className='parent'>
                <LilacTing LilacTingWrap={LilacTingWrap}/>
                <DaisyTing DaisyTingWrap={DaisyTingWrap}/>
                <CloverTing CloverTingWrap={CloverTingWrap}/>
            </div>   
            <참여방법 참여방법Wrap={참여방법Wrap}></참여방법>
            <Footer></Footer>
        </Container>

    );
};


function Jumbotron({CurrentButton, 버튼타이머}){
    return (
        <div className='jb_wrap'>
            <div className='jb_gif'>
                <img src={logo} className='logogif' />
            </div>

            {
            버튼타이머 === true
            ? <div className='jb_link'>
                <NavLink to='/currentevent'>
                    <CurrentButton>현재 진행 중</CurrentButton>
                </NavLink>
              </div>

            : null
            }

        </div>
    )
}

function WhatIsFlosting({WhatIsFlostingWrap}){

    return(
        <WhatIsFlostingWrap>
            <Fade bottom>
                <div className='intro_title'>Flosting이란?</div>
            </Fade>
            <Flip left>
                <div className='logoimg_wrap'>
                    <img src={logoimg} className='logoimg'/>
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

function DaisyTing({DaisyTingWrap}){

    return(
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
                    <img src={데이지배경}/>
                </div>

            </Fade>
        </DaisyTingWrap>

    )
}
function CloverTing({CloverTingWrap}){

    return(
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
                    <img src={클로버배경}/>
                </div>

            </Fade>
        </CloverTingWrap>

    )
}

function LilacTing({LilacTingWrap}){

    return(
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
                    <img src={라일락배경}/>
                </div>

            </Fade>
        </LilacTingWrap>

    )
}

function 참여방법({참여방법Wrap}){
    return(
        <Fade bottom>
            <참여방법Wrap>
                <div className='참여방법제목'>
                    참여방법
                </div>
                <div className='silderDiv'>
                    <참여방법Slider />
                </div>
            </참여방법Wrap>
        </Fade>
    )
}

export default Home;
