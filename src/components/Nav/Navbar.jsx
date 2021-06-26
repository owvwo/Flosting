import '../../App.css'
import React from 'react';
import styled from 'styled-components';
import Navicon from './Navicon';
import Loginicon from './Loginicon';

const Nav = styled.nav`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    font-family: 'Lobster', cursive;
    font-size: 20px;
    border: 1.5px solid;
    padding: 5px;
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
      <Loginicon />
    </Nav>
  )
}

export default Navbar