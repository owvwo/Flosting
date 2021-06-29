import React, {Component, useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch, useLocation } from "react-router-dom";
import {NavLink} from 'react-router-dom'


import { MDBContainer,   MDBInput } from 'mdbreact';
import styled from 'styled-components';
import { render } from '@testing-library/react';

const Container = styled.div`

    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const FlostingTitle = styled.div`
    font-family: 'Lobster', cursive;
    font-size: 40px;
    border: 1.5px solid;
    padding: 5px;
    margin: 5px;
    margin-bottom: 4.0rem;
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
  font-size: 15pt;
`;
const Input = styled.input.attrs(props => ({
    type: "text",
  }))`
    line-height: 3rem;
    padding: 5px;
    margin: 5px;
    height: 3rem;
    width: 300px;
    font-size: 1rem;
    border: 2px solid #E0BCC1;
    border-radius: 5px;
  
    /* here we use the dynamically computed prop */
    margin: ${props => props.size};
    padding: ${props => props.size};
`;

const Loginbar = () => {
    return(
        <MDBContainer>
            <Input placeholder="학번"  />
            <Input placeholder="비밀번호" />
            <Button register>
                로그인
            </Button>
        </MDBContainer>
    );
}
class Login extends Component{

    state = {
        currentPage : null
    }
    
    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    render(){

        return(
            <MDBContainer>
                <Container>
                    <FlostingTitle>
                        Flosting
                    </FlostingTitle>
                    {this.state.currentPage === null ? (
                        <MDBContainer>
                            <Button login onClick = {() => this.handlePageChange(false)}>
                                로그인
                            </Button>
                            <Button register>
                                회원가입
                            </Button>
                        </MDBContainer>
                    ) : (
                        <Loginbar />
                    )
                    }
                </Container>
            </MDBContainer>
        );
    }
}


export default Login;