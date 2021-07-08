import React from 'react';
import fire from './Register/LoginFire'

const AD = () =>{
    const user = fire.auth().currentUser;
    const ID = user.email.split('@');

    return(
        <div>
            <h3>지금 로그인되어있는 학번</h3>
            {user !== null && <p>{ID[0]}</p>}
            <h2>정우 치팅 ㄱ</h2>
        </div>
    );
};

export default AD;