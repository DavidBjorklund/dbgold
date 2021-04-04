import React, { useContext } from 'react';
import styled from 'styled-components';

import AppContextProvider, { AppContext } from '../';

import Logo from './logo';
import Nav from './nav';

const breakpoint = 800;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 60px;
  width: 100vw;
  height: 120px;
  ${props => props.mobile && `
    padding: 30px 5vw;
    height: 90px;`}
`;

const Header = ()=>{
  const { width } = useContext(AppContext)
  const { cart, setCart } = useContext(AppContext);
  return (
    <HeaderDiv mobile={width < breakpoint}>
      <Logo/>
      <Nav />
    </HeaderDiv>
  )
}

export default Header;
