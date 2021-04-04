import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import AppContextProvider, { AppContext } from '../../';

import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';

import CartIcon from '../../../icons/shopping-cart.js';

const breakpoint = 800;

const NavDiv = styled.div`
  ${props => props.mobile && `
  position: absolute;
  top: 90px;
  width: 100vw;
  left: 0;
  background-color: #ffffff;
  border-bottom: #14151c 2px solid;
  padding: 0 0 20px;
  z-index: 20;
  div {
    display: block;
    padding: 10px 5vw;
    margin: 15px 0;
  };
  a {
    font-size: 21px;
    font-weight: 600;
  }
  svg {
    height: 32px !important;
  }
  `}
`;

const NavLink = styled.div`
  margin-left: 30px;
  display: inline-block;
  &:first-child {
    margin-left: 0;
  }
  a {
    position: relative;
    padding: 7px 15px;
  }
  a:hover {
    color: #4141DA;
    svg path {
      stroke: #4141DA;
    }
  }
  svg {
    height: 24px;
    margin-left: 10px;
    vertical-align: bottom;
  }
`;

const Span = styled.span`
  position: absolute;
  top: -10px;
  right: -2px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  width: 18px;
  background-color: red;
  font-size: 15px;
  color: #ffffff;
  border-radius: 100px;
`;

const Burgermenu = styled.div`
  position: absolute;
  top: 30px;
  right: 5vw;
  width: 30px;
  height: 20px;
  cursor: pointer;
  ${props => props.visible && `
    div:nth-child(1){
      transform: rotate(45deg);
      top: 8px;
    }
    div:nth-child(2){
      display: none;
    }
    div:nth-child(3){
      transform: rotate(-45deg);
      top: 8px;
    }
  `}
`;

const Bar = styled.div`
  position: absolute;
  width: 30px;
  transition: all 0.2s ease;
  height: 3px;
  background-color: #14151c;
  border-radius: 3px;
  &:nth-child(1){
    top: 0px;
  }
  &:nth-child(2){
    top: 8px;
  }
  &:nth-child(3){
    top: 16px;
  }
`;

const CartIcons = styled.div`
  position: absolute;
  top: 25px;
  right: 100px;
  span {
    right: -12px;
  }
`;

const Nav = ()=>{
  const {cart, setCart} = useContext(AppContext);
  const location = useLocation();
  let cartAmount = cart.length;
  cart.forEach((item, i)=>{
    cartAmount += item.amount - 1;
  })
  const { width } = useContext(AppContext)
  const [visible, setVisible] = useState(false);
  return (
    <>
    {width < breakpoint && <>
      <Burgermenu onClick={e=>{setVisible(!visible)}} visible={visible}>
        <Bar />
        <Bar />
        <Bar />
      </Burgermenu>
      <Link to="/kundvagn">
        <CartIcons>
          <CartIcon />
          {cart.length > 0 ? <Span cart={cart}>{cartAmount}</Span> : null}
        </CartIcons>
      </Link>
    </>}
    {
    ((width < breakpoint && visible) || (width > breakpoint)) &&
    <NavDiv mobile={width < breakpoint}>
      <NavLink className={location.pathname=="/"?"active":null}>
        <Link to="/" onClick={e=>{setVisible(false)}}>
          Hem
        </Link>
      </NavLink>
      <NavLink className={location.pathname.toLowerCase().includes("/produkter")&&"active"}>
        <Link to="/produkter" onClick={e=>{setVisible(false)}}>
          Produkter
        </Link>
      </NavLink>
      <NavLink className={location.pathname.toLowerCase().includes("/kundvagn")&&"active"}>
        <Link to="/kundvagn" onClick={e=>{setVisible(false)}}>
          Kundvagn
          <CartIcon />
          {
            cart.length > 0 ? <Span cart={cart}>{cartAmount}</Span> : null
          }
        </Link>
      </NavLink>
    </NavDiv>
    }
    </>
  )
}

export default Nav;


/*
<NavLink className={location.pathname.toLowerCase().includes("/om-oss")?"active":null}>
  <Link to="/om-oss">
    Om Oss
  </Link>
</NavLink>
*/
