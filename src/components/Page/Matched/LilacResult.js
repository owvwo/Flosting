import React, { useEffect, useState } from 'react';
import firebase from '../Register/LoginFire.js'

import StageZero from './StageZero.js';
import StageHalf from './StageHalf.js';
import StageSuccess from './StageSuccess.js';
import ReceivePerson from './ReceivePerson.js'
import Refused from './Refused.js'
import Refusing from './Refusing.js'
import NoReply from './NoReply.js';
import DidntReply from './DidntReply.js';
import BothDidnt from './BothDidnt.js';


function LilacResult(props){
    const db = firebase.firestore()
    const user = props.User;

    let 유저이메일 = null
    let 유저아이디 = null
    let [닉네임, 닉네임변경] = useState('');
    let [발전단계, 발전단계변경] = useState('');
    let [메세지보낸사람, 메세지보낸사람변경] = useState('');
    let [거절한사람, 거절한사람변경] = useState('');
    let [유저1, 유저1변경] = useState('');
    let [유저2, 유저2변경] = useState('');
    let [몇회차,몇회차변경] = useState();
    let [컬렉션, 컬렉션변경] = useState();
    let [문서번호,문서번호변경] = useState();
    let [남은시간, 남은시간변경] = useState();

    useEffect(()=>{
        if(user){
        
        const 현재까지 = Date.now()
        const 마감시간 = new Date('2021-07-16T10:00:00');
        const 마감까지 = 마감시간.getTime()
        남은시간변경(마감까지 - 현재까지)
        console.log(남은시간)
        유저이메일 = user.email
        console.log(user)
        유저아이디 = 유저이메일.split('@')[0];
        console.log(유저아이디)

        const promise_몇회차 = new Promise((resolve, reject) => {

            db.collection("회원정보").where("ID", "==", 유저아이디)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    몇회차변경(doc.data()['Ongoing'])
                });
            })
                resolve(몇회차);
        })

        const promise_닉네임 = new Promise((resolve, reject) => {

            db.collection("회원정보").where("ID", "==", 유저아이디)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    닉네임변경(doc.data()['User']['Nick'])
                });
            })
                resolve(닉네임);
        })

        Promise.all([promise_닉네임,promise_몇회차]).then((value) => {
            const collectionName = String(value[1]+'lilac') 
            컬렉션변경(collectionName)
            const Nickname = value[0]

            console.log(Nickname)
            console.log(collectionName)

            db.collection(collectionName).where("userOne.Nick", "==", Nickname)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    문서번호변경(doc.id)
                    유저1변경(doc.data()['userOne'])
                    유저2변경(doc.data()['userTwo'])
                    발전단계변경(doc.data()['stage'])
                    메세지보낸사람변경(doc.data()['메세지보낸사람'])
                    거절한사람변경(doc.data()['거절한사람'])
                
                });
            })
            if(발전단계 === ''){
                console.log('oo')
                db.collection(collectionName).where("userTwo.Nick", "==", Nickname)
                .get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        console.log(doc.data());
                        console.log(doc.id)
                        문서번호변경(doc.id)
                        유저1변경(doc.data()['userOne'])
                        유저2변경(doc.data()['userTwo'])
                        발전단계변경(doc.data()['stage'])
                        메세지보낸사람변경(doc.data()['메세지보낸사람'])
                        거절한사람변경(doc.data()['거절한사람'])
                    })
                })
            }
        })
        } // if문 끝
    }, [user, 닉네임, 발전단계])

    
    return(
        <div>
            {/* 신청 안한 사람한테 보여지는 화면 */}
            {
                발전단계 === '' && <div>유저 데이터 가져오는 중</div>
            }

            {/* 초기화면 */}
            {
                발전단계 === 'zero' && 남은시간>0
                && <StageZero 
                    유저1={유저1} 
                    유저2={유저2} 
                    컬렉션={컬렉션} 
                    문서번호={문서번호}
                    닉네임={닉네임}
                    남은시간={남은시간}
                    발전단계={발전단계}
                    메세지보낸사람={메세지보낸사람}
                    />
            }

            {/* 거절한사람한테 보여지는 화면 */}
            {
                발전단계 === 'end' && 거절한사람 === 닉네임 && 남은시간>0
                && <Refusing />
            }

            {/* 거절당한 사람한테 보여지는 화면 */}
            {
                발전단계 === 'end' && 거절한사람 != 닉네임 && 남은시간>0
                && <Refused />
            }

            {/* 메세지를 먼저 보낸사람한테 보여지는 화면 (시간남아있음)*/}
            {
                발전단계 === 'half' && 메세지보낸사람 === 닉네임 && 남은시간>0
                && <StageHalf 
                    유저1={유저1}  
                    유저2={유저2} 
                    컬렉션={컬렉션} 
                    문서번호={문서번호} 
                    닉네임={닉네임}
                    메세지보낸사람={메세지보낸사람}
                    남은시간={남은시간}/>
            }
            {/* 메세지를 먼저 보낸사람한테 보여지는 화면 (시간초과)*/}
            {
                발전단계 === 'half' && 메세지보낸사람 === 닉네임 && 남은시간<0
                && <NoReply 
                    유저1={유저1}  
                    유저2={유저2} 
                    컬렉션={컬렉션} 
                    문서번호={문서번호} 
                    닉네임={닉네임}
                    메세지보낸사람={메세지보낸사람}
                    남은시간={남은시간}/>
            }

            {/* 메세지를 먼저 받은 사람한테 보여지는 화면 (시간남아있음)*/}
            {
                발전단계 === 'half' && 메세지보낸사람 != 닉네임&& 남은시간>0
                && <ReceivePerson 
                    유저1={유저1}  
                    유저2={유저2} 
                    컬렉션={컬렉션} 
                    문서번호={문서번호} 
                    닉네임={닉네임}
                    메세지보낸사람={메세지보낸사람}
                    남은시간={남은시간}/>
            }
            {/* 메세지를 먼저 받은 사람한테 보여지는 화면 (시간초과 == 선톡씹음)*/}
            {
                발전단계 === 'half' && 메세지보낸사람 != 닉네임 && 남은시간<0
                && <DidntReply 
                    유저1={유저1}  
                    유저2={유저2} 
                    컬렉션={컬렉션} 
                    문서번호={문서번호} 
                    닉네임={닉네임}
                    메세지보낸사람={메세지보낸사람}
                    남은시간={남은시간}/>
            }

            {/* 매칭 성공 화면 */}
            {
                발전단계 === 'success' 
                && <StageSuccess
                유저1={유저1}  
                유저2={유저2} 
                컬렉션={컬렉션} 
                문서번호={문서번호} 
                닉네임={닉네임}
                메세지보낸사람={메세지보낸사람}
                남은시간={남은시간}/>
            }

            {
                발전단계 === 'zero' && 남은시간<0
                && <BothDidnt 
                    유저1={유저1}  
                    유저2={유저2} 
                    컬렉션={컬렉션} 
                    문서번호={문서번호} 
                    닉네임={닉네임}
                    메세지보낸사람={메세지보낸사람}
                    남은시간={남은시간}/>
            }


        </div>
    )
}
export default LilacResult;
