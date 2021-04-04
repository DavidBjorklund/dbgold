import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Faq from './faq';

const SurroundDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 60px;
  width: 100vw;
  @media(max-width: 800px){
    padding: 40px 5vw;
  }
  ${props=>props.fullHeight && `
    min-height: calc(100vh - 120px);
  `}
`;

const TextSection = styled.div`
  width: 100%;
  padding-top: calc(50vh - 140px - 150px);
  text-align: center;
  h1 {
    max-width: 600px;
    margin: 0 auto;
    font-weight: 800;
    padding-bottom: 30px;
  }
  h2 {
    max-width: 600px;
    margin: 0 auto;
    padding-bottom: 15px;
  }
  p {
    max-width: 600px;
    margin: 0 auto;
  }
  @media(max-width: 800px){
    text-align: left;
    h1, p {
      text-align: left;
    }
  }
`;

const Home = ()=>{
  return (
    <>
      <SurroundDiv fullHeight>
        <TextSection>
          <h1>Vi erbjuder guld och silver av högsta kvalitet.</h1>
          <Link to="/produkter" className="button">Se Våra Produkter</Link>
        </TextSection>
      </SurroundDiv>
      <SurroundDiv>
        <TextSection>
          <h5>Vilka är DBGold?</h5>
          <h2>Vi är Sveriges största guldleverantör.</h2>
          <p>I mer än 30 år har vi rankat som kundens favorit när det gäller att handla guld och silver, anledningen till det är våra grymma marknadspriser, kundservice och kvalitetsförsäkring.</p>
        </TextSection>
      </SurroundDiv>
      <SurroundDiv>
        <TextSection>
          <h2>Ofta ställda frågor:</h2>
          <Faq>
            <h4>Har ni garantier på guldleveransen?</h4>
            <p>Självklart!</p>
          </Faq>
          <Faq>
            <h4>Varifrån kommer ert guld?</h4>
            <p>Vårt guld kommer direkt ifrån Europas guldhjärta: Schweiz!</p>
          </Faq>
        </TextSection>
      </SurroundDiv>
      <SurroundDiv>
        <TextSection>
          <h2>Dags att fylla dina kassaskåp!</h2>
          <Link to="/produkter" className="button">Visa våra produkter</Link>
        </TextSection>
      </SurroundDiv>
    </>
  )
}

export default Home;
