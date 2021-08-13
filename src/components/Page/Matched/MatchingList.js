import React, { useEffect, useState } from 'react';
import firebase from '../Register/LoginFire.js'
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .ProfileWrap{
        display: flex;
    }
`

const Parent = styled.div`
display: flex;
flex-direction: row;
margin-top: 1rem;
color: black;
border : 1px solid black;
`
const Nick = styled.div`
width: 6rem;
height: 2rem;
background-color: yellow;
`
const Stage = styled.div`
text-align: center;
width: 10rem;
background-color: grey;
`
function MatchingList(props){
    const db = firebase.firestore()
    const user = props.User;
    const { sort } = useParams();

    let [Ongoing,setOngoing]= useState();
    let [uniqueKey,setUniqueKey] = useState();
    let [매칭결과배열, 매칭결과배열변경] = useState([]);
    let copy매칭결과배열 = [];

    // 회원정보에서 user의 Ongoing & Nickname 읽어오는 함수
    const getUserOngoingAndNick = async() => {
        const snapShot = await db.collection('회원정보').where("ID","==",user.email.split('@')[0]).get()
        try{
            snapShot.forEach((doc)=>{
                setOngoing(doc.data()['Ongoing'])
                setUniqueKey(doc.data()['User']['Unique_key'])
            })
        }catch(err){console.log(err)}
    }
    //유저의 닉네임과 일치하는 매칭결과 찾아오는 함수(1)
    const userChecker = async () => {
        const checkUserOne = await db.collection(`${Ongoing}${sort}`).where("userOne.Unique_key", "==", uniqueKey).get()
        try {
            checkUserOne.forEach((doc) => {
                copy매칭결과배열.push({
                    'Nick': doc.data()['userTwo']['Nick'], 
                    'Stage': doc.data()['stage'],
                    'Unique_key': doc.data()['userTwo']['Unique_key'],
                    'DocId': doc.id
                })                

            });
        } catch (err) { console.log(err) }

        const checkUserTwo = await db.collection(`${Ongoing}${sort}`).where("userTwo.Unique_key", "==", uniqueKey).get()
        try{
            checkUserTwo.forEach((doc) => {
                copy매칭결과배열.push({
                    'Nick': doc.data()['userOne']['Nick'], 
                    'Stage': doc.data()['stage'],
                    'Unique_key': doc.data()['userOne']['Unique_key'],
                    'DocId': doc.id

                })
            });
        } catch (err) { console.log(err) }
    }

    useEffect(()=>{
    if(user){
        getUserOngoingAndNick();
        if(Ongoing && uniqueKey){
            userChecker().then(_=>{
                매칭결과배열변경(copy매칭결과배열)
            })
        }
    }
    },[user, Ongoing, uniqueKey])

    let matchingList = 매칭결과배열.map(list =>
        <Fade bottom>
            <NavLink to = {`/selectresult/${sort}/${Ongoing}/${list.DocId}`} style={{ textDecoration: 'none' }}>
                <Parent>
                    <Nick >
                        {list.Nick}
                    </Nick>
                    <Stage >
                        {list.Stage}
                    </Stage>
                </Parent>
            </NavLink>
        </Fade>
    )

    return(

        <Container>

            <div>
                매칭된 사람은 총 {매칭결과배열.length}명입니다.
            </div>
            {
                matchingList
            }
            {sort}
        </Container>
    )
}
export default MatchingList;
