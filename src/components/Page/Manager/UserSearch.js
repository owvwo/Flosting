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

    useEffect(() => {
        setmatchingList(사람.map(list =>
            <Fade bottom>
                <Parent>
                    <div className="ID">
                        <li>{list.ID}</li>
                    </div>
                    <div className="Nick">
                        <li>{list.Nick}</li>
                    </div>
                    <div className="Phone">
                        <li>{list.Phone}</li>
                    </div>
                    <div className="Univ">
                        <li>{list.Univ}</li>
                    </div>
                    <div className="Age">
                        <li>{list.Age}</li>
                    </div>
                    <div className="Ongoing">
                        <li>{(list.Ongoing !== "") ? list.Ongoing + "회차" : "신청안함"}</li>
                    </div>
                </Parent>
                <NowUser U_Data={list.Data} SubmitData={SubmitData}>

                </NowUser>
            </Fade>
        ));
    }, [isSearch])



    const OnClickpush = async () => {
        사람.pop();
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
                // if (doc.data().Ongoing != 0) {
                //     const checkUserOne = db.collection(`Flosting_` + String(doc.data().Ongoing)).where("User.Nick", "==", doc.data().User.Nick).get()
                //         .then((querySnapshot) => {
                //             querySnapshot.forEach((doc) => {
                //                 사람[0]
                //             });
                //         })
                // }
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

