import React from 'react';
import styled from 'styled-components'
import Footer from './Footer.js'
import SNSLink from './SNSLink.js'


const Container=styled.div`
font-family: 'Noto Sans KR', sans-serif;

`
const AboutUsWrap=styled.div`
text-align: center;
    .title{
        font-size : 1.8rem;
        text-align : center;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight : bolder

    }
    .text{
        padding-right: 15px;
        padding-left: 15px;
    }
`

const AdWrap = styled.div`
text-align: center;
    .title{
        font-size : 1.8rem;
        text-align : center;
        margin-top: 3.5rem;
        margin-bottom: 1rem;
        font-weight : bolder
    }

`
const About=()=>{
    return(
        <Container>
            <AboutUs AboutUsWrap={AboutUsWrap}/>
            <Ad AdWrap={AdWrap}/>
            <SNSLink/> 
            <Footer/>
        </Container>
    );
};
export default About;

function AboutUs({AboutUsWrap}){
    return(
        <AboutUsWrap>
            <div className='title'>
                제작기획
            </div>
            <div className='text'>
                코로나19로 인해 학교를 가지 못하고 있는 현 상황에,
                새로운 사람들을 만나 인연을 시작해 보고 싶어하는
                여러분들의 바램으로 플로스팅 기획을 시작했습니다.<br/>

                간단한 신청방법과 무료로 진행되는 플로스팅으로
                연인뿐만 아니라 친구도 만들 수 있어 다양한 만남을
                통해 삶에 활기를 되찾으셨으면 좋겠습니다.
            </div>
        </AboutUsWrap>
    )
}

function Ad({AdWrap}){
    return(
        <AdWrap>
            <div className='title'>
                광고 및 제휴 / 후원 문의
            </div>
            <div className='text'>
                모든 분들의 문의 환영입니다 :)<br/>
                아래 링크를 통해 문의주시면 감사하겠습니다!<br/>
                - 대학교 앞 상권의 홍보, 광고<br/>
                - 학교, 캠퍼스 간 이벤트를 기획중인 학생회 등<br/><br/>

                더불어, 무료로 진행되는 플로스팅의 <br/>
                도메인 호스팅, 서버 유지, 개발 비용 등<br/>
                비용이 발생하는 부분에 있어서<br/>
                후원을 간절히 기다리고있습니다.

            </div>

        </AdWrap>
    )
}


