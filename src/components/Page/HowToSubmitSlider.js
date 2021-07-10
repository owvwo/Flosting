import React, { Component } from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import './Home.css';

import pic_4 from '../../images/pic_4.png';
import pic_3 from '../../images/pic_3.png';
import pic_2 from '../../images/pic_2.png';
import pic_1 from '../../images/pic_1.png';


const Wrap = styled.div`
  margin-top : 20px;
  text-align : center;

  h3{
    text-align : center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  img{
    align-items: center;
    width: 100%;
    height: 100%;
  }
`





export default class 참여방법Slider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (

      <div className='slider'>
        <Slider {...settings}>

          <Wrap>

            <h3>
              STEP 1
            </h3>

            <img className='사진' src={pic_4} />
            <div>
              로그인하고
            </div>
          </Wrap>

          <Wrap>
            <h3>
              STEP 2
            </h3>
            <img className='사진' src={pic_3} />
            <div>
              참가신청서 작성
            </div>

          </Wrap>

          <Wrap>
            <h3>
              STEP 3
            </h3>
            <img className='사진' src={pic_2} />
            <div>
              지급받기까지 존버하기
            </div>

          </Wrap>

          <Wrap>
            <h3>
              STEP 4
            </h3>
            <img className='사진' src={pic_1} />
            <div>
              달달한 후기 들려줘
            </div>

          </Wrap>
        </Slider>
      </div>
    );
  }
}