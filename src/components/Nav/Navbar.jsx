import '../../App.css'
import React from 'react';
import styled from 'styled-components';
import Navicon from './Navicon';

const Nav = styled.nav`
  width: 100%;
  height: 70px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
    font-family: 'Lobster', cursive;
    font-size: 30px;
    border: 2px solid;
    padding: 10px;
    margin: 5px;
  }
`

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
        Flosting
      </div>
      <Navicon />
    </Nav>
  )
}

export default Navbar