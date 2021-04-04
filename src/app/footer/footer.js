import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppContextProvider, { AppContext } from '../';

const breakpoint = 800;

const FooterDiv = styled.div`
  margin-top: 140px;
  height: 90px;
  width: 100vw;
  background-color: #ECECEC;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 60px;
  ${props => props.mobile && `
    padding: 25px 5vw;
  `}
  a {
    height: 40px;
    padding: 11px 0;
    font-weight: 600;
    font-size: 17px;
  }
`;

const Footer = () => {
  const { width } = useContext(AppContext);
  return (
    <FooterDiv mobile={width < breakpoint}>
      <Link to="/">
        DBGold
      </Link>
      <a target="_blank" href="https://dbjorklund.se/">&copy; David Björklund, 2021</a>
    </FooterDiv>
  )
}

export default Footer;
