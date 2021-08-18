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
.Container입금안내{
background: rgb(209,240,228,0.8);
border-radius: 25px;
margin-left: 1rem;
margin-right: 1rem;
margin-bottom: 1rem;
}
.Container안내사항{
background: rgb(246,248,211,0.8);
border-radius: 25px;
margin-left: 1rem;
margin-right: 1rem;
margin-bottom: 1rem;
}
.subtitle{
    font-size: 1.5rem;
    font-weight : bolder;
    margin-bottom: 0.3rem;
}
.account{
    font-weight : bolder;
    margin-bottom: 0.5rem;
}
.accountText{
    text-align:left;
    margin-bottom: 0.3rem;
    font-size: 0.8rem;
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

                플로스팅에 참여해주셔서 진심으로 감사드립니다 :)<br /><br />

                <section className='Container입금안내'>
                    <div className='subtitle'>
                        💸입금 계좌번호 안내💸
                    </div>

                    <div className='account'>
                        농협 356-1499-7855-83 이상민(플로스 컴패니)
                    </div>

                    <ul style={{ listStyle: "none" }}>
                        <li className='accountText'>
                            🙏미입금자는 참가신청이 자동 취소됩니다.
                        </li>
                        <li className='accountText'>
                            🙏입금자명을 꼭 신청자 본인 성함으로 보내주셔야 확인이 가능합니다.
                        </li>
                        <li className='accountText'>
                            🙏입금확인이 이루어지기 전에는 취소 및 수정이 가능하지만 확인이 완료된 이후에는 불가능합니다.
                        </li>
                        <li className='accountText'>
                            🙏입금 후 24시간이 지나도 입금상태가 바뀌지 않는다면 문의주시기 바랍니다.
                        </li>
                    </ul>
                </section>

                <section className='Container안내사항'>
                    <div className='subtitle'>
                        ❗안내사항❗
                    </div>
                    <ul style={{ listStyle: "none" }}>
                        <li className='accountText'>
                            ✔️'메뉴' > '일정 안내' 탭에서 각 학교별 일정을 확인 후 발표일에 맞춰 플로스팅에 접속하시면 결과를 확인하실 수 있습니다.
                        </li>
                        <li className='accountText'>
                            ✔️'메뉴' > '마이페이지' > '최근신청' 탭에서 본인의 신청 내역, 금액, 입금확인 상태, 신청 취소를 하실 수 있습니다.
                        </li>
                    </ul>
                </section>


                <section>
                    더불어, 저희 플로스팅 카카오톡 채널 친구추가,<br />
                    인스타그램 팔로우를 해주시면 회차별 정보와 공지사항<br />
                    그리고 다음 회차 정보까지 보실 수 있습니다!<br /><br />

                    저희 플로스팅은 모두가<br />
                    좋은 인연을 찾기를 항상 응원합니다.
                    <SNSLink />
                </section>
            </div>
            <Footer />
        </Wrapper>
    );
};

export default Confirm;