import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import AppContextProvider, { AppContext } from '../../';


const Item = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  grid-gap: 15px;
  grid-template-rows: 80px;
  margin: 15px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(20,21,28,0.5);
  @media(max-width: 800px){
    display: grid;
    grid-template-columns: 80px 1fr 110px;
    grid-template-rows: 40px 40px;
    grid-template-areas: 'image name amount' 'image price amount';
    grid-gap: 0;
    img { grid-area: image; }
    .name { grid-area: name; padding: 8px 0; }
    .amount { grid-area: amount; padding: 26px 0; }
    .price { grid-area: price; line-height: 40px; }
  }
`;

const Info = styled.div`
  padding: 4px 0;
  overflow: hidden;
  /*display: inline-block;
  float: left;*/
  h4 {
    height: 30px;
    line-height: 30px;
  }
  p {

  }
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  /*display: inline-block;
  float: left;*/
`;

const Specs = styled.div`
  margin: auto 0;
  min-width: 200px;
  p {
    display: inline-block;
    padding-right: 20px;
    padding-top: 3px;
    cursor: default;
  }
  h5 {
    min-width: 120px;
    text-align: right;
    display: inline-block;
    float: right;
  }
  /*float: right;
  display: inline-block;*/
`;

const BigSum = styled.h5`
  text-align: right;
`;

const ConfirmCart = () => {
  const { cart } = useContext(AppContext);
  const { width } = useContext(AppContext);
  let total = 0;
  cart.forEach((item, i)=>{
    total = total + item.price * item.amount;
  })
  function insert(val, index, value) {
    let str = val.toString();
    return str.substr(0, str.length + index) + value + str.substr(index);
  }
  return (
    <>
    {cart.map(item=>{
      return (
        <Item key={item.name}>
          <Image src={item.image} alt={item.name}/>
          {width > 800 ?
            <>
            <Info>
              <h4 className="name">{item.name}</h4>
              <p className="small description">{item.description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat officia quibusdam repellat porro itaque."}</p>
            </Info>
            <Specs>
              <p className={"amount"}>{item.amount} st</p>
              <h5 className={"price"}>{insert(item.price * item.amount, -6, " ").replace(".",",")} kr</h5>
            </Specs>
            </>
          :
            <>
            <h4 className="name">{item.name}</h4>
            <p className={"amount"}>{item.amount} st</p>
            <h5 className={"price"}>{insert(item.price * item.amount, -6, " ").replace(".",",")} kr</h5>
            </>
          }
        </Item>
      )
    })}
    <BigSum>Summa: {insert(total, -6, " ").replace(".",",")}</BigSum>
    </>
  )
}
export default ConfirmCart;
