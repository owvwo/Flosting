import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import fire from './Register/LoginFire';

const Container=styled.div`
text-align: center;
height: 37rem;
    .title{
        font-size : 2rem;
        text-align : center;
        margin-top: 2rem;
        font-weight : bolder
    }
    .title_sub{
        margin-top : 3rem;
        margin-bottom: 0.5rem;
    }
    .form_div{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
        margin-top: 2rem;
        margin-bottom: 2rem;
        button{
            width: 13rem;
            height: 3rem;
            border : 1px solid yellow;
            border-radius: 40px;
            background-color: pink;
            &:hover{
                background-color: grey;
                color: pink;
            }
        }
    }
    form{
        display:table-cell;
        
    }
    .form_inner{
        text-align:left;
        margin-bottom:2rem;
        input{
            width: 15rem;
            height: 2rem;
        }
    }
`
const db = fire.firestore()
function Alarm(){

    let[본인학교,본인학교변경]=useState();
    let[전화번호,전화번호변경]=useState();
    let[희망학교,희망학교변경]=useState();

    const onChange = (event) => {
        const{target:{name, value}} = event;
        if(name === '본인학교'){ 본인학교변경(value)}
        else if(name === '전화번호'){ 전화번호변경(value)}
        else if(name === '희망학교'){ 희망학교변경(value)}
    }

    const onSubmit = (event) => {
        event.preventDefault();
        db.collection('Alarm').add({
            alarmTarget: 본인학교,
            alarmPhone: 전화번호,
            alarmHope: 희망학교
        }).then(()=>{
            alert('알림 신청이 완료되었습니다!')
        })
    }

    return(
        <div>
            <Container>
                <div className='title'>우리학교 알림 신청하기</div>
                <div className='title_sub'>
                    본인 학교에서 플로스팅이 진행될 때<br/> 
                    신청하신 번호로 알려드립니다 :)
                </div>
                <div className='form_div'>
                    <form onSubmit={onSubmit}>
                        <div className='form_inner'>
                            <div>본인 학교(*)</div>
                            <input
                                name='본인학교'
                                required
                                value={본인학교}
                                onChange={onChange}
                                placeholder="캠퍼스 구분"
                            ></input>
                        </div>
                        <div className='form_inner'>
                            <div>알림받으실 전화번호(*)</div>
                            <input
                                name='전화번호'
                                required
                                value={전화번호}
                                onChange={onChange}
                                placeholder="'-'제외 기입"
                            ></input>
                        </div>                    
                        <div className='form_inner'>
                            <div>
                                본인학교와 플로스팅이 같이<br/> 
                                진행되었으면 하는 인근 희망학교
                            </div>
                            <input
                                name='희망학교'
                                value={희망학교}
                                onChange={onChange}
                                placeholder="선택사항"

                            ></input>
                        </div>
                        <button onClick={onclick}>알림 신청하기</button>
                    </form>
                </div>
            </Container>
            <Footer/>
        </div>
    )
}
export default Alarm;