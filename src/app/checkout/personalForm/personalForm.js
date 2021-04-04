import React, { useContext } from 'react';
import { CheckoutContext } from '../';

import styled from 'styled-components';

const Label = styled.label`
  position: relative;
  background-color: #ffffff;
  font-size: 17px;
  font-weight: 600;
  position: relative;
  left: 11px;
  top: 10px;
  padding: 0px 5px;
  ${props => props.error && "color: red;"}
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
    left: 30px;
    top: -10px;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent red transparent;
  }
  @media(max-width: 800px){
    left: 40px;
  }
`;

const PersonalForm = () => {
  const { name, setName } = useContext(CheckoutContext);
  const { adress, setAdress } = useContext(CheckoutContext);
  const { postkod, setPostkod } = useContext(CheckoutContext);
  const { nameError, setNameError } = useContext(CheckoutContext);
  const { adressError, setAdressError } = useContext(CheckoutContext);
  const { postkodError, setPostkodError } = useContext(CheckoutContext);
  const re = /^[0-9\b]+$/;
  const testNameError = () => {
    (nameError && name.length >= 1) && setNameError(false);
  }
  const testAdressError = () => {
    adressError && adress.length > 2 && setAdressError(false);
  }
  function testPostkod(e){
    if (e.target.value === '' || re.test(e.target.value)) {
      e.target.value.length < 6 && setPostkod(e.target.value);
      postkodError && e.target.value.length === 5 && setPostkodError(false);
    }
  }
  return (
    <>
    <h4>Dina Uppgifter:</h4>
    <form>
      <Label error={nameError} htmlFor="name">Namn:
      {nameError && <ErrorMessage>
        <p>Namnet måste vara längre.</p>
      </ErrorMessage>}
      </Label>
      <Input error={nameError} type="text" name="name" placeholder="Ditt namn" value={name} onChange={e=>{setName(e.target.value);testNameError()}}></Input>
      <Label error={adressError} htmlFor="adress">Adress:
      {!nameError && adressError && <ErrorMessage>
        <p>Adressen måste vara längre.</p>
      </ErrorMessage>}
      </Label>
      <Input error={adressError} type="text" name="adress" placeholder="Din adress" value={adress} onChange={e=>{setAdress(e.target.value);testAdressError()}}></Input>
      <Label error={postkodError} htmlFor="postkod">Postkod:
      {!nameError && !adressError && postkodError && <ErrorMessage>
        <p>Postkoden måste vara 5-siffrig.</p>
      </ErrorMessage>}
      </Label>
      <Input error={postkodError} type="text" name="postkod" placeholder="Din postkod" value={postkod} onChange={e=>{testPostkod(e)}} pattern="[0-9]*" inputmode="numeric"></Input>
    </form>
    </>
  )
}

export default PersonalForm;
