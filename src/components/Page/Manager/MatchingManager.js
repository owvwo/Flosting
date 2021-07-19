import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import fire from '../Register/LoginFire';
import { ControlPointDuplicate } from '@material-ui/icons';
import PickerButton from 'antd/lib/date-picker/PickerButton';
import { Footer } from 'antd/lib/layout/layout';



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
`;

const MatchButton = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    border-radius: 8px;
    margin: 5px;
    border : 1px solid #A6A6A6;
    color :  black;
    background : red;
    width: 10rem;
    height: 5rem;
    h2{
        font-size: 2rem;
    }
`

const MatchingManager = (props) => {

    const user = props.user;
    const db = fire.firestore();

    //DB에서 우선순위배열에 추가하는 함수
    function DBtoPriority_Array(Priority_Array, Priority, MatchingType, data) {
        //우선순위 배열, 우선순위, Lilac/Daisy/Clover/ DOC.data

        let tempdic = {
            Pick: false, //Couple :true  / 초기값 : false
            Age: data.User.Age, // 본인 나이
            Gender: data.User.Gender, //본인 성별
            Manner: data.User.Manner, // 본인 매너
            Nick: data.User.Nick, // 본인 닉네임
            Phone: data.User.Phone,// 본인 폰
            Univ: data.User.Univ, // 본인 학교
        }
        if (MatchingType == "Lilac") {
            tempdic['W_Age'] = data.Lilac.Age; //원하는 나이
            tempdic['W_Univ'] = data.Lilac.Univ; //원하는 학교
        } else if (MatchingType == "Daisy") {
            tempdic['W_Age'] = data.Daisy.Age; //원하는 나이
            tempdic['W_Univ'] = data.Daisy.Univ; //원하는 학교
        } else {
            tempdic['W_Age'] = data.Clover.Age; //원하는 나이
            tempdic['W_Univ'] = data.Clover.Univ; //원하는 학교
        }
        Priority_Array[Priority].push(tempdic);
    };

    //배열을 섞어주는 함수.
    const shuffleArray = (array) => {
        let arraylength = array.length;
        for (let i = 0; i < arraylength; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            const x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    };
    //나이조건이 맞는지 검사하는 함수
    const CheckAgeCondition = (Condition, OtherAge) => {
        if (Condition == "20") {
            if (OtherAge == 20)
                return true;
            else
                return false;
        } else if (Condition == "21~23") {
            if (OtherAge > 20 && OtherAge < 24)
                return true;
            else
                return false;
        } else if (Condition == "24+") {
            if (OtherAge >= 24)
                return true;
            else
                return false;
        }
    }
    //PickUser와 OtherUser가 커플이 될 수 있는지 확인하는 함수
    const CheckCanCouple = (PickUser, OtherUser, MatchingType) => {
        //Lilac일 경우, 남녀만됨.
        if (MatchingType == "Lilac" || MatchingType == "Daisy") {
            if (PickUser.Gender != OtherUser.Gender) {
                //젠더 달라야함.
                if (PickUser.W_Age == "Dnt_M" && PickUser.W_Univ == "Dnt_M") {
                    //pickuser는 나이, 학교 상관없어.
                    if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                        //otheruser는 나이, 학교 상관없어.
                        return true;
                    }
                    else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                        //otheruser는 나이 조건있고, 학교 상관없어.
                        if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                        //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                        if (PickUser.Univ == OtherUser.Univ) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                        //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                        if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                        //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                        if (PickUser.Univ != OtherUser.Univ) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                        //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                        if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else if (PickUser.W_Age != "Dnt_M" && PickUser.W_Univ == "Dnt_M") {
                    //pickuser는 나이 조건있고, 학교 상관없어.
                    if (CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age == "Dnt_M" && PickUser.W_Univ == "myUniv") {
                    //pickuser는 나이 상관없고, 학교만 울학교면 좋겠어.
                    if (PickUser.Univ == OtherUser.Univ) {
                        if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age != "Dnt_M" && PickUser.W_Univ == "myUniv") {
                    //pickuser는 나이 조건있고, 학교는 울학교면 좋겠어.
                    if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age == "Dnt_M" && PickUser.W_Univ == "otherUniv") {
                    //pickuser는 나이 상관없고, 학교가 타학교면 좋겠어.
                    if (PickUser.Univ != OtherUser.Univ) {
                        if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age != "Dnt_M" && PickUser.W_Univ == "otherUniv") {
                    //pickuser는 나이 조건있고, 학교가 타학교면 좋겠어.
                    if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else {
                    console.log("ㅈ버그")
                    return false;
                }
            } else
                return false;
        }
        //Clover일 경우, 동성만됨.
        else {
            if (PickUser.Gender == OtherUser.Gender) {
                //젠더 달라야함.
                if (PickUser.W_Age == "Dnt_M" && PickUser.W_Univ == "Dnt_M") {
                    //pickuser는 나이, 학교 상관없어.
                    if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                        //otheruser는 나이, 학교 상관없어.
                        return true;
                    }
                    else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                        //otheruser는 나이 조건있고, 학교 상관없어.
                        if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                        //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                        if (PickUser.Univ == OtherUser.Univ) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                        //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                        if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                        //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                        if (PickUser.Univ != OtherUser.Univ) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                        //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                        if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else if (PickUser.W_Age != "Dnt_M" && PickUser.W_Univ == "Dnt_M") {
                    //pickuser는 나이 조건있고, 학교 상관없어.
                    if (CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age == "Dnt_M" && PickUser.W_Univ == "myUniv") {
                    //pickuser는 나이 상관없고, 학교만 울학교면 좋겠어.
                    if (PickUser.Univ == OtherUser.Univ) {
                        if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age != "Dnt_M" && PickUser.W_Univ == "myUniv") {
                    //pickuser는 나이 조건있고, 학교는 울학교면 좋겠어.
                    if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age == "Dnt_M" && PickUser.W_Univ == "otherUniv") {
                    //pickuser는 나이 상관없고, 학교가 타학교면 좋겠어.
                    if (PickUser.Univ != OtherUser.Univ) {
                        if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age != "Dnt_M" && PickUser.W_Univ == "otherUniv") {
                    //pickuser는 나이 조건있고, 학교가 타학교면 좋겠어.
                    if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "Dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "Dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else {
                    console.log("ㅈ버그")
                    return false;
                }
            } else
                return false;
        }

    }

    //MatchingType별 couple, trash 만드는  함수
    const MatchingSystem = (CollectionName, MatchingType, Alluser, Priority_Array, couple, trash) => {
        db.collection(CollectionName).where(MatchingType + ".Ticket", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().Lilac.Age == "Dnt_M" && doc.data().Lilac.Univ == "Dnt_M") {
                        //1순위 매칭 우선배열
                        DBtoPriority_Array(Priority_Array, 0, MatchingType, doc.data());
                    } else if (doc.data().Lilac.Age == "Dnt_M" || doc.data().Lilac.Univ == "Dnt_M") {
                        //2순위 매칭 우선배열
                        DBtoPriority_Array(Priority_Array, 1, MatchingType, doc.data());
                    } else {
                        //3순위 매칭 우선배열
                        DBtoPriority_Array(Priority_Array, 2, MatchingType, doc.data());
                    }
                })

                // 각 우선순위 배열을 셔플하고 차곡차곡 쌓음.
                for (let i = 0; i < 3; i++) {
                    shuffleArray(Priority_Array[i]);
                    Alluser.push(...Priority_Array[i]);
                }

                //전체 유저의 수
                let User_Num = Alluser.length;

                for (let i = 0; i < User_Num; i++) {
                    if (i == User_Num - 1) {
                        //마지막한사람은 ㅂㅂ
                        break;
                    }
                    //PickUser = 매칭중인 유저
                    let PickUser = Alluser[i];
                    //Pick이 된지 먼저 검증
                    if (PickUser.Pick) {
                        continue;
                        //이미 커플
                    } else {
                        //나 다음부터 커플을 찾아보자
                        for (let j = i + 1; j < User_Num; j++) {
                            //OtherUser = 상대 유저
                            let OtherUser = Alluser[j];
                            if (OtherUser.Pick) {
                                //이미 커플
                                continue;
                            } else {
                                if (CheckCanCouple(PickUser, OtherUser, MatchingType)) {
                                    PickUser.Pick = true;
                                    OtherUser.Pick = true;
                                    couple[0].push(PickUser);
                                    couple[1].push(OtherUser);
                                    break;
                                }
                            }
                        }
                    }
                }
                for (let i = 0; i < User_Num; i++) {
                    if (!Alluser[i].Pick) {
                        //커플안된놈들
                        trash.push(Alluser[i]);
                    }
                }

                PushCoupletoDB("Lilac", couple);
                console.table(couple);
                console.table(trash);
            });
    }
    //DB에 push해주는 함수
    const PushCoupletoDB = (MatchingType, couple) => {
        const couplelength = couple[0].length;
        for (let i = 0; i < couplelength; i++) {
            let userOne = {
                Age : couple[0][i].Age,
                Gender : couple[0][i].Gender,
                Manner : couple[0][i].Manner,
                Nick : couple[0][i].Nick,
                Phone : couple[0][i].Phone,
                Univ : couple[0][i].Univ,
            };
            let userTwo = {
                Age : couple[1][i].Age,
                Gender : couple[1][i].Gender,
                Manner : couple[1][i].Manner,
                Nick : couple[1][i].Nick,
                Phone : couple[1][i].Phone,
                Univ : couple[1][i].Univ,
            };
            db.collection("test" + MatchingType)
                .add({
                    stage: "zero",
                    userOne: userOne,
                    userTwo: userTwo,
                    거절한사람: "",
                    메세지보낸사람: ""
                })
                .then(() => {
                    console.log("success[i]");
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    };
    // Array비우는 함수
    const clearArray = (Alluser, Priority_Array, couple, trash) => {
        Alluser = [];
        Priority_Array = [[], [], []];
        couple = [[], []];
        trash = [];
    }
    const handlematch = () => {


        if (user) {
            let Alluser = [];
            let Priority_Array = [[], [], []]; //우선순위를 3단계로 둠.
            let couple = [[], []];
            let trash = [];

            const LilacMatching = new Promise((resolve, reject) => {
                MatchingSystem("Flosting_test삭제ㄴㄴ", "Lilac", Alluser, Priority_Array, couple, trash);
                resolve(true);
            });

            // LilacMatching.then(() => {
            //     let a = 5;
            //     PushCoupletoDB("Lilac", couple);
            // })
        }
    }



    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <h1>
                    매니저
                </h1>
                <MatchButton onClick={handlematch}>
                    <h2>LilacMatching</h2>
                </MatchButton>
            </Container>
        </ThemeProvider>
    );
}

export default MatchingManager;