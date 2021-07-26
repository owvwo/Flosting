import React, {useState, useEffect} from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

const Container = styled.div`

`

const 제목 = styled.div`
font-size : 2rem;
text-align : center;
margin-top: 2rem;
font-weight : bolder
`
const 요소wrap = styled.div`
margin-top: 15px;
text-align : center;
`
const 요소btn = styled.button`
color:#9F34AD;
padding: 5px;
width: 15rem;
border-radius: 15px;
border : 2px solid #C2679D;
background-color:rgb(255,180,224,0.3)
`

function QnaMain(){
    return(
        <Container>
            <Title 제목={제목}/>
            <Fade up><NavLink to ='/answer1'><요소1 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Fade>
            <Fade up><NavLink to ='/answer2'><요소2 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Fade>
            <Fade up><NavLink to ='/answer3'><요소3 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Fade>
            <Fade up><NavLink to ='/answer4'><요소4 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Fade>
            <Fade up><NavLink to ='/answer5'><요소5 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Fade>
            <Fade up><NavLink to ='/answer6'><요소6 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Fade>
            <Fade up><NavLink to ='/answer7'><요소7 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Fade>
            <Fade up><NavLink to ='/answer8'><요소8 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Fade>
        </Container>
    )
}
export default QnaMain;

function Title({제목}){
    return(
        <제목>그만 좀 처 물어보셈</제목>
    )
}

function 요소1({요소wrap, 요소btn}){
    return(
        <요소wrap>
            <요소btn>
                매칭결과는 언제 나오나요?
            </요소btn>
        </요소wrap>
    )
}
function 요소2({요소wrap, 요소btn}){
    return(
        <요소wrap>
            <요소btn>
                신청내역을 수정하고 싶어요!
            </요소btn>
        </요소wrap>
    )
}
function 요소3({요소wrap, 요소btn}){
    return(
        <요소wrap>
            <요소btn>
                그만 좀 처 물어보면 좋겠다 3번
            </요소btn>
        </요소wrap>
    )
}
function 요소4({요소wrap, 요소btn}){
    return(
        <요소wrap>
            <요소btn>
                그만 좀 처 물어보면 좋겠다 4번
            </요소btn>
        </요소wrap>
    )
}
function 요소5({요소wrap, 요소btn}){
    return(
        <요소wrap>
            <요소btn>
            그만 좀 처 물어보면 좋겠다 5번
            </요소btn>
        </요소wrap>
    )
}
function 요소6({요소wrap, 요소btn}){
    return(
        <요소wrap>
            <요소btn>
            그만 좀 처 물어보면 좋겠다 6번
            </요소btn>
        </요소wrap>
    )
}
function 요소7({요소wrap, 요소btn}){
    return(
        <요소wrap>
            <요소btn>
            그만 좀 처 물어보면 좋겠다 7번
            </요소btn>
        </요소wrap>
    )
}
function 요소8({요소wrap, 요소btn}){
    return(
        <요소wrap>
            <요소btn>
            그만 좀 처 물어보면 좋겠다 8번
            </요소btn>
        </요소wrap>
    )
}

