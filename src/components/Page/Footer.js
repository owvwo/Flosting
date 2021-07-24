import React from 'react';
import styled from 'styled-components'
import kakaochannel from '../../images/kakaochannel.png';
import instaIcon_1 from '../../images/insta.png';
import instaIcon_2 from '../../images/insta_2.png';

const 푸터 = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    color: grey;
    background: rgb(255,180,224,0.2);
    padding: 5px;
    display: flex;
        .left{
            width: 220px;
            flex: 7
            padding: 10px;
                .info{
                    padding: 10px;
                }
        }
        .right{
            flex:3
        }
        .hashTag{
            text-align: center;
            font-size: 0.6rem;
            padding:5px;

        }
        .info{
            height:50px;
            font-size: 0.6rem;
            padding:0px;
            text-align: right;
            border-right : 1px solid white;
        }
        .snsIcon{
            text-align: center;
            display:flex;
            justify-content: center;
            align-items: center;
            img{
                height: 1rem;
                width: 1rem;
                margin-left: 1rem;
                margin-top: 5px;
            }
        }
    }
`


function Footer(){

    return(
        <div>
            <푸터>
                <div className='left'>
                    <div className='info'>
                        플로스 컴패니 대표이사: 이상민<br/>
                        경기도 용인시 수지구 정평로 89, 202 1001<br/>
                        사업자 등록번호 : 899-33-01066<br/>                       
                    </div>
                </div>
                <div className='right'>
                    <div className='hashTag'>
                        #번호팅 #플로스팅<br/>
                        #대학생 #랜덤 #미팅 #소개팅<br/>
                    </div>
                    <div className='snsIcon'>
                        <div onClick={ ()=>{window.open('http://pf.kakao.com/_xfuvpK', '_blank')}}>
                            <img calssName='icon' src={kakaochannel} />
                        </div>
                        <div onClick={ ()=>{window.open('https://www.instagram.com/flosting__/', '_blank')}}>
                            <img calssName='icon' src={instaIcon_1} />
                        </div>
                    </div>            
                </div>  
            </푸터>
            <div>
                <div style={{ textAlign: 'center', fontSize: '0.5rem' }}>Copyright © Flos company All rights reserved.</div>
            </div>

        </div>
    
    )
};
export default Footer;
