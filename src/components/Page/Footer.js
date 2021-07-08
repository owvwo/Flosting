import React from 'react';
import styled from 'styled-components'
import flostingIcon from '../../images/pic_1.png';
import kakaoIcon from '../../images/kakao.png';
import instaIcon from '../../images/instagram.png';

const 푸터 = styled.div`
    margin-top: 15px;
    background: #FAB0B0;
    padding: 0px;
    display: flex; 
    flex-direction: row;

    .footerLeft{
        display: flex;
        color: blue;
        flex: 4;
        align-items : center;
        justify-content: center;

        img{
            height: 6rem;
            width: 6rem;
            margin-top: 0.7rem;
        }
    }
    .footerRight{
        text-align: left;
        flex: 6;
        font-size: 5px;

        .info{
            color:black;
            font-size: 0.8rem;

        }
        .hashTag{
            text-align: center;
            font-size: 0.8rem;
            padding:0px;
            margin-top: 15px;
            margin-bottom: 10px;

        }
        .info{
            padding:0px;

        }
        .snsIcon{
            text-align: left;

            img{
                height: 2.5rem;
                width: 2.5rem;
                margin-left: 3rem;
                margin-top: 10px;
            }
        }
    }
`


function Footer(){

    return(
        <div>
            <푸터>
                <div className='footerLeft'>
                    <img calssName='icon' src={flostingIcon} />
                </div>

                <div className='footerRight'>
                    <p className='hashTag'>
                        #대학생 #랜덤 #미팅 #소개팅<br/>
                        #번호팅 #플로스팅<br/>
                    </p>
                    <p className='info'>
                        E-mail : flosting874@gmail.com<br/>
                        플로스 컴패니 대표이사: 이상민<br/>
                        경기도 용인시 수지구 정평로 89, 202 1001<br/>
                        사업자 등록번호 : 899-33-01066<br/>
                        업태) 정보통신업<br/>
                        종목) 데이터베이스 및 온라인 정보 제공업<br/>

                        
                    </p>                
                    <div className='snsIcon'>
                        <img calssName='icon' src={kakaoIcon} />
                        <img calssName='icon' src={instaIcon} />
                    </div>
                </div>

            </푸터>
            <div>
                <p style={{textAlign:'center' ,fontSize:'0.5rem'}}>Copyright © Flos company All rights reserved.</p>
            </div>
        </div>
    
    )
};
export default Footer;
