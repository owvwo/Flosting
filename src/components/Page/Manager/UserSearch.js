import React, { useEffect, useState } from 'react';
import firebase from '../Register/LoginFire';
import { Redirect, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import NowUser from './NowUser';

const Container = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    list-style : none;
`
const Input = styled.input`
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 3rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 290px;
  font-size: 1rem;
  border: 2px solid #E0BCC1;
  border-radius: 5px;
`;

const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 5px;
  border: ${props => {
        if (props.register) return 'none';
        else if (props.login) return '1px solid #E0BCC1';
    }};
  border-radius: 5px;
  height: 3rem;
  width: 300px;
  background-color: ${props => {
        if (props.register) return '#E0BCC1';
        else if (props.login) return '#FFFFFF';
    }};

  font-size: 15pt;
`;

const Parent = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    flex-direction: row;
    margin-top: 1rem;
    color: black;
    border-bottom : 1px solid rgb(0,0,0, 0.2);
    list-style : none;
    width: 70rem;

    .Nick{
        display: flex;
        align-items : center;
        justify-content : center;
        flex: 1;
        padding: 0.5rem;
        font-weight: 700;
    }
    .Phone{
        display: flex;
        align-items : center;
        justify-content : center;
        flex: 1;
        padding: 0.5rem;
        font-weight: 700;
    }
    .Univ{
        display: flex;
        align-items : center;
        justify-content : center;
        flex: 1;
        padding: 0.5rem;
        font-weight: 700;
    }
    .Age{
        display: flex;
        align-items : center;
        justify-content : center;
        flex: 1;
        padding: 0.5rem;
        font-weight: 700;
    }
    .Ongoing{
        display: flex;
        align-items : center;
        justify-content : center;
        flex: 1;
        padding: 0.5rem;
        font-weight: 700;
    }
}
`


function UserSearch(props) {

    const { isManager } = props;
    const [ID, setID] = useState("");
    const [isSearch, setisSearch] = useState(false);
    const db = firebase.firestore()
    const [사람, set사람] = useState([]);
    const [matchingList, setmatchingList] = useState([]);
    const [SubmitData, setSubmitData] = useState("");
    const [Refresh, setRefresh] = useState(false);
    const [UnivList, setUnivList] = useState("");
    const [girl, setgirl] = useState(0);
    const [boy, setboy] = useState(0);
    const [flosting1, setflosting1] = useState("");
    const [girl1, setgirl1] = useState(0);
    const [boy1, setboy1] = useState(0);
    const [univ1, setuniv1] = useState(0);
    const [univ2, setuniv2] = useState(0);
    const [univ3, setuniv3] = useState(0);
    const [univ4, setuniv4] = useState(0);

    useEffect(() => {
        setmatchingList(사람.map(list =>
            <Fade bottom>
                <NowUser U_Data={list.Data} Refresh={Refresh}>
                </NowUser>
            </Fade>
        ));
    }, [isSearch])

    useEffect(() => {
        let boysize = 0;
        let girlsize = 0;
        const checkUserOne = db.collection(`회원정보`).get()
            .then((querySnapshot) => {
                setUnivList(querySnapshot.size);
                querySnapshot.forEach((doc) => {
                    if (doc.data().User.Gender === "boy") {
                        boysize++;
                    } else {
                        girlsize++;
                    }
                });
                setboy(boysize);
                setgirl(girlsize);
            })
        let boysize2 = 0;
        let girlsize2 = 0;
        let univsize1 = 0;
        let univsize2 = 0;
        let univsize3 = 0;
        let univsize4 = 0;
        const checkUserTwo = db.collection(`Flosting_1`).get()
            .then((querySnapshot) => {
                setflosting1(querySnapshot.size);
                querySnapshot.forEach((doc) => {
                    if (doc.data().User.Gender === "boy") {
                        boysize2++;
                    } else {
                        girlsize2++;
                    }

                    if (doc.data().User.Univ === "단국대학교 죽전캠퍼스") {
                        univsize1++;
                    } else if (doc.data().User.Univ === "을지대학교 성남캠퍼스") {
                        univsize2++;
                    } else if (doc.data().User.Univ === "강남대학교") {
                        univsize3++;
                    } else {
                        univsize4++;
                    }
                });
                setboy1(boysize2);
                setgirl1(girlsize2);
                setuniv1(univsize1);
                setuniv2(univsize2);
                setuniv3(univsize3);
                setuniv4(univsize4);
            })
    }, [])



    const OnClickpush = async () => {
        const checkUserOne = await db.collection(`회원정보`).where("User.Name", "==", ID).get()
        try {
            checkUserOne.forEach((doc) => {
                사람.push({
                    'Nick': doc.data().User.Nick,
                    'Phone': doc.data().User.Phone,
                    'Univ': doc.data().User.Univ,
                    'Age': doc.data().User.Age,
                    'Ongoing': doc.data().Ongoing,
                    'ID': doc.data().ID,
                    'Data': doc.data()
                })
            });
        } catch (err) { console.log(err) }

        setisSearch(!isSearch);
    }


    const handlesetID = (e) => {
        setID(e.target.value);
    }


    if (!isManager) {
        return (<Redirect to='/' />);
    } else {
        return (
            <Container>
                <h1>현재 가입</h1>
                {UnivList}명
                <h3>남자</h3>
                {boy}명
                <h3>여자</h3>
                {girl}명
                <h1>1회차</h1>
                {flosting1}명
                <h3>남자</h3>
                {boy1}명
                <h3>여자</h3>
                {girl1}명
                <h3>단국대학교</h3>
                {univ1}명
                <h3>을지대학교</h3>
                {univ2}명
                <h3>강남대학교</h3>
                {univ3}명
                <h3>가천대학교</h3>
                {univ4}명
                <h1>유저 검색</h1>
                <li>이름 <Input
                    placeholder="이름 넣어"
                    onChange={handlesetID} /></li>


                <Button register onClick={OnClickpush}>
                    ㄱㄱ
                </Button>
                {
                    matchingList
                }
            </Container >
        )
    }
}
export default UserSearch;

