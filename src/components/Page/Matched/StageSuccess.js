import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import fire from '../Register/LoginFire.js'

import Footer from '../Footer';

const db = fire.firestore()

function StageSuccess(){
    return(
        <div>StageSuccess</div>
    )
}
export default StageSuccess;