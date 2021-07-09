import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    margin: 0rem 2rem;
    

    h1{
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
`;
const RegButton = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 5px;
  border: ${props => {
        if (props.register) return 'none';
        else if (props.login) return '1px solid #E0BCC1';
    }};
  border-radius: 5px;
  height: 3rem;
  width: 300px;
  background-color: ${props => {
        if (props.register) return '#E0BCC1';
        else if (props.login) return '#FFFFFF';
    }};
  color: ${props => {
        if (props.register) return '#FFFFFF';
        else if (props.login) return '#828282';
    }};
`;

const School_title = styled.div`
    font-size: 1.0rem;
    color: '#828282';
    margin: 0.5rem 0rem;
    background: #FFEBF1;
`;
const Short_content = styled.div`
    font-size: 0.8rem;
`
const Info_Container = styled.div`
    display: flex;
    justify-content : center;
    align-items : center;
`


const SuccessRegister = (props) => {
    const {ID, Nickname, School_name} = props
    return (
        <div>
            <Container>
                <h1>
                    회원가입 완료
                </h1>
                <p>플로스팅에 가입해주셔서 감사합니다.</p>
                <Short_content>
                    아래는 회원가입하신 정보입니다.
                </Short_content>

                <School_title>
                    ID(학번)
                </School_title>
                <Short_content>
                    {ID}
                </Short_content>
                <School_title>
                    닉네임
                </School_title>
                <Short_content>
                    {Nickname}
                </Short_content>
                <School_title>
                    학교
                </School_title>
                <Short_content>
                    {School_name}
                </Short_content>
                <NavLink to='/'>
                    <RegButton register>
                        홈으로 이동
                    </RegButton>
                </NavLink>
            </Container>
        </div>
    );
};

export default SuccessRegister;