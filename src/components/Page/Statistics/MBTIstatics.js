import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import firebase from '../Register/LoginFire.js'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const Colortheme = createMuiTheme({
    palette: {
        primary: {
            main: '#E0BCC1'
        }
    },
    typography: {
        fontSize: 13,
        fontWeightRegular: 700,
        fontFamily: "Noto Sans KR"
    }

})

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
const MainContent = styled.div`
    display: flex;
    width: 20rem;
    flex-direction : column;
    list-style: none;
    .SubBar{
        margin : 1rem 0rem;
        padding-bottom : 1rem;
        display: flex;
        width: 100%;
        list-style: none;
        li{
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            font-size : 2rem;
            color : rgb(80,80,80,1.0);
            border-bottom : 2px solid rgb(0,0,0,0.05);
        }
        .clicked{
            border-bottom : 2px solid rgb(0,0,0,0.2);
            font-weight: bold;
        }
    }
    .Noticecontent{
        font-size: 0.8rem;
    }
    .SelectBox{
        li{
            border-bottom : 1px solid rgb(0,0,0,0.4);
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding : 0 1rem;
        }
        margin-top : 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
`

function MBTIstatics() {
    const [newMbti, setnewMbti] = useState("");
    const db = firebase.firestore()

    const handleChange = (event) => {
        setnewMbti(event.target.value);
    };
    let worklist = [];

    useEffect(() => {


    }, [newMbti])

    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <MainContent>
                    <Fade up>
                        <div className="SubBar">
                            <li className="clicked">
                                MBTI별
                            </li>
                            <li>
                                학교별
                            </li>
                        </div>
                        <li className="Noticecontent">
                            MBTI별 매칭 성공률을 볼 수 있습니다.
                        </li>
                        <div className="SelectBox">
                            <li>
                                MBTI 선택
                            </li>
                            <Select
                                native
                                value={newMbti}
                                onChange={handleChange}
                                input={<Input id="demo-dialog-native" />}
                            >
                                <option aria-label="None" value="선택 안함" />
                                <option value="INTJ">INTJ</option>
                                <option value="INTP">INTP</option>
                                <option value="ENTJ">ENTJ</option>
                                <option value="ENTP">ENTP</option>
                                <option value="INFJ">INFJ</option>
                                <option value="INFP">INFP</option>
                                <option value="ENFJ">ENFJ</option>
                                <option value="ENFP">ENFP</option>
                                <option value="ISTJ">ISTJ</option>
                                <option value="ISFJ">ISFJ</option>
                                <option value="ESTJ">ESTJ</option>
                                <option value="ESFJ">ESFJ</option>
                                <option value="ISTP">ISTP</option>
                                <option value="ISFP">ISFP</option>
                                <option value="ESTP">ESTP</option>
                                <option value="ESFP">ESFP</option>
                            </Select>
                            {
                                worklist
                            }
                        </div>
                    </Fade>
                </MainContent>
            </Container>
        </ThemeProvider>
    );
}
export default MBTIstatics;