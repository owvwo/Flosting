import React, {useState} from 'react';
import styled from 'styled-components';
import fire from '../Register/LoginFire'

const Container = styled.div`
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input.attrs(props => ({
    type: "text",
}))`
  line-height: 3rem;
  padding-left: 10px;
  margin: 5px;
  height: 3rem;
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
  color: ${props => {
        if (props.register) return '#FFFFFF';
        else if (props.login) return '#828282';
    }};
  font-size: 15pt;
`;

const Loginbar = () => {

    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const clearErrors = () => {
        setPasswordError('');
        setEmailError('');
    }

    const handleLogin = () => {
        clearErrors();
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    return (
        <Container>
            <Input
                placeholder="학번"
                onChange={(e) => {setEmail(e.target.value + "@flosting.com")}}
            />
            <p> {emailError}</p>
            <Input
                placeholder="비밀번호"
                onChange={(e) => {setPassword(e.target.value)}}
            />
            <p> {passwordError}</p>
            <Button register onClick={handleLogin}>
                로그인
            </Button>
        </Container>
    )
}

export default Loginbar;