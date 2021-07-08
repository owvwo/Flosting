import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { firstTerm } from './FirstTerm'
import { SecondTerm } from './SecondTerm'
import{NavLink} from 'react-router-dom';

const Boldtheme = createMuiTheme({
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


const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 2rem 0;
  border: ${props => {
    if (props.register) return 'none';
    else if(props.login) return '1px solid #E0BCC1';
  }};
  border-radius: 5px;
  height: 3rem;
  width: 100%;
  background-color: ${props => {
    if (props.register) return '#E0BCC1';
    else if(props.login) return '#FFFFFF';
  }};
  color: ${props => {
    if (props.register) return '#FFFFFF';
    else if(props.login) return '#828282';
  }};
  opacity: ${props => {
    if (props.disabled) return '0.5';
    else return '1.0';
  }};
  cursor: ${props => {
    if (props.disabled) return 'default';
    else return 'pointer'
  }};
  
`;

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    margin: 3rem 2rem;
    padding: 0.5rem 1rem;
    background: rgba(224, 188, 193, 0.2);
    border-radius: 10px;
    border: 2px solid #D1D1D1;
    

    h1{
        margin-top: 1rem;
        font-weight: 700;
        font-size: 1.5rem;
    }
`;

const ScrollBox = styled.div`
    overflow: scroll;
    height: 150px;
    width: 100%;
    border: 2px solid #D1D1D1;
    border-radius: 10px;
    padding : 8px;
    background : #F7F7F7;

    p{
        margin : 0px;
        font-size: 0.5rem;
    }

`;
const SmallScrollBox = styled.div`
    overflow: scroll;
    height: 50px;
    width: 100%;
    border: 2px solid #D1D1D1;
    border-radius: 10px;
    padding : 8px;
    background : #F7F7F7;

    p{
        margin : 0px;
        font-size: 0.5rem;
    }

`;
const CheckContainer = styled.div`
    display: flex;
    p{
        font-size : 10px;
    }
`
function Register({ auth_regis, S_name, S_num }) {

    const [allchecked, setCheckedAll] = React.useState(false);
    const [achecked, setCheckedA] = React.useState(false);
    const [bchecked, setCheckedB] = React.useState(false);
    const [cchecked, setCheckedC] = React.useState(false);
    const [disabledcheck, setDC] = React.useState(true);

    function goNext () {
        if(achecked && bchecked && cchecked)
            setDC(true);
        else
            setDC(false);
    }

    
    const handleallChecked = (event) => {
        setCheckedAll(!allchecked);
        if(!allchecked){
            setCheckedA(true);
            setCheckedB(true);
            setCheckedC(true);
        }else{
            setCheckedA(false);
            setCheckedB(false);
            setCheckedC(false);
        }
        goNext();
      };


    if (!auth_regis) { return (<Redirect to='/register' />); }
    else {
        return (
            <ThemeProvider theme={Boldtheme}>
                <Container>
                    <h1>
                        약관 동의
                    </h1>
                    <CheckContainer>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={allchecked}
                                    onChange={handleallChecked}
                                    name="checkedall"
                                    size="small"
                                />
                            }
                            label="약관에 모두 동의합니다."
                        />
                    </CheckContainer>
                    {/* 서비스 이용약관 동의 내용 */}
                    <CheckContainer>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={achecked}
                                    onChange={() => setCheckedA(!achecked)}
                                    name="checkedA"
                                    size="small"
                                />
                            }
                            label="서비스 이용약관 동의 (필수)"
                        />
                    </CheckContainer>
                    {achecked ? (
                        ""
                    ) : (
                        <ScrollBox>
                            {firstTerm.split("\n").map((line) => { return (<p>{line}<br /></p>); })}
                        </ScrollBox>
                    )}
                    {/* 개인정보 수집 및 이용 동의 내용 */}
                    <CheckContainer>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={bchecked}
                                    onChange={() => setCheckedB(!bchecked)}
                                    name="checkedB"
                                    size="small"
                                />
                            }
                            label="개인정보 수집 및 이용 동의 (필수)"
                        />
                    </CheckContainer>
                    {bchecked ? (
                        ""
                    ) : (
                        <ScrollBox>
                            {SecondTerm.split("\n").map((line) => { return (<p>{line}<br /></p>); })}
                        </ScrollBox>
                    )}
                    {/* 만 14세 이상 */}
                    {/* 개인정보 수집 및 이용 동의 내용 */}
                    <CheckContainer>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={cchecked}
                                    onChange={() => setCheckedC(!cchecked)}
                                    name="checkedC"
                                    size="small"
                                />
                            }
                            label="만 14세 이상입니다."
                        />
                    </CheckContainer>
                    {cchecked ? (
                        ""
                    ) : (
                        <SmallScrollBox>
                            <p>플로스팅은 국내 대학생을 위한 서비스이며, 본인 인증을 통해 만 14세 이상만 가입할 수 있습니다.</p>
                        </SmallScrollBox>
                    )}
                <NavLink to ='/register/last'>
                <Button disabled={disabledcheck} register>
                    휴대폰 인증
                </Button>
                </NavLink>
                </Container>
            </ThemeProvider>


        );
    }
}


export default Register;