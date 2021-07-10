import React from 'react';
import styled from 'styled-components';
import Footer from './Footer.js';
import SimpleSlider from './Slider.js';

const Container = styled.div`
text-align:center;

    .title{
        margin-top: 15px;
        font-size: 2rem;
        font-weight: bolder;
    }
    .sliderDiv{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`


const History = () =>{
    return(
        <Container>
            <div className='title'>히스토리</div>
            <div className='sliderDiv'>
                <SimpleSlider/>
            </div>
            <Footer/>
        </Container>
    );
};

export default History;