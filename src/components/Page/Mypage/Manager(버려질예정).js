import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import fire from '../Register/LoginFire';
import { ControlPointDuplicate } from '@material-ui/icons';



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

const Manager = (props) => {

    const user = props.user;
    const db = fire.firestore();

    //DB에서 여자 남자 배열에 넣어주는 함수
    function pushinto(putArr, M_Age, O_Age, data) {
        //넣을 배열, 나의 나이, 상대의 나이, 해당 data
        let tempdic = { Age: data.User.Age, Manner: data.User.Manner, Nick: data.User.Nick, Phone: data.User.Phone, Univ: data.User.Univ, WantUniv: data.Lilac.Univ }
        putArr[M_Age][O_Age].push(tempdic);
        //M_Age 내 나이
        //      0 -> 20살
        //      1 -> 21~23살
        //      2 -> 24+살

        //O_Age 상대 나이
        //      0 -> 20살
        //      1 -> 21~23살
        //      2 -> 24+살
        //      3 -> 상관없음

    };
    //매칭된 녀석들을 couple배열에 넣어주는 함수
    function pushintoCoupleArray(lessarr, morearr, couple) {
        let less_length = lessarr.length;
        let more_length = morearr.length;
        for (let i = 0; i < less_length; i++) {
            couple[0].push(lessarr[less_length - i - 1]);
            couple[1].push(morearr[more_length - i - 1]);
            lessarr.pop();
            morearr.pop();
        }
    }

    //배열을 섞어주는 함수.
    const shuffleArray = (array) => {
        let arraylength = array.length;
        for (let i = 0; i < arraylength; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            // [array[i], array[j]] = [array[j], array[i]];
            const x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    };

    //나이Dnt_M애들 매칭해주기
    function Age_Dnt_Matching(lilacboy, lilacgirl, couple) {
        // 아무나 만나도 상관없는 애들 하나의 배열로 합쳐주고,
        let Dnt_M_boytemp = [
            ...lilacboy[0][3],
            ...lilacboy[1][3],
            ...lilacboy[2][3]
        ]
        let Dnt_M_girltemp = [
            ...lilacgirl[0][3],
            ...lilacgirl[1][3],
            ...lilacgirl[2][3]
        ]
        let Dnt_b_length = Dnt_M_boytemp.length;
        let Dnt_g_length = Dnt_M_girltemp.length;

        if (Dnt_b_length == 0 || Dnt_g_length == 0) {
            console.log("없음");
        } else {
            //두개 섞어주고,
            shuffleArray(Dnt_M_boytemp);
            shuffleArray(Dnt_M_girltemp);
            //boy쪽이 같거나 girl보다 수가 적을때,
            if (Dnt_b_length <= Dnt_g_length) {
                //매칭해주고
                pushintoCoupleArray(Dnt_M_boytemp, Dnt_M_girltemp, couple);
                //매칭 후 Dnt_M을 나머지애들로 업데이트시켜줌.
                update_dnt_array(Dnt_M_boytemp, Dnt_M_girltemp, lilacboy, lilacgirl);
                return "girl";
            }
            //girl쪽이 boy보다 더 적거나 같을 때
            else if (Dnt_b_length > Dnt_g_length) {
                pushintoCoupleArray(Dnt_M_girltemp, Dnt_M_boytemp, couple);
                //매칭 후 Dnt_M을 나머지애들로 업데이트시켜줌.
                update_dnt_array(Dnt_M_boytemp, Dnt_M_girltemp, lilacboy, lilacgirl);
                return "boy";
            }
        }

    };

    function trash_array(go_trash_array, input_array) {
        let trash_length = go_trash_array.length;

        if (trash_length != 0) {
            //trash에붙이고
            input_array.push(...go_trash_array);
            //trash애들 없앰.
            for(let i =0; i< trash_length; i++)
                go_trash_array.pop();
        }
    }
    //매칭 후 Dnt_M을 나머지애들로 업데이트시켜줌.
    function update_dnt_array(Dnt_M_boytemp, Dnt_M_girltemp, lilacboy, lilacgirl) {
        let Dnt_b_length = Dnt_M_boytemp.length;
        let Dnt_g_length = Dnt_M_girltemp.length;
        //남은게 0이면 초기화
        if (Dnt_b_length == 0) {
            for (let i = 0; i < 3; i++)
                lilacboy[i][3] = [];
        } else {
            for (let i = 0; i < 3; i++)
                lilacboy[i][3] = [];
            for (let i = 0; i < Dnt_b_length; i++) {
                if (Dnt_M_boytemp[i]['Age'] == 20) {
                    lilacboy[0][3].push(Dnt_M_boytemp[i]);
                } else if (Dnt_M_boytemp[i]['Age'] < 24) {
                    lilacboy[1][3].push(Dnt_M_boytemp[i]);
                } else {
                    lilacboy[2][3].push(Dnt_M_boytemp[i]);
                }
            }
        }

        if (Dnt_g_length == 0) {
            for (let i = 0; i < 3; i++)
                lilacgirl[i][3] = [];
        } else {
            for (let i = 0; i < 3; i++)
                lilacgirl[i][3] = [];
            for (let i = 0; i < Dnt_g_length; i++) {
                if (Dnt_M_girltemp[i]['Age'] == 20) {
                    lilacgirl[0][3].push(Dnt_M_girltemp[i]);
                } else if (Dnt_M_girltemp[i]['Age'] < 24) {
                    lilacgirl[1][3].push(Dnt_M_girltemp[i]);
                } else {
                    lilacgirl[2][3].push(Dnt_M_girltemp[i]);
                }
            }
        }
    }

    //매칭 후 남은 Agearray를 업데이트시켜줌.
    function update_Age_array(Age_dump_array, otherarray, num) {
        let Age_dum_length = Age_dump_array.length;
        //남은게 0이면 초기화
        if (Age_dum_length == 0) {
            for (let i = 0; i < 3; i++)
                otherarray[i][num] = [];
        } else {
            for (let i = 0; i < 3; i++)
                otherarray[i][num] = [];
            for (let i = 0; i < Age_dum_length; i++) {
                if (Age_dump_array[i]['Age'] == 20) {
                    otherarray[0][num].push(Age_dump_array[i]);
                } else if (Age_dump_array[i]['Age'] < 24) {
                    otherarray[1][num].push(Age_dump_array[i]);
                } else {
                    otherarray[2][num].push(Age_dump_array[i]);
                }
            }
        }
    }
    //남은 Dnt_M애들 매칭해주기
    function Age_Dnt_Last_Matching(rest_array, other_array, couple, trash) {
        for (let i = 0; i < 3; i++) {
            let dntarray = rest_array[i][3];
            let dnt_length = dntarray.length;
            if (dnt_length != 0) {
                let otherarraytemp = [
                    ...other_array[0][i],
                    ...other_array[1][i],
                    ...other_array[2][i]
                ]
                let o_length = otherarraytemp.length;
                //후보에 맞는 애들을 리스트로 묶음.
                if (o_length == 0) {
                    console.log("아예없음")
                } else {
                    //두개 섞어주고,
                    shuffleArray(otherarraytemp);
                    shuffleArray(dntarray);

                    //같거나, dnt쪽이 적을때,
                    if (dnt_length <= o_length) {
                        //매칭해주고
                        pushintoCoupleArray(dntarray, otherarraytemp, couple);

                        //매칭 후 otherarraytemp을 나머지애들로 업데이트시켜줌.
                        update_Age_array(otherarraytemp, other_array, i);
                        // update_dnt_array(Dnt_M_boytemp, Dnt_M_girltemp, lilacboy, lilacgirl);
                    }
                    //dnt쪽이 많을 때,
                    else if (dnt_length > o_length) {
                        pushintoCoupleArray(otherarraytemp, dntarray, couple);

                        //매칭 후 otherarraytemp이 없으니까, 해당하는 i번째 원하는애들을 싹다 비워줌.
                        update_Age_array(otherarraytemp, other_array, i);

                        //매칭 후 남은 dnt애들은 폐기처리함.
                        trash_array(dntarray, trash);
                        // update_dnt_array(Dnt_M_boytemp, Dnt_M_girltemp, lilacboy, lilacgirl);
                    }
                }
            }
        }
    }

    //나이조건 매칭해주기
    function Age_All_matching(boyArr, girArr, M_Age, O_Age, couple, trash) {
        let boytemp = boyArr[M_Age][O_Age];
        let girltemp = girArr[O_Age][M_Age];
        let b_length = boytemp.length;
        let g_length = girltemp.length;

        if (b_length == 0|| g_length == 0) {
            if(b_length == 0){
                trash_array(girltemp, trash);
            }else{
                trash_array(boytemp, trash);
            }

        } else {
            //두개 섞어주고,
            shuffleArray(boytemp);
            shuffleArray(girltemp);
            //boy쪽이 girl보다 수가 적을때,
            if (b_length < g_length) {
                pushintoCoupleArray(boytemp, girltemp, couple);
                trash_array(girltemp, trash);
            }
            //girl쪽이 boy보다 더 적거나 같을 때
            else {
                pushintoCoupleArray(girltemp, boytemp, couple);
                trash_array(boytemp, trash);
            }
        }

    };

    function MatchingSystem (CollectionName, lilacgirl, lilacboy, couple, trash){
        let peoplesum = 0;

        db.collection(CollectionName).where("Lilac.Ticket", "==", true)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                peoplesum++;
                if (doc.data().User.Gender == "girl") {
                    if (doc.data().User.Age == 20) {
                        if (doc.data().Lilac.Age == "20") {
                            pushinto(lilacgirl, 0, 0, doc.data());
                        } else if (doc.data().Lilac.Age == "21~23") {
                            pushinto(lilacgirl, 0, 1, doc.data());
                        } else if (doc.data().Lilac.Age == "24+") {
                            pushinto(lilacgirl, 0, 2, doc.data());
                        } else {
                            pushinto(lilacgirl, 0, 3, doc.data());
                        }
                    } else if (doc.data().User.Age < 24) {
                        if (doc.data().Lilac.Age == "20") {
                            pushinto(lilacgirl, 1, 0, doc.data());
                        } else if (doc.data().Lilac.Age == "21~23") {
                            pushinto(lilacgirl, 1, 1, doc.data());
                        } else if (doc.data().Lilac.Age == "24+") {
                            pushinto(lilacgirl, 1, 2, doc.data());
                        } else {
                            pushinto(lilacgirl, 1, 3, doc.data());
                        }
                    } else {
                        if (doc.data().Lilac.Age == "20") {
                            pushinto(lilacgirl, 2, 0, doc.data());
                        } else if (doc.data().Lilac.Age == "21~23") {
                            pushinto(lilacgirl, 2, 1, doc.data());
                        } else if (doc.data().Lilac.Age == "24+") {
                            pushinto(lilacgirl, 2, 2, doc.data());
                        } else {
                            pushinto(lilacgirl, 2, 3, doc.data());
                        }
                    }
                }
                else if (doc.data().User.Gender == "boy") {
                    if (doc.data().User.Age == 20) {
                        if (doc.data().Lilac.Age == "20") {
                            pushinto(lilacboy, 0, 0, doc.data());
                        } else if (doc.data().Lilac.Age == "21~23") {
                            pushinto(lilacboy, 0, 1, doc.data());
                        } else if (doc.data().Lilac.Age == "24+") {
                            pushinto(lilacboy, 0, 2, doc.data());
                        } else {
                            pushinto(lilacboy, 0, 3, doc.data());
                        }
                    } else if (doc.data().User.Age < 24) {
                        if (doc.data().Lilac.Age == "20") {
                            pushinto(lilacboy, 1, 0, doc.data());
                        } else if (doc.data().Lilac.Age == "21~23") {
                            pushinto(lilacboy, 1, 1, doc.data());
                        } else if (doc.data().Lilac.Age == "24+") {
                            pushinto(lilacboy, 1, 2, doc.data());
                        } else {
                            pushinto(lilacboy, 1, 3, doc.data());
                        }
                    } else {
                        if (doc.data().Lilac.Age == "20") {
                            pushinto(lilacboy, 2, 0, doc.data());
                        } else if (doc.data().Lilac.Age == "21~23") {
                            pushinto(lilacboy, 2, 1, doc.data());
                        } else if (doc.data().Lilac.Age == "24+") {
                            pushinto(lilacboy, 2, 2, doc.data());
                        } else {
                            pushinto(lilacboy, 2, 3, doc.data());
                        }
                    }
                }
            });
            //1차 비교 (Dnt_M선택한 애들끼리 다 매칭해주기)
            let rest_gender = Age_Dnt_Matching(lilacboy, lilacgirl, couple);
            // 여자가남으면 girl, 남자가남으면 boy

            //2차 비교 (Dnt_M이 남은쪽을 다 매칭해주기)
            if (rest_gender == "girl")
                Age_Dnt_Last_Matching(lilacgirl, lilacboy, couple, trash);
            else if (rest_gender == "boy")
                Age_Dnt_Last_Matching(lilacboy, lilacgirl, couple, trash);

            // //마지막 비교 (마지막 Age조건애들 다 매칭해주기)
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    Age_All_matching(lilacboy, lilacgirl, i, j, couple, trash);
                }
            }
            console.log(peoplesum);
        });
    };

    function test(){
        console.log("hi");
    }

    const handlematch = () => {



        if (user) {

            let lilacgirl = [
                [[], [], [], []],
                [[], [], [], []],
                [[], [], [], []],
            ];
            let lilacboy = [
                [[], [], [], []],
                [[], [], [], []],
                [[], [], [], []],
            ];

            let couple = [[], []];
            let trash = [];

            const Matchingpromise = new Promise((resolve,reject) =>{
                MatchingSystem("Flosting_test삭제ㄴㄴ", lilacgirl, lilacboy, couple, trash);
                resolve(true);
            });

            Matchingpromise.then(() =>
            {
                let a = 5;
                console.log("hi");
            })


        
        }
    }



    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <h1>
                    매니저의 뜻
                </h1>
                <MatchButton onClick={handlematch}>
                    <h2>버스터 콜</h2>
                </MatchButton>
            </Container>
        </ThemeProvider>
    );
}

export default Manager;