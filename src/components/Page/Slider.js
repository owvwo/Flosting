import React, { Component } from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import './Slider.css';

import pic_4 from '../../images/pic_4.png';
import pic_3 from '../../images/pic_3.png';
import pic_2 from '../../images/pic_2.png';
import pic_1 from '../../images/pic_1.png';


const 글 = styled.div`
    background-color: white;
    width: 100%;
    text-align: center;
    height: 100px;
    `

const Wrap = styled.div`
  text-align : center;

  h3{
    text-align : center;
  }
  img{
    align-items: center;
    width: 100%;
    height: 100%;
  }
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

      <div className='slider'>
        <Slider {...settings}>

          <Wrap>

            <h3>
              플로스팅 Chapter.04<br />
              2021.06.23 ~ 2021.06.27<br /><br />
            </h3>

            <img className='사진' src={pic_4} />

            <글>
              참가 대학교<br />
              - 가천대(성남) : 48명<br />
              - 을지대(성남) : 198명<br />
              - 신구대 : 87명 <br /><br />
              총 참가 인원 : 333명<br />
              남학생  : 170명<br />
              여학생 : 163명<br />
            </글>

          </Wrap>

          <Wrap>
            <h3>
              플로스팅 Chapter.03<br />
              2021.05.25 ~ 2021.05.29<br /><br />
            </h3>
            <img className='사진' src={pic_3} />
            <글>
              참가 대학교<br />
              - 단국대(천안) : 382명<br />
              - 순천향대 : 422명<br /><br />
              총 참가 인원 : 804명<br />
              남학생  : 407명<br />
              여학생 : 397명<br />
            </글>
          </Wrap>

          <Wrap>
            <h3>
              플로스팅 Chapter.02<br />
              2021.05.12 ~ 2021.05.18<br /><br />
            </h3>
            <img className='사진' src={pic_2} />
            <글>
              참가 대학교<br />
              - 강남대(204명)   - 경희대(32명)<br />
              - 단국대(죽전)(230명)   - 경기대(2명)<br />
              - 을지대(성남)(50명)    - 가천대(10명)<br /><br />
              총 참가 인원 : 501명<br />
              남학생  : 257명<br />
              여학생 : 244명<br />
            </글>
          </Wrap>

          <Wrap>
            <h3>
              플로스팅 Chapter.01<br />
              2021.03.22 ~ 2021.03.27<br />
            </h3>
            <img className='사진' src={pic_1} />
            <글>
              참가 대학교<br />
              - 강남대학교<br />
              - 단국대학교 죽전캠퍼스<br /><br />
              총 참가 인원 : 381명<br />
              남학생  : 192명<br />
              여학생 : 189명<br />
            </글>
          </Wrap>
        </Slider>
      </div>
    );
  }
}