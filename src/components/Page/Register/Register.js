import React, { Component, useState } from 'react'
import SelectSearch from 'react-select-search';
import './Searchbox.css'
import fuzzySearch from './fuzzySearch';
import {Schools } from './Schools';
import styled from 'styled-components';
import{NavLink} from 'react-router-dom';

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
const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 5px;
  border: ${props => {
    if (props.register) return 'none';
    else if(props.login) return '1px solid #E0BCC1';
  }};
  border-radius: 5px;
  height: 3rem;
  width: 300px;
  background-color: ${props => {
    if (props.register) return '#E0BCC1';
    else if(props.login) return '#FFFFFF';
  }};
  color: ${props => {
    if (props.register) return '#FFFFFF';
    else if(props.login) return '#828282';
  }};
`;
const Input = styled.input`
  border : 1px solid #A6A6A6;
  background: #EBEBEB;
  type : text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
  border-radius: 5px;
`;


class Register extends Component {

    state = {   
        S_num : "123",
        S_name : ""
    }

    handleClick = () => {
        this.props.set_auth_regis(true);
    }
    
    handleNumChange = (e) =>{
        this.props.set_S_num(e.target.value)
    }

    render() {
        const {handleClick, handleNumChange} = this;

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
                        placeholder="학번을 입력하세요"
                        onChange = {handleNumChange} 
                        />

                </School_number>
                <School_name>
                    <School_title>
                        학교
                    </School_title>
                    <SelectSearch
                        options={Schools}
                        search
                        filterOptions={fuzzySearch}
                        onChange ={(selected) => this.props.set_S_name(selected)}
                        emptyMessage="Not found"
                        placeholder="학교 이름을 검색하세요."
                    />
                </School_name>
                <NavLink to="/register/terms">
                    <Button register onClick={handleClick}>
                        다음
                    </Button>
                </NavLink>
            </Container>
        );
    }
}
// function Register({set_auth_regis}) {

//     const handleClick = () =>{
//         set_auth_regis(true);
//     }
    
    
//     return (
//         <Container>
//             <h1>
//                 플로스팅 회원가입
//             </h1>
//             <School_number>
//                 <School_title>
//                     학번
//                 </School_title>
//                 <School_content>
//                     ※ 년도가 아닌 8 ~ 13자리로 이루어진 본인의 고유학번을 입력해주세요.
//                 </School_content>
//                 <Input 
//                 placeholder="학번을 입력하세요"/>

//             </School_number>
//             <School_name>
//                 <School_title>
//                     학교
//                 </School_title>
//                 <SelectSearch
//                     options={Schools}
//                     search
//                     filterOptions={fuzzySearch}
//                     emptyMessage="Not found"
//                     placeholder="학교 이름을 검색하세요."
//                 />
//             </School_name>
//             <NavLink to="/register/terms">
//                 <Button register onClick={handleClick}>
//                     다음
//                 </Button>
//             </NavLink>
//         </Container>
//     );
// }

export default Register;