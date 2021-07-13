import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    margin-top: 20px;
`
const BackgroundBar = styled.div`
    border-radius: 0.5rem;
    background: rgb(0,0,0, 0.13);
    height: 0.8rem;
    width: 100%;

`

const NowMannerBar = styled.div`
    border-radius: 0.5rem;
    background: rgb(157,187,235, 0.8);
    height: 0.8rem;
    width: ${props => props.temperature + '%'};
`

const MannerBar = () => {

    const [open, setOpen] = useState(false);

    const nowtemp = 36.5;

    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <Container>
            <BackgroundBar>
                <NowMannerBar temperature = {36.5}>

                </NowMannerBar>
            </BackgroundBar>
        </Container>
    );
};

export default MannerBar;