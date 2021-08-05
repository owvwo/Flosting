import React, {useState, useEffect} from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Footer from '../Footer.js'

const 제목 = styled.div`
font-size : 2rem;
text-align : center;
margin-top: 1rem;
font-weight : bolder
`

const Container = styled.div`
margin-top: 15px;
margin-bottom: 5rem;
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;


.질문{
    margin-top: 1rem;
    color: black;
    padding: 5px;
    width: 21rem;
    height: 3rem;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border : 1px solid rgb(255,180,224,0.8);
    background-color:rgb(255,255,255,1);
    font-weight: 700;
}
.답변박스{
    text-align : center;

}
.footer{
    margin-top: 1rem;
}
`
const 답변Container = styled.div`

margin: 0 auto;
text-align : center;
font-weight : bolder
padding: 5px;
width: 21rem;
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;
background-color:rgb(255,180,224,0.2);
    .content{
        padding : 5px 0px;
        font-size: 0.8rem;
    }
`

function QnaMain(){
    let [클릭1번, 클릭1번변경] = useState(false);
    let [클릭2번, 클릭2번변경] = useState(false);
    let [클릭3번, 클릭3번변경] = useState(false);
    let [클릭4번, 클릭4번변경] = useState(false);
    let [클릭5번, 클릭5번변경] = useState(false);
    
    function onClickOne(){
        클릭1번변경(!클릭1번)
    }
    function onClickTwo(){
        클릭2번변경(!클릭2번)
    }
    function onClickThree(){
        클릭3번변경(!클릭3번)
    }
    function onClickFour(){
        클릭4번변경(!클릭4번)
    }
    function onClickFive(){
        클릭5번변경(!클릭5번)
    }

    return(
        <div>
        <Container>

            <Title 제목={제목}/>
            
            <button className='질문' onClick={onClickOne} >매칭 결과는 언제 나오나요?</button>
                {
                클릭1번 === true
                ? 
                <Fade top>
                    <div className='답변박스'>
                        <답변1 답변Container={답변Container}/>
                    </div>
                </Fade>
                : 
                null
                }

            <button className='질문' onClick={onClickTwo} >신청 내역을 확인/수정하고 싶어요!</button>
                {
                클릭2번 === true
                ? 
                <Fade top>
                <div className='답변박스'>
                    <답변2 답변Container={답변Container}/>
                </div>
                </Fade>
                : 
                null
                }

            <button className='질문' onClick={onClickThree} >매칭에 실패된 기준은 무엇인가요?</button>
                {
                클릭3번 === true
                ? 
                <Fade top>
                <div className='답변박스'>
                    <답변3 답변Container={답변Container}/>
                </div>
                </Fade>
                : 
                null
                }

            <button className='질문' onClick={onClickFour} >다음 회차는 언제 진행되나요?</button>
                {
                클릭4번 === true
                ? 
                <Fade top>
                <div className='답변박스'>
                    <답변4 답변Container={답변Container}/>
                </div>
                </Fade>
                : 
                null
                }

            <button className='질문' onClick={onClickFive} >플로스팅은 학교에서 만든건가요?</button>
                {
                클릭5번 === true
                ? 
                <Fade top>
                <div className='답변박스'>
                    <답변5 답변Container={답변Container}/>
                </div>
                </Fade>
                : 
                null
                }
        </Container>
        <Footer/>
        </div>
    )
}
export default QnaMain;

function Title({제목}){
    return(
        <제목>자주 묻는 질문</제목>
    )
}

function 답변1({답변Container}){
    return(
        <답변Container>
            <div className='content'>
                A <br/>최종 신청이 마감된 다음날부터 매칭이 진행되며,<br/>
                매칭 완료 후, 홈페이지에서 결과를 <br/>확인하실 수 있습니다.
            </div>
        </답변Container>
    )
}
function 답변2({답변Container}){
    return(
        <답변Container>
            <div className='content'>
                A   <br/> 마이페이지 - 최근 신청 내역<br/>
                신청 취소 후 다시 신청 하시면 수정이 가능합니다.<br/>
                (단, 해당 회차가 신청기간일 경우에만 <br/>취소가 가능합니다.)
            </div>
        </답변Container>
    )
}
function 답변3({답변Container}){
    return(
        <답변Container>
            <div className='content'>
                A <br/> 1대1일 매칭일 경우 성비 불균형에 따라<br/> 매칭 실패가 발생할 수 있습니다.
            </div>
        </답변Container>
    )
}
function 답변4({답변Container}){
    return(
        <답변Container>
            <div className='content'>
                A <br/> 다음 회차에 대한 일정은 항상 변동될 수 있기<br/> 때문에 미리 안내해 드리지 않고 있습니다 :)
            </div>
        </답변Container>
    )
}
function 답변5({답변Container}){
    return(
        <답변Container>
            <div className='content'>
                A <br/>저희 플로스팅은 여러 대학교 학생들이 <br/>코로나로 인해 학교를 가지 못하는 대학생들을 위해 <br/>기획하게 된 창업 이벤트 업체입니다.
            </div>
        </답변Container>
    )
}

