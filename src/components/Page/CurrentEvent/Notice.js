import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  .안내사항_제목 {
    font-weight: bold;
    color: red;
  }
  .안내사항_내용 {
    font-size: 0.8rem;
    text-align: center;
    margin-left: 1rem;
  }
  .highlight {
    box-shadow: inset 0 -20px 0 #fbf38a;
  }
`;
const Notice = () => {
  return (
    <Container>
      <div>
        <div className="안내사항_제목">
          <span className="highlight">※당부 메세지※</span>
        </div>
        <div className="안내사항_내용">
          신청기간을 엄수해 주시기 바랍니다.
          <br />
          모든 매칭 결과는 '문자 메세지'로 발송됩니다.
          <br />
          결과메세지를 못 받으신 분들은 아래 두 가지 확인부탁드립니다.
          <br />
          - 통신사 스팸 필터링 서비스 가입
          <br />
          - 아이폰의 경우 데이터가 켜져있는지
          <br />
          <br />
          결과발송일이 지났음에도 결과를 수신하지 못하신 분들은
          <br />
          카카오채널로 문의 주시면 결과 안내 도와드리겠습니다.
          <br />
        </div>
      </div>
    </Container>
  );
};

export default Notice;
