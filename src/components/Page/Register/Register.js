import React, { Component, useState, useEffect } from 'react'
import SelectSearch from 'react-select-search';
import './Searchbox.css'
import fuzzySearch from './fuzzySearch';
import { Schools } from './Schools';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    margin: 0rem 2rem;
    

    h1{
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;
const School_number = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 2rem;
`;
const School_name = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 2rem;
`;

const School_title = styled.div`
    font-size: 1.0rem;
    color: '#828282';
    margin: 0.5rem 0rem;
`;
const School_content = styled.div`
    font-size: 0.5rem;
`;
const Error_message = styled.div`
    margin-left : 0.2rem;
    font-size: 0.5rem;
    color: ${props => props.limitnum ? '#00AB6F' : '#EF0C00'};
`

const Button = styled.button`
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
  opacity: ${props => {
        if (props.disabled) return '0.5';
        else return '1.0';
      }};
  cursor: ${props => {
        if (props.disabled) return 'default';
        else return 'pointer'
      }};
`;
const Input = styled.input`
  border : ${props => props.limitnum ? '1px solid #A6A6A6' : '1px solid #EF0C00'};
  background: ${props => props.limitnum ? '#EBEBEB' : 'white'};
  color: ${props => props.limitnum ? 'black' : '#EF0C00'};
  type : text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
  border-radius: 5px;
`;


const Register = (props) => {

    const { set_S_num, set_S_name, set_auth_regis } = props

    const [limitnum, setlimitnum] = useState(false); // 학번의 제한 체크 변수
    const [limitname, setlimitname] = useState(false); // 학교의 체크 변수
    const [limitnummessasge, setlimitnummessasge] = useState("숫자로 입력해주세요.");
    const [canNext, setcanNext] = useState(true); //다음으로 갈 수 있는지 체크해주는 변수

    useEffect(() => {
        cangoNext();
    }, [limitnum])
    useEffect(() => {
        cangoNext();
    }, [limitname])

    const cangoNext = () =>{
        if(limitnum && limitname)
            setcanNext(false);
        else
            setcanNext(true);
    }
    const handleClick = () => {
        set_auth_regis(true);
    }

    const handleNumChange = (e) => {
        set_S_num(e.target.value);
        if (((e.target.value).length <= 13 && (e.target.value).length >= 8)) {
            setlimitnum(true);
        } else {
            setlimitnum(false);
        }
        if ((e.target.value).length <= 13 && (e.target.value).length >= 8) {
            setlimitnummessasge("사용가능한 학번입니다!");
        }
        else if((e.target.value).length == 0) {
            setlimitnummessasge("숫자로 입력해주세요.");
        }
        else {
            setlimitnummessasge("학번의 길이가 너무 짧아요!");
        }
    }
    const handleNameChange = (selected) => {
        set_S_name(selected);
        setlimitname(true);
    }


    return (
        <Container>
            <h1>
                플로스팅 회원가입
            </h1>
            <School_number>
                <School_title>
                    학번
                </School_title>
                <School_content>
                    ※ 년도가 아닌 8 ~ 13자리로 이루어진 본인의 고유학번을 입력해주세요.
                </School_content>
                <Input
                    limitnum={limitnum}
                    placeholder="학번을 입력하세요"
                    onChange={handleNumChange}
                />
                <Error_message limitnum = {limitnum}>
                    {limitnummessasge}
                </Error_message>

            </School_number>
            <School_name>
                <School_title>
                    학교
                </School_title>
                <SelectSearch
                    options={Schools}
                    search
                    filterOptions={fuzzySearch}
                    onChange={handleNameChange}
                    emptyMessage="Not found"
                    placeholder="학교 이름을 검색하세요."
                />
            </School_name>
            <NavLink to="/register/terms">
                <Button register onClick={handleClick} disabled = {canNext}>
                    다음
                </Button>
            </NavLink>
        </Container>
    );
}

export default Register;