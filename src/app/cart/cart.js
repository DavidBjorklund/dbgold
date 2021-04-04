import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Trashcan from '../../icons/trashcan.js';

import AppContextProvider, { AppContext } from '../';


const CartDiv = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 66.67vw;
  min-height: calc(100vh - 120px - 90px - 140px);
  a.button {
    float: right;
    margin-top: 15px;
  }
  @media(max-width: 1100px){
    width: 734px;
  }
  @media(max-width: 800px){
    width: 95vw;
    padding-bottom: 40px;
    p {
      overflow: hidden;
    }
  }
`;

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

const Add = styled.div`
  display: inline-block;
  line-height: 23px;
  vertical-align: middle;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-left: 8px;
  position: relative;
  &::before {
    content: "";
    width: 20px;
    height: 3px;
    border-radius: 2px;
    background-color: #14151c;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%)
  }
  &::after {
    content: "";
    height: 20px;
    width: 3px;
    border-radius: 2px;
    background-color: #14151c;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%)
    }
`;

const Subtract = styled.div`
  display: inline-block;
  line-height: 23px;
  vertical-align: middle;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  position: relative;
  &::before {
    content: "";
    width: 20px;
    height: 3px;
    border-radius: 2px;
    background-color: #14151c;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%)
  }
  &::after {

  }
`;


const Header2 = styled.h2`
  width: calc(100% - 200px);
  display: inline-block;
  @media(max-width: 800px){
    width: 100%;
    display: block;
  }
`;

const ClearCart = styled.p`
  text-align: right;
  display: inline-block;
  margin: 20px 0 10px;
  cursor: pointer;
  float: right;
  vertical-align: middle;
  @media(max-width: 800px){
    float: inherit;
    width: 200px;
    display: block;
    text-align: left;
    margin: 0;
    padding-bottom: 15px;
  }
  /*margin-left: calc(100% - 200px);*/
  svg {
    display: inline-block;
    height: 20px;
    margin-right: 5px;
    vertical-align: middle;
  }
`;

const BigSum = styled.h5`
  text-align: right;
`;

const Cart = () => {
  const { cart, setCart } = useContext(AppContext);
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => setWidth(window.innerWidth));
  let total = 0;
  cart.forEach((item, i)=>{
    total = total + item.price * item.amount;
  })
  function insert(str, index, value) {
    return str.substr(0, str.length + index) + value + str.substr(index);
  }
  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", "[]");
  }
  function addAmount(product){
    cart.forEach((item, i)=>{
      if(product.name==item.name){
        item.amount += 1;
      }
    })
    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify([...cart]));
  }
  function subtractAmount(product){
    cart.forEach((item, i)=>{
      if(product.name==item.name){
        if(item.amount==1){
          cart.splice(i, 1);
        } else{
          item.amount -= 1;
        }
      }
    })
    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify([...cart]));
  }
  return (
    <CartDiv>
      <Header2>Din Kundvagn:</Header2>
      {
        cart.length > 0 ?
        <>
          <ClearCart onClick={()=>clearCart()}><Trashcan/> Rensa Kundvagn</ClearCart>
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
                    <p className={"amount"}><Subtract onClick={()=>subtractAmount(item)} />{item.amount} st <Add onClick={()=>addAmount(item)} /></p>
                    <h5 className={"price"}>{insert(item.price.toString(), -6, " ").replace(".",",")} kr</h5>
                  </Specs>
                  </>
                :
                  <>
                  <h4 className="name">{item.name}</h4>
                  <p className={"amount"}><Subtract onClick={()=>subtractAmount(item)} />{item.amount} st <Add onClick={()=>addAmount(item)} /></p>
                  <h5 className={"price"}>{insert(item.price.toString(), -6, " ").replace(".",",")} kr</h5>
                  </>
                }
              </Item>
            )
          })}
          <BigSum className="big"><span className={"normal"}>Summa: </span>{insert(insert(total.toFixed(2), -6, " "),-10," ").replace(".",",")} kr</BigSum>
          <Link to="/kassa" className="button">Gå Till Kassan</Link>
          {/*<Header2>Rekommenderat:</Header2>*/}
        </>
         :
        <p>Din kundvagn är tom</p>
      }
    </CartDiv>
  )
}

export default Cart;
