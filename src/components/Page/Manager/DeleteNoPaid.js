import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import firebase from '../Register/LoginFire.js'
const db = firebase.firestore()
const Box = styled.div`
display: flex;
align-items: center;
justify-content : center;
border: 1px solid black;
height: 4rem;
maring-top: 1rem
`
const Info = styled.div`
font-size: 1.5rem;
`


function DeleteNoPaid(){

    let [init, setInit] = useState(false);
    let [회차, 회차변경] = useState();
    let [사형수, 사형수변경] = useState([]);
    let arr = []
    function onClick(){
        db.collection(`Flosting_${회차}`).where('Paid', '==', false).get().then((snapShot)=>{

            snapShot.forEach((doc)=>{
                if(doc.data().Cost>0){
                    arr.push({
                        '이름' : doc.data().User.Name,
                        '금액' : doc.data().Cost,
                        '번호' : doc.id
                    });
                }
            })
        }).then(()=>{사형수변경(arr);})
        setInit(true)
    }
    function handlerDelete(){
        사형수.map(person=>{
            console.log(person.번호)
            db.collection(`Flosting_${회차}`).doc(person.번호).delete()
        })
        alert('처형 끝')
    }

    return(
        <div>
            <input
                onChange={
                    function onChange(event){
                        회차변경(event.target.value)}}
                value={회차}
            />
            <button onClick={onClick}>{회차}회차에서의 미입금자들</button>
            {
                init
                ?
                <div>
                    <button onClick={handlerDelete}>날리기</button>
                    {
                        사형수.map(person=>{
                            return <List person={person} />
                        })
                    }
                </div>
                : null
            }
        </div>
    )
}

function List(props){
    let person = props.person

    return(
        <Box>
            <Info>
                {person.이름} : {person.금액}원
            </Info>
        </Box>
)
}
export default DeleteNoPaid;