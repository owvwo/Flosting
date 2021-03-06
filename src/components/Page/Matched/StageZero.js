import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import TimerComponent from './Timer.js'
import fire from '../Register/LoginFire.js'
import { NavLink } from 'react-router-dom';
const db = fire.firestore()

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .ProfileWrap{
        display: flex;
    }
`

const TimerWrap = styled.div`
    list-style :  none;
    display: flex;
    justify-content: flex;
    align-items: flex;
    flex-direction: column;
    .Ment{
        text-decoration: underline;
        margin-top: 5px;
        font-size: 0.6rem;
        text-align: center;
    }
`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content : center;
    flex-direction: column;

`
const NoticeMessage = styled.div`
 list-style: none;
 li{
     font-size: 0.6rem;
     margin-bottom: 2rem;
 }
`

const TitleWrap = styled.div`

    color: rgb(0,0,0, 0.75);
    background: rgb(0,0,0, 0.05);
    width: 20rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content : center;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;

    font-size : 2rem;
    text-align : center;
    margin-top: 1rem;
`
const LeftProfileWrap = styled.div`
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-right: 1.5rem;
.ING{
    font-family: 'Do Hyeon', sans-serif;
    border-bottom: 1px solid rgb(0,0,0, 0.2);
    border-top: 3px solid rgb(255,255,255, 1);
    margin-bottom: 5px;
    color: rgb(0,0,0,0.5);
}

    .defaultPicBox{
        list-style: none;
        a{
            
            .LookProfile{
                font-family: 'Do Hyeon', sans-serif;
                margin-bottom: 5px;
                border-radius : 5px;
                background: rgb(0,0,0, 0.1);
            }
        }
    }
    .defaultPic{
        width: 6rem;
        height: 6rem;
        background-color: grey;
        border-radius: 50%;
        object-fit:cover;
    }

    .profileInfo{
        list-style: none;
        width: 8rem;
        .UserNick{
            font-weight: 700;
        }
        .UserUniv{
            font-size: 0.5rem;
        }
        .UserManner{
            font-size: 0.5rem;
        }
        .UserPhone{
            background: rgb(209,240,228,0.8);
            font-size: 0.9rem;
            font-weight: 700;
            
        }
    }
`

const RightProfileWrap = styled.div`
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-left: 1.5rem;
.ING{
    font-family: 'Do Hyeon', sans-serif;
    border-bottom: 1px solid rgb(0,0,0, 0.2);
    border-top: 3px solid rgb(255,255,255, 1);
    margin-bottom: 5px;
    color: rgb(0,0,0,0.5);
}

    .defaultPicBox{
        list-style: none;
        a{
            
            .LookProfile{
                font-family: 'Do Hyeon', sans-serif;
                margin-bottom: 5px;
                border-radius : 5px;
                background: rgb(0,0,0, 0.1);
            }
        }
    }
    .defaultPic{
        width: 6rem;
        height: 6rem;
        background-color: grey;
        border-radius: 50%;
        object-fit:cover;
    }

    .profileInfo{
        list-style: none;
        width: 8rem;
        .UserNick{
            font-weight: 700;
        }
        .UserUniv{
            font-size: 0.5rem;
        }
        .UserManner{
            font-size: 0.5rem;
        }
        .UserPhone{
            background: rgb(209,240,228,0.8);
            font-size: 0.9rem;
            font-weight: 700;
            
        }
    }
`

const ButtonWrap = styled.div`
text-align:center;
margin-top: 2rem;
`
const Agree = styled.button`
font-family: "Noto Sans KR", sans-serif;
margin-bottom: 1rem;
margin-right: 0.5rem;
margin-left: 0.5rem;
width: 13rem;
height: 3rem;
color : rgb(0,0,0,0.8);
border : 1px solid rgb(0,0,0, 0.2);
font-weight: 700;
border-radius: 40px;
background-color: rgb(218,219,247, 0.8);
&:hover{
    background-color: rgb(188,189,217, 0.8);
    color: white;
}
`

const Refuse = styled.button`
margin-bottom: 1rem;
margin-right: 0.5rem;
margin-left: 0.5rem;
width: 13rem;
height: 3rem;
border : 1px solid rgb(218,219,247, 0.8);
font-weight: 700;
border-radius: 40px;
background-color: white;
&:hover{
    background-color: rgb(217,91,91,0.5);
    color: white;

`


function StageZero(props) {
    let [init, setInit] = useState(false)
    let [????????????, ??????????????????] = useState(false)

    useEffect(() => {
        if (props.??????1 && props.??????2) {
            setInit(true);
        }
        if (????????????) {
            console.log('refresh')
            window.location.reload();

        }
    })

    return (
        <div>
            {
                init
                    ?
                    <Container>
                        <Timer />
                        <Title />
                        <div className='ProfileWrap'>
                            <LeftProfile ??????1={props.??????1} />
                            <RightProfile ??????2={props.??????2} />
                        </div>
                        <Button ??????????????????={??????????????????} ?????????={props.?????????} ????????????={props.????????????} ?????????={props.?????????} ???????????????????????????={props.???????????????????????????} ????????????={props.????????????} />
                        <Footer />
                    </Container>

                    : null
            }
        </div>
    )
}
export default StageZero;

function Timer() {
    return (
        <TimerWrap>
            <li className="Ment">
                ????????? ???????????? ????????? ????????? ????????????!
            </li>
            <TimerComponent />
        </TimerWrap>
    )
}

function Title() {
    return (
        <TitleContainer>
            <TitleWrap>
                ?????? ?????? ???
            </TitleWrap>
            <NoticeMessage><li>????????? ???????????? ????????? ????????? ?????? ????????????!</li></NoticeMessage>
        </TitleContainer>
    )
}

function LeftProfile(props) {
    let ??????1 = props.??????1
    let profileImage = ??????1.profileImage;

    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#2B2A28'
    }


    return (
        <LeftProfileWrap>
            <div className="ING">?????????</div>
            <div className='defaultPicBox'>
                <NavLink to={`/userprofile/${??????1.User.Nick}`} style={noneactiveStyle}><li className="LookProfile">????????? ??????</li></NavLink>
                <img src={profileImage} className='defaultPic' />
            </div>
            <div className='profileInfo'>
                <li className="UserNick">{??????1.User.Nick}[{??????1.User.Age}]</li>
                <li className="UserPhone">{??????1.User.Phone.substring(0, 3)}-{??????1.User.Phone.substring(3, 7)}-{??????1.User.Phone.substring(7)}</li>
                <li className="UserUniv">{??????1.User.Univ}</li>
            </div>
        </LeftProfileWrap>
    )
}
function RightProfile(props) {
    let ??????2 = props.??????2
    let profileImage = ??????2.profileImage;

    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#2B2A28'
    }

    return (
        <RightProfileWrap>
            <div className="ING">?????????</div>
            <div className='defaultPicBox'>
                <NavLink to={`/userprofile/${??????2.User.Nick}`} style={noneactiveStyle}><li className="LookProfile">????????? ??????</li></NavLink>
                <img src={profileImage} className='defaultPic' />
            </div>
            <div className='profileInfo'>
                <li className="UserNick">{??????2.User.Nick}[{??????2.User.Age}]</li>
                <li className="UserPhone">{??????2.User.Phone.substring(0, 3)}-{??????2.User.Phone.substring(3, 7)}-{??????2.User.Phone.substring(7)}</li>
                <li className="UserUniv">{??????2.User.Univ}</li>
            </div>
        </RightProfileWrap>
    )
}

function Button(props) {
    function onClick_sendMessage() {
        const result = window.confirm('????????? ?????? ????????? ????????????????');
        if (result) {
            db.collection(props.?????????).doc(props.????????????).update({
                stage: 'half'
            })
            db.collection(props.?????????).doc(props.????????????).update({
                ?????????????????????: props.?????????
            })
            db.collection('????????????').doc(props.???????????????????????????).update({
                'User.Manner': props.????????????['Manner'] + 1
            }).then(() => {
                alert('??????????????? ??????????????????! ?????? ?????? ??????????????? :)')
                props.??????????????????(true);
            })
        } else { }
    }
    function onClick_refuse() {
        const result = window.confirm('????????? ??????????????????????');
        if (result) {
            db.collection(props.?????????).doc(props.????????????).update({
                stage: 'end'
            })
            db.collection(props.?????????).doc(props.????????????).update({
                ???????????????: props.?????????
            }).then(() => {
                alert('????????? ?????????????????????.')
                props.??????????????????(true);
            })
        } else { }
    }

    return (
        <ButtonWrap>
            <Agree onClick={onClick_sendMessage}>?????? ???????????????!</Agree>
            <Refuse onClick={onClick_refuse}>???????????????</Refuse>
        </ButtonWrap>
    )
}







