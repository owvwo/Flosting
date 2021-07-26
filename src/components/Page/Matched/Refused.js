import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../Footer';

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .ProfileWrap{
        display: flex;
    }
    .text{
        height: 30rem;
        text-align: center;
        margin-top: 4rem;
        font-size: 1.2rem;
    }

`

const TitleWrap = styled.div`
color: white;
background-color: grey;
width: 20rem;
font-size : 2rem;
text-align : center;
margin-top: 2rem;
font-weight : bolder
`

function Refused(){

    return(
        <Container>
            <Title/>
            <div className='text'>
                상대방께서 사정에 의해 <br/>
                거절 의사를 표하여 <br/>
                매칭이 종료되었습니다.<br/>
                저희 플로스팅이<br/>
                다음 매칭에 더 힘쓰도록 하겠습니다<br/>

            </div>
            <Footer/>
        </Container>
    )
}
export default Refused;


function Title(){
    return(
        <TitleWrap>
            매칭 종료
        </TitleWrap>
    )
}

