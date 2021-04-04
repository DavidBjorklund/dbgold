import React, { useState } from 'react';
import styled from 'styled-components';

import OpenIcon from '../../../icons/open-icon.js';

const QuestionDiv = styled.div`
  width: 600px;
  margin: 10px auto;
  background-color: #CBCBCB;
  position: relative;
  cursor: pointer;
  svg {
    position: absolute;
    right: calc(30px + 5%);
    top: 39px;
    transform: translate(50%, -50%);
  }
  h4 {
    padding: 20px 30px;
    text-align: left;
    width: 90%
  }
  p {
    display: none;
    background-color: #ECECEC;
    text-align: left;
    padding: 0 30px 30px;
  }
  ${props=>props.open && `
    background-color: #ECECEC;
    svg {
      transform: rotate(180deg) translate(-50%, 50%);
    }
    p {
      display: block;
    }
  `}
  @media(max-width: 667px){
    width: 90vw;
  }
`;

const Faq = ({children}) => {
  const [open, setOpen] = useState(false);
  return (
    <QuestionDiv open={open} onClick={()=>{setOpen(!open)}}>
      <OpenIcon />
      {children}
    </QuestionDiv>
  )
}

export default Faq;
