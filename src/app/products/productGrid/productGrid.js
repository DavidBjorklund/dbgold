import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import productArray from '../allProducts.js';

const Product = styled.div`
  background-color: rgba(35,35,35,0.15);
  position: relative;
  overflow: hidden;
  a {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  img {
    max-width: 80%;
    max-height: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55%);
    user-select: none;
    pointer-events: none;
    transition: all 0.4s ease;
  }
  &:hover img {
    transform: translate(-50%, -55%) scale(1.05);
  }
  &:hover p {
    display: block;
    opacity: 1;
  }
`;

const Floating = styled.p`
  position: absolute;
  padding: 5px 10px;
  text-align: center;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 2;
  display: none;
  opacity: 0;
  background-color: rgba(21,18,24,0.25);
  transition: all 0.4s ease;
`;

const ProductGrid = ({show})=>{
  return (
    productArray.map(item=>{
      return show[item.type] && <Product key={item.name}>
        <Link to={`/produkter/${item.name.replace(" ", "-")}`}>
          <img src={item.image} alt={item.name}/>
          <Floating className="big">{item.name}</Floating>
        </Link>
      </Product>
    })
  )
}

export default ProductGrid;
