import React, { useState, createContext, useContext } from 'react';
import styled from 'styled-components';
import FourOFour from '../fourofour';
import AppContextProvider, { AppContext } from '../';

import PersonalForm from './personalForm';
import CreditForm from './creditForm';
import ConfirmCart from './confirmCart';

/*    Styled Components Start     */

const CheckoutDiv = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 66.67vw;
  min-height: calc(100vh - 120px - 90px - 140px);
  a.button {
    float: right;
    margin-top: 15px;
  }
  @media(max-width: 800px){
    padding: 40px 5vw;
    width: 100vw;
  }
`;

const ProgressBar = styled.div`
  margin-top: 30px;
  height: 2px;
  width: 90vw;
  max-width: 400px;
  background-color: #666;
  position: relative;
`;

const Progress = styled.div`
  position: absolute;
  top: -7px;
  width: 16px;
  height: 16px;
  border-radius: 15px;
  background-color: #666;
  cursor: pointer;
  &:nth-child(1){
    left: 0px;
  }
  &:nth-child(2){
    /*left: 127.5px;*/
    left: 32%;
  }
  &:nth-child(3){
    /*left: 255px;*/
    left: 64%;
  }
  &:nth-child(4){
    /*left: 385px;*/
    left: 96%;
  }
  &::before {
    content: "";
    position: absolute;
    top: 3px;
    right: 3px;
    bottom: 3px;
    left: 3px;
    background-color: #ffffff;
    border-radius: 15px;
  }
`;

/*    Styled Components End     */

export const CheckoutContext = createContext();

const Checkout = () => {
  const {cart, setCart} = useContext(AppContext);
  // ÄNDRA 1 och 1 till andra tal för att börja på en annan sida!!!
  const [progress, setProgress] = useState(1);
  function nextProgress(){
    let next = 1;
    //Go to the next page
    switch(progress){
      case 1:
        next = progress + 1;
        break;
      case 2:
        //Test if Data is Valid
        if(name.length > 1 && adress.length > 3 && postkod.length === 5){
          next = progress + 1;
        }else {
          //Set Errors
          name.length <= 1 && setNameError(true);
          adress.length < 3 && setAdressError(true);
          postkod.length !== 5 && setPostkodError(true);
          next = 2;
        }
        break;
      case 3:
        if(credit.length === 19 && monthYear.length === 7 && cvc.length === 3){
          next = progress + 1;
        }else {
          credit.length < 19 && setCreditError(true);
          monthYear.length < 7 && setMonthYearError(true);
          cvc.length < 3 && setCvcError(true);
          next = 3;
        }
        break;
      case 4:
        next = progress;
        alert("klar")
        break;
    }
    setProgress(next);
  }
  //PersonalForm Data
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [adress, setAdress] = useState("");
  const [adressError, setAdressError] = useState(false);
  const [postkod, setPostkod] = useState("");
  const [postkodError, setPostkodError] = useState(false);


  const [credit, setCredit] = useState("");
  const [creditError, setCreditError] = useState(false);
  const [monthYear, setMonthYear] = useState("");
  const [monthYearError, setMonthYearError] = useState(false);
  const [cvc, setCvc] = useState("");
  const [cvcError, setCvcError] = useState(false);
  function testProgress(num){
    if(progress!==4 && num<progress){
      setProgress(num);
    }
  }
  return (
    <>
    {(!cart[0] && <FourOFour />) ||
    <CheckoutDiv>
      <h2>{(progress===4 && `Tack ${name || "kompis"}, din order är nu slutförd!`)||"Kassa - Slutför din order:"}</h2>
      {
        progress == 1 && <>
        <h3>Bekräfta din order:</h3>
        <ConfirmCart />
        </>
      }
      {
        progress == 2 &&  <CheckoutContext.Provider value={{name, setName, adress, setAdress, postkod, setPostkod, nameError, setNameError, adressError, setAdressError, postkodError, setPostkodError}}>
        <PersonalForm />
        </CheckoutContext.Provider>
      }
      {
        progress == 3 && <CheckoutContext.Provider value={{credit, setCredit, creditError, setCreditError, monthYear, setMonthYear, monthYearError, setMonthYearError, cvc, setCvc, cvcError, setCvcError}}>
        <CreditForm />
        </CheckoutContext.Provider>
      }
      {
        progress == 4 && <>
          <h4>Du har beställt:</h4>
          <ul>{cart.map(product=><li>{product.name}</li>)}</ul>
          <p class="spaceTop">Till {<strong>{adress}</strong> || "din adress"}, {<strong>{postkod}</strong> || "och din postkod"}.</p>
          <p class="spaceTop">Betalningen gjordes av ett kreditkort med de sista fyra sifforna: <strong>{credit.slice(-4)}</strong>.</p>
        </>
      }
      {progress !== 4 &&<button onClick={nextProgress}>{(progress===1 && "Bekräfta") || "Gå Vidare"}</button>}
      <ProgressBar>
        <Progress className={progress===1?"current":null} onClick={()=>testProgress(1)}/>
        <Progress className={progress===2?"current":null} onClick={()=>testProgress(2)}/>
        <Progress className={progress===3?"current":null} onClick={()=>testProgress(3)}/>
        <Progress className={progress===4?"current":null} onClick={()=>testProgress(4)}/>
      </ProgressBar>
    </CheckoutDiv>
    }
    </>
  )
}

export default Checkout;
