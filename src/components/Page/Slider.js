import React, { Component } from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import pic_1 from '../../images/pic_1.png';
import pic_2 from '../../images/pic_2.png';
import pic_3 from '../../images/pic_3.png';
import pic_4 from '../../images/pic_4.png';
import Example from './Graph2.js';

const Wrap = styled.div`
    width: 80%;
    img{
      text-align : center;
      width: 150px;
      height: 150px;
    }
    p{
      text-align : center;
      margin-top: 15px;
    }
    `
const 쌈 = styled.div
`
margin : 5px;
`

    


export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <쌈>
        <Slider {...settings}>

          <Wrap>
            <img src={pic_4}/>
            <p>학교 비율</p>
            <Example/>
            <p>남여 성비</p>
          </Wrap>

          <Wrap>
            <img src={pic_3}/>
            <p>학교 비율</p>
            <p>남여 성비</p>
          </Wrap>

          <Wrap>
            <img src={pic_2}/>
            <p>학교 비율</p>
            <p>남여 성비</p>
          </Wrap>

          <Wrap>
            <img src={pic_1}/>
            <p>학교 비율</p>
            <p>남여 성비</p>
          </Wrap>


        </Slider>
      </쌈>
    );
  }
}