import React from 'react';
import styled from 'styled-components';
import Footer from './Footer.js';
import SimpleSlider from './Slider.js';

const Wrap = styled.div`
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 5px;
    text-align : center;
    `
const 사진 = styled.div`
    background-color: grey;
    width: 50%;
    text-align:center;
    img{
        height: 100%;
        width: 100%;
    }
    `
const 글 = styled.div`
    background-color: white;
    width: 50%;
    text-align: center;
    border: 1px solid black;
    `


const History = () =>{
    return(
        <div>
            <h1 style={{textAlign: 'center', margin:"15px"}}>히스토리</h1>
            <SimpleSlider/>

            {/* <Wrap>
                <사진>
                    <img src={pic_4}/>
                </사진>   
                <글>
                
                    플로스팅 Chapter.04<br/>
                    2021.06.23 ~ 2021.06.27<br/><br/>

                    참가 대학교<br/>
                    - 가천대(성남) : 48명<br/>
                    - 을지대(성남) :198명<br/>
                    - 신구대 :87명 <br/><br/>

                    총 참가 인원 : 333명<br/>
                    남학생  : 170명<br/>
                    ​여학생 : 163명<br/>
                </글>
            </Wrap>
            <Wrap>
                <사진>
                    <img src={pic_3}/>
                </사진>   
                <글>
                    플로스팅 Chapter.03<br/>
                    2021.05.25 ~ 2021.05.29<br/><br/>
                
                    참가 대학교<br/>
                    - 단국대학교 천안캠퍼스(382명)<br/>
                    - 순천향대학교(422명)<br/><br/>
                    
                    총 참가 인원 : 804명<br/>
                    남학생  : 407명<br/>
                    ​여학생 : 397명<br/>
                </글>
            </Wrap>
            <Wrap>
                <사진>
                    <img src={pic_2}/>
                </사진>   
                <글>
                    플로스팅 Chapter.02<br/>
                    2021.05.12 ~ 2021.05.18<br/><br/>

                    참가 대학교<br/>
                    - 강남대학교(204명)   - 경희대학교(32명)<br/>
                    - 단국대학교(230명)   - 경기대학교(2명)<br/>
                    - 을지대학교(50명)    - 가천대학교(10명)<br/>

                    총 참가 인원 : 501명<br/>
                    남학생  : 257명<br/>
                    ​여학생 : 244명<br/>
                </글>
            </Wrap>

            <Wrap>

                <사진>
                    <img src={pic_1}/>
                </사진>   
                <글>
                        플로스팅 Chapter.01<br/>
                        2021.03.22 ~ 2021.03.27<br/>
                        
                        참가 대학교<br/>
                        - 강남대학교<br/>
                        - 단국대학교 죽전캠퍼스<br/>
                        
                        총 참가 인원 : 381명<br/>
                        남학생  : 192명<br/>
                        여학생 : 189명<br/>
                        
                        
                    ​
                </글>
            </Wrap> */}

            <Footer/>
        </div>
    );
};

export default History;