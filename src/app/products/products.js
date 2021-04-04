import React, { useState, onEffect, useContext } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import history from '../../history.js';

import AppContextProvider, { AppContext } from '../';

import ProductGrid from './productGrid';
import Product from './product';


import allProducts from './allProducts';

const breakpoint = 800;

const ProductsDiv = styled.div`
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 120px auto;
  grid-template-areas: '. header' 'sort display';
  margin: 0 auto;
  width: 80vw;
  padding-bottom: 60px;
  min-height: 600px;
  @media(max-width: 800px){
    grid-template-areas: 'header' 'sort' 'display';
    grid-template-columns: 1fr;
    grid-template-rows: 120px auto auto;
    width: 90vw;
  }
`;

const SortDiv = styled.div`
  grid-area: sort;
  height: 300px;
  @media(max-width: 800px){
    height: auto;
    padding-bottom: 30px;
  }
`;

const DisplayDiv = styled.div`
  grid-area: display;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  grid-auto-rows: calc(80vw * 0.75 * 0.33);
  @media(max-width: 800px){
    grid-template-columns: auto;
    grid-auto-columns: 300px;
    grid-auto-rows: 300px;
    div {
      max-width: 90vw;
    }
  }
`;

const Header = styled.h1`
  grid-area: header;
  @media(max-width: 800px){
    padding-top: 30px;
  }
`;

const Input = styled.div`
  width: 66%;
  padding-top: 12px;
  * {
    display: inline-block;
  }
  input {
    float: right;
    width: 18px;
    height: 18px;
    margin-top: 5px;
  }
`;

const Products = ()=>{
  const {cart, setCart} = useContext(AppContext);
  const { width } = useContext(AppContext)
  const [gold,setGold] = useState(true)
  const goldClick = ()=>{
    setGold(!gold);
  }
  const [silver,setSilver] = useState(true)
  const silverClick = ()=>{
    setSilver(!silver);
  }
  return (
    <Switch>
      <Route exact path="/produkter" render={()=>(
        <ProductsDiv>
          <Header>Produkter</Header>
          <SortDiv>
            <h3>Sortera</h3>
            <Input>
              <p className="big">Guld</p><input type="checkbox" name="gold" value="gold" onChange={goldClick} defaultChecked={gold} />
            </Input>
            <Input>
              <p className="big">Silver</p><input type="checkbox" name="silver" value="silver" onChange={silverClick} defaultChecked={silver} />
            </Input>
          </SortDiv>
          <DisplayDiv mobile={width < breakpoint}>
            <ProductGrid show={{gold: gold, silver: silver}} />
          </DisplayDiv>
        </ProductsDiv>
      )} />
      {allProducts.map(product=>{
        return <Route exact path={`/produkter/${product.name.replace(" ", "-")}`} key={product.name} render={()=>(
          <Product product={product}/>
        )} />
      })}
    </Switch>
  )
}
//<Route exact path="/" component={Home}></Route>

export default Products;
