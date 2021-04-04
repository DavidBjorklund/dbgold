import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoDiv = styled.div`

`;

const LogoLink = styled.div`
  margin-left: 30px;
  display: inline-block;
  font-weight: 600;
  font-size: 21px;
  &:first-child {
    margin-left: -15px;
  }
  a {
    padding: 7px 15px;
  }
  a:hover {
    color: #4141DA;
  }
`;

const Logo = ()=>{
  return (
    <LogoDiv>
      <LogoLink>
        <Link to="/">DBGold</Link>
      </LogoLink>
    </LogoDiv>
  )
}

export default Logo;
