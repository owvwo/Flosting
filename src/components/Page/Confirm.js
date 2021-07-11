import React from 'react';
import styled from 'styled-components'
import SNSLink from './SNSLink.js'
import Footer from './Footer.js'



const Wrapper = styled.div`
  text-align: center;

  p{
      font-size: 1.0rem;
      padding: 5px;
  }
  .red{
      color: red;
      font-weight: bold;
  }`

const Title = styled.div
`
font-size : 1.4rem;
`

const Confirm = () => {
    return (
        <Wrapper>
            <Title>신청이 완료되었습니다!!!</Title>

            <p className='red'>
                번호 뽑기를 1개 이상 희망하신 분들은<br />
                농협 356-1499-7855-83 플로스 컴패니 로 입금 후<br />
                카카오톡 플러스 친구 '플로스팅'으로<br />
                입금내역을 캡쳐하여 보내주시면<br />
                입금 확인 완료 알림 및 신청 접수 완료<br />
                알림을 보내 드리도록 하겠습니다.<br />
            </p>
            <p>
                7월 3일 토요일 00시 이전까지<br />
                입금이 이루어지지 않을 경우<br />
                번호가 지급되지 않을 예정이므로,<br />
                접수 및 신청 기간을 준수해주세요!<br /><br />

                더불어, 저희 플로스팅 카카오톡 채널 친구추가,<br />
                인스타그램 팔로우를 해주시면 회차별 정보와 공지사항<br />
                그리고 다음 회차 정보까지 보실 수 있습니다!<br /><br />

                플로스팅을 통해 만나게 되는 이성 혹은 동성과<br />
                새로운 인연을 시작해보세요.<br />
                저희 플로스팅은 학생 여러분 모두가<br />
                좋은 인연을 찾기를 항상 응원합니다.<br />
            </p>
            <SNSLink />
            <Footer />
        </Wrapper>
    );
};

export default Confirm;