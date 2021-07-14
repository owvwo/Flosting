import React, { Component, useState, useEffect } from 'react'

import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Lilac_Table from './Lilac_Table';


const Colortheme = createMuiTheme({
    palette: {
        primary: {
            main: '#E0BCC1'
        }
    },
    typography: {
        fontSize: 10,
        fontWeightRegular: 700,
        fontFamily: "Noto Sans KR"
    }

})

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;

    h1{
        font-size: 1.5rem;
    }
`;

const Usage_main = (props) => {

    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <h1>
                    내 이용내역
                </h1>
                <Lilac_Table>
                    
                </Lilac_Table>
            </Container>
        </ThemeProvider>
    );
}

export default Usage_main;