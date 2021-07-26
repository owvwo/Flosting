import React, { useEffect } from 'react';
import styled from 'styled-components'
import SNSLink from './SNSLink.js'
import Footer from './Footer.js'

const Wrapper = styled.div`
text-align: center;
.text{
    margin-top:1.5rem;
    margin-bottom: 1.5rem;
}
`

const Title = styled.div`
font-size : 2rem;
text-align : center;
margin-top: 2rem;
font-weight : bolder
`

const Confirm = () => {
    return (
        <Wrapper>
            <Title>신청이 완료되었습니다!!!</Title>
            <div className='text'>

                플로스팅 신청이 완료되었습니다!!<br />
                각 학교별 매칭 결과 발표일을 꼭 기억하셔서<br />
                발표일에 맞춰 플로스팅에 접속하시면 <br />
                결과를 확인하실 수 있습니다<br /><br />

                더불어, 저희 플로스팅 카카오톡 채널 친구추가,<br />
                인스타그램 팔로우를 해주시면 회차별 정보와 공지사항<br />
                그리고 다음 회차 정보까지 보실 수 있습니다!<br /><br />

                저희 플로스팅은 모두가<br />
                좋은 인연을 찾기를 항상 응원합니다.<br />
            </div>
            <SNSLink />
            <Footer />
        </Wrapper>
    );
};

export default Confirm;