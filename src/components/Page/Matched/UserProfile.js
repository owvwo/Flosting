import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../Footer';
import fire from '../Register/LoginFire.js'
import profileImageBoy from '../../../images/profile_boy_default.png';
import profileImageGirl from '../../../images/profile_girl_default.png';
const db = fire.firestore()

const Container = styled.div`

`


function UserProfile(){
    let { Nick } = useParams();
    useEffect(()=>{

    },[])

    return(
        <Container>
            {Nick}님의 프로필을 보여주는 창입니다.
        </Container>
    )
}
export default UserProfile;
