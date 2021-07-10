import React from 'react';
import styled, { withTheme } from 'styled-components';
import { NavLink } from 'react-router-dom';

//카테고리별
const ContentDiv = styled.div`
  display: flex;
  border-bottom : 1px solid rgb(0,0,0, 0.05);
  border-left : 1px solid rgb(0,0,0, 0.0.5);;
`;
//Content오른쪽
const RightContentDiv = styled.div`
  flex-grow : 1;
`;

//빈 공간 만들기
const BlankDiv = styled.div`
  height : 50vh;
`
//한줄
const RowDiv = styled.div` 
  display: flex;
  justify-content : space-between;
  flex-direction : row;
  flex-grow : 1;
`;
const RowParrent = styled.div`
  color: rgb(0,0,0, 0.7);
  background : #F5E9E9;
  text-align : center;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  width: 75px;
  padding: 15px 0px;
`
const Ul = styled.ul`
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li{
    padding: 15px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background: white;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    opacity: ${({ open }) => open ? '1.0' : '0.8'};
    top: 0;
    right: 0;
    max-height: 90vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    a {
      flex-grow : 3;
    }
    li {
      font-family: 'Noto Sans KR', sans-serif;
      font-weight: 400;
      text-align: right;
      font-size: 1rem;
    }
  }
`;




const RightNav = (props) => {

  const activeStyle = {
    color: '#2B2A28',
    background: '#F2F2F2'
  };
  const noneactiveStyle = {
    textDecoration: 'none',
    color: '#2B2A28'
  }

  return (
    <Ul open={props.open}>
      {/* 위에 테두리 */}
      <ContentDiv>
      </ContentDiv>
      <ContentDiv>
        <RowDiv>
          <NavLink exact={true} to="/" activeStyle={activeStyle} style={noneactiveStyle}>
            <li onClick={() => props.setOpen(!props.open)}>
              홈
            </li>
          </NavLink>
        </RowDiv>
      </ContentDiv>
      <ContentDiv>
        <RowDiv>
          <RowParrent>
            회원
          </RowParrent>
          <NavLink to="/my" activeStyle={activeStyle} style={noneactiveStyle}>
            <li onClick={() => props.setOpen(!props.open)}>
              마이페이지
            </li>
          </NavLink>
        </RowDiv>
      </ContentDiv>
      <ContentDiv>
        <RowParrent>
          플로스팅
        </RowParrent>
        <RightContentDiv>
          <RowDiv>
            <NavLink to="/submit" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                플로스팅 신청
              </li>
            </NavLink>
          </RowDiv>
          <RowDiv>
            <NavLink to="/confirm" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                플로스팅 확인
              </li>
            </NavLink>
          </RowDiv>
          <RowDiv>
            <NavLink to="/account" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                결제 안내
              </li>
            </NavLink>
          </RowDiv>
          <RowDiv>
            <NavLink to="/history" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                플로스팅 역사
              </li>
            </NavLink>
          </RowDiv>
          <RowDiv>
            <NavLink to="/about" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                제작 기획
              </li>
            </NavLink>
          </RowDiv>
        </RightContentDiv>
      </ContentDiv>
      <ContentDiv>
        <RowParrent>
          이벤트
        </RowParrent>
        <RightContentDiv>
          <RowDiv>
            <NavLink to="/submit" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                진행중인 이벤트
              </li>
            </NavLink>
          </RowDiv>
        </RightContentDiv>
      </ContentDiv>
      <ContentDiv>
        <RowParrent>
          문의
        </RowParrent>
        <RightContentDiv>
          <RowDiv>
            <NavLink to="/ad" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                광고 문의
              </li>
            </NavLink>
          </RowDiv>
          <RowDiv>
            <NavLink to="/ad" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                오프라인 문의
              </li>
            </NavLink>
          </RowDiv>
          <RowDiv>
            <NavLink to="/ad" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                신고 접수
              </li>
            </NavLink>
          </RowDiv>
        </RightContentDiv>
        <BlankDiv>
        
        </BlankDiv>
      </ContentDiv>
    </Ul>
  )
}

export default RightNav