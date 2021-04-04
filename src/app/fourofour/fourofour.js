import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 60px;
  width: 100vw;
  min-height: calc(100vh - 120px - 90px - 140px);
`;

const TextSection = styled.div`
  width: 100%;
  padding-top: calc(50vh - 140px - 100px);
  text-align: center;
  * {
    text-align: center;
  }
  h1 {
    max-width: 600px;
    margin: 0 auto;
    font-weight: 800;
    padding-bottom: 15px;
  }
`;

const FourOFour = () => {
  return (
    <HomeDiv>
      <TextSection>
        <h1>404, Sidan finns inte!</h1>
        <Link to="/" className="button">Gå Till Startsidan</Link>
      </TextSection>
    </HomeDiv>
  )
}

export default FourOFour;
