import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components';

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    margin: 0rem 2rem;
    

    h1{
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;

function Register({auth_regis}) {

    if(!auth_regis) return <Redirect to='/register' />;

    return (
        <Container>
        <h1>
            약관 동의아ㅏㅏㅏㅏㅏㅏ
        </h1>
    </Container>
    );
}

export default Register;