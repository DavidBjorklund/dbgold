import React, { useContext } from 'react';
import { CheckoutContext } from '../';

import styled from 'styled-components';

const Label = styled.label`
  z-index: 3;
  background-color: #ffffff;
  font-size: 17px;
  font-weight: 600;
  position: relative;
  left: 11px;
  top: 10px;
  padding: 0px 5px;
  ${props => props.error && "color: red;"}
`;

const InputDiv = styled.div`
  position: relative;
  width: 90vw;
  max-width: 400px;
`;

const Input = styled.input`
  display: block;
  width: 90vw;
  max-width: 400px;
  font-size: 17px;
  font-family: "open-sans", sans-serif;
  border: 1px solid #14151c;
  outline: none;
  padding: 8px 15px;
  border-radius: 3px;
  margin-bottom: 15px;
  transition: all 0.2s ease;
  position: relative;
  ${props => props.error && "border-color: red !important;"}
  &:focus {
    border-color: #4141DA;
  }
  &.error {
    border-color: red !important;
  }
  &.success {
    border-color: green !important;
  }
  &.warning {
    border-color: yellow !important;
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  height: 36px;
  left: 150px;
  top: 60px;
  background-color: red;
  width: 300px;
  border-radius: 2px;
  z-index: 20;
  p {
    line-height: 36px;
    vertical-align: middle;
    color: #ffffff;
    text-align: center;
  }
  &::after {
    content: "";
    position: absolute;
    left: 5%;
    top: -10px;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent red transparent;
  }
  left: 40px;
`;

const InputMonth = styled.input`
  position: absolute;
  top: 10px;
  right: 90px;
  z-index: 3;
  display: block;
  width: 70px;
  font-size: 17px;
  font-family: "open-sans", sans-serif;
  outline: none;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  transition: all 0.2s ease;
  ${props=>props.error && `
    color: red;
    &::placeholder {
      color: red;
    }
  `}
`;

const InputCvc = styled.input`
  position: absolute;
  top: 10px;
  right: 15px;
  z-index: 3;
  display: block;
  width: 50px;
  font-size: 17px;
  background-color: transparent;
  font-family: "open-sans", sans-serif;
  border: none;
  outline: none;
  border-radius: 3px;
  transition: all 0.2s ease;
  ${props=>props.error && `
    color: red;
    &::placeholder {
      color: red;
    }
  `}
`;


const CreditForm = () => {
  const { credit, setCredit } = useContext(CheckoutContext);
  const { creditError, setCreditError } = useContext(CheckoutContext);
  const { monthYear, setMonthYear } = useContext(CheckoutContext);
  const { monthYearError, setMonthYearError } = useContext(CheckoutContext);
  const { cvc, setCvc } = useContext(CheckoutContext);
  const { cvcError, setCvcError } = useContext(CheckoutContext);
  const regexCredit = /^[0-9\s]*$/;
  function testCredit(e){
    if (e.target.value === '' || regexCredit.test(e.target.value)) {
      console.log(e.target.value, e.target.value.slice(-1), e.target.value.slice(-1)===' ')
      if(e.target.value.length>credit.length && e.target.value.slice(-1) === ' '){
        return "removed";
      }else{
        e.target.value.length < 20 && ((e.target.value.length===4 || e.target.value.length===9||e.target.value.length===14) ? (e.target.value.length < credit.length) ? setCredit(e.target.value.slice(0,-1)) : setCredit(e.target.value + ' ') : setCredit(e.target.value))
        creditError && e.target.value.length === 19 && setCreditError(false);
      }
    }
  }
  const regexMonthYear = /^[0-9\s].*$|/;
  function testMonthYear(e){
    if (e.target.value === '' || regexMonthYear.test(e.target.value)) {
      console.log(e.target.value, e.target.value.slice(-1), e.target.value.slice(-1)===' ')
      if(e.target.value.length>monthYear.length && (e.target.value.slice(-1) === ' / '||e.target.value.slice(-1) === '/')){
        return "removed";
      }else{
        e.target.value.length < 8 && (e.target.value.length===2 || e.target.value.length===2 || e.target.value.length===4 ? (e.target.value.length < monthYear.length) ? setMonthYear(e.target.value.slice(0,-3)) : setMonthYear(e.target.value + ' / ') : setMonthYear(e.target.value))
        monthYearError && e.target.value.length === 7 && setMonthYearError(false);
      }
    }
  }
  const regexCvc = /^[0-9\b]+$/;
  function testCvc(e){
    if (e.target.value === '' || regexCvc.test(e.target.value)) {
      e.target.value.length < 6 && setCvc(e.target.value);
      cvcError && e.target.value.length === 3 && setCvcError(false);
    }
  }
  return (
    <>
    <h4>Dina Uppgifter:</h4>
    <form>
      <Label error={creditError} htmlFor="credit">Kreditkort:
      {(creditError || monthYearError || cvcError) && <ErrorMessage>
        <p>Fyll i kreditkortet.</p>
      </ErrorMessage>}
      </Label>
      <InputDiv>
      <Input error={creditError} type="text" name="credit" placeholder="0000 0000 0000 0000" value={credit} onChange={e=>{testCredit(e)}} pattern="[0-9]*" inputmode="numeric"></Input>
      <InputMonth error={monthYearError} type="text" name="monthYear" placeholder="MM / YY" value={monthYear} onChange={e=>{testMonthYear(e)}} pattern="[0-9]*" inputmode="numeric" />
      <InputCvc error={cvcError} type="text" name="monthYear" placeholder="CVC" value={cvc} onChange={e=>{testCvc(e)}} pattern="[0-9]*" inputmode="numeric" />
      </InputDiv>
    </form>
    </>
  )
}

export default CreditForm;
