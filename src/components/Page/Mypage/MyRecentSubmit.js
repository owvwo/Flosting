import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import firebase from '../Register/LoginFire.js'
const db = firebase.firestore()

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
    .resubmitButton{
        background-color: red;
        border: none;
        border-radius: 15px;
        color: white;
        width: 8rem;
        height: 3rem;
        font-size: 1.2rem;
    }
    .cloverTingBox{
        color: rgb(0,0,0,0.8);
        background-color: rgb(179,214,189,0.2);
        border: 2px solid rgb(179,214,189,0.3);
        border-radius: 15px;
        padding: 0.5rem;
        margin-bottom: 1rem; 
        margin-top: 0.5rem; 
    }
    .daisyTingBox{
        color: rgb(0,0,0,0.8);
        background-color: rgb(238,236,142,0.2);
        border: 2px solid rgb(238,236,142,0.3);
        border-radius: 15px;
        padding: 0.5rem;
        margin-bottom: 1rem; 

    }
    .lilacTingBox{
        color: rgb(0,0,0,0.8);
        background-color: rgb(255,180,224,0.2);
        border: 2px solid rgb(255,180,224,0.3);
        border-radius: 15px;
        padding: 0.5rem;
        margin-bottom: 1rem; 

    }

`

function MyRecentSubmit(props) {
    let [몇회차,몇회차변경] = useState();
    let[cloverAge,setCloverAge]=useState("");
    let[daisyAge,setDaisyAge]=useState("");
    let[lilacAge,setLilacAge]=useState("");
    let[cloverUniv,setCloverUniv]=useState();
    let[daisyUniv,setDaisyUniv]=useState();
    let[lilacUniv,setLilacUniv]=useState();
    let[memberInfoDocId,setMemberInfoDocId]=useState();
    let[submitDocId,setSubmitDocId]=useState();
    let[버튼상태,버튼상태변경]=useState(false);
    let 신청중회차=[];

    // DB 현재 신청 중인 회차 변수 불러오는 함수
    const getVariableInfo = async() => {
        const snapShot = await db.collection('매칭결과변수').doc('variableInfo').get()
        try{
            신청중회차 = snapShot.data()['신청중'].split(" ")
            버튼상태변경(신청중회차.includes(몇회차))
        }catch(err){console.log(err)}
    }
    const findInSubmit = async() => {
        const snapShot = await db.collection(`Flosting_${몇회차}`).where("ID", "==", props.user.email.split('@')[0]).get()
        try{
            snapShot.forEach((doc)=>{
                setCloverAge(doc.data().Clover.Age)
                setCloverUniv(doc.data().Clover.Univ)
                setDaisyAge(doc.data().Daisy.Age)
                setDaisyUniv(doc.data().Daisy.Univ)
                setLilacAge(doc.data().Lilac.Age)
                setLilacUniv(doc.data().Lilac.Univ)
            })

        }catch(err){console.log(err)}
    }
    const prepareDelete = async() => {
        try{
            const getDocIdFromSubmit = await db.collection(`Flosting_${몇회차}`).where("ID", "==", props.user.email.split('@')[0]).get()
            getDocIdFromSubmit.forEach((doc)=>{setSubmitDocId(doc.id)})
            
            const getDocIdFromMemberInfo = await db.collection('회원정보').where("ID", "==", props.user.email.split('@')[0]).get()
            getDocIdFromMemberInfo.forEach((doc)=>{
                setMemberInfoDocId(doc.id)
                몇회차변경(doc.data()['Ongoing'])
            })
        }catch(err){console.log(err)}
    }
    
    const onClick = async() => {
        try{
            await db.collection('회원정보').doc(memberInfoDocId).update({Ongoing: ""})

            await db.collection(`Flosting_${몇회차}`).doc(submitDocId).delete()

            alert('신청내역이 삭제되었습니다')
            window.location.href='/my'
        }
        catch(err){console.log(err)}
    }

    useEffect(()=>{
        getVariableInfo();
        findInSubmit();
        prepareDelete();
    },[cloverAge, daisyAge, lilacAge, cloverUniv, daisyUniv, lilacUniv, 몇회차])

    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <h1>
                    최근신청내역
                </h1><br/>
                <h2>{몇회차}회차 신청 내역</h2>
                <div>
                    <div className='cloverTingBox'>
                        <h2>클로버팅</h2>
                        {
                            cloverAge === "" 
                            ? <div>신청내역이 없습니다</div>
                            : <div>매칭 상대 나이: {cloverAge}</div>
                        }
                        {
                        cloverUniv === 'dnt_M'
                        && <div>매칭 상대 학교: 학교 상관없음</div>
                        }
                        {
                        cloverUniv === 'otherUniv'
                        && <div>매칭 상대 학교: 다른 학교만</div>
                        }
                        {
                        cloverUniv === 'myUniv'
                        && <div>매칭 상대 학교: 같은 학교만</div>
                        }
                    </div>
                    <div className='daisyTingBox'>
                        <h2>데이지팅</h2> 
                        {
                            daisyAge === ""
                            ? <div>신청내역이 없습니다</div>
                            : <div>매칭 상대 나이: {daisyAge}</div>
                        }
                        {
                        daisyUniv === 'dnt_M'
                        && <div>매칭 상대 학교: 학교 상관없음</div>
                        }
                        {
                        daisyUniv === 'otherUniv'
                        && <div>매칭 상대 학교: 다른 학교만</div>
                        }
                        {
                        daisyUniv === 'myUniv'
                        && <div>매칭 상대 학교: 같은 학교만</div>
                        }
                    </div>
                    <div className='lilacTingBox'>
                        <h2>라일락팅</h2> 
                        {
                            lilacAge === ""
                            ? <div>신청내역이 없습니다</div>
                            : <div>매칭 상대 나이: {lilacAge}</div>
                        }
                        {
                        lilacUniv === 'dnt_M'
                        && <div>매칭 상대 학교: 학교 상관없음</div>
                        }
                        {
                        lilacUniv === 'otherUniv'
                        && <div>매칭 상대 학교: 다른 학교만</div>
                        }
                        {
                        lilacUniv === 'myUniv'
                        && <div>매칭 상대 학교: 같은 학교만</div>
                        }
                    </div>
                {
                    버튼상태
                    ? 
                    <div>
                        <button onClick={onClick} className='resubmitButton'>신청취소</button>
                    </div>
                    : null
                }
                </div>
            </Container>
        </ThemeProvider>
    );
}
export default MyRecentSubmit;