import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import AppContextProvider, { AppContext } from '../../';

const ProductDiv = styled.div`
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'imageDisplay infoDisplay';
  margin: 0 auto;
  width: 80vw;
  height: calc(100vh - 120px - 90px - 140px);
  min-height: 400px;
  grid-gap: 30px;
  @media(max-width: 800px){
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 'imageDisplay' 'infoDisplay';
    width: 90vw;
    height: auto;
    min-height: calc(100vh - 90px);
    padding-bottom: 60px;
  }
`;

const ImageDisplay = styled.div`
  grid-area: imageDisplay;
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: calc(40vw * 0.75 - 22.5px);
  grid-template-rows: 1fr 1fr 1fr;
  @media(min-width: 1500px){
    height: calc(1500px * 0.4 * 0.75 - 22.5px);
  }
  @media(max-width: 800px){
    height: 60vw;
    ${props=>!props.mutlipleProducts && `
      grid-template-columns: auto;
    `}
  }
`;

const Image = styled.img`
  width: calc(40vw * 0.75 - 22.5px);
  height: calc(40vw * 0.75 - 22.5px);
  background: #DDD;
  grid-area: 1 / 2 / 4 / 3;
  object-fit: contain;
  @media(min-width: 1500px){
    height: calc(1500px * 0.4 * 0.75 - 22.5px);
    width: calc(1500px * 0.4 * 0.75 - 22.5px);
  }
  @media(max-width: 800px){
    height: 60vw;
    width: 60vw;
  }
`;

const SmallImage = styled.div`
  width: 90%;
  height: 90%;
  background: #EEE;
  img {
    max-width: 100%;
    width: 100%;
    max-height: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: contain;
  }
  /*@media(max-width: 800px){
    height: 20vw;
    width: 20vw;
  }*/
`;

const InfoDisplay = styled.div`
  grid-area: infoDisplay;
  padding-top: 25px;
`;

const AddItem = styled.button`

`;

const AddedSquare = styled.div`
  max-width: 250px;
  padding: 12px 40px;
  text-align: center;
  background: #DDDDDD;
  position: relative;
  top: -3px;
  left: 160px;
  &::before {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #DDDDDD transparent;
    position: absolute;
    top: -10px;
    left: 20px;
  }
  @media(max-width: 800px){
    left: 10px;
  }
`;

const Popup = styled.div`
  width: 150px;
  height: 30px;
  background-color: #EEEEEE;
`;

const Product = ({product}) => {
  const { width, setWidth } = useContext(AppContext);
  const { cart, setCart } = useContext(AppContext);
  function insert(str, index, value) {
    return str.substr(0, str.length + index) + value + str.substr(index);
  }
  const updateCart = () => {
    var found = false;
    cart.forEach((item, i) => {
      if(product.name==item.name){
        item.amount++;
        found = true;
      }
    });
    console.log(found)
    if(!found){
      setCart([...cart, {...product, amount: 1}])
      localStorage.setItem("cart", JSON.stringify([...cart, {...product, amount: 1}]))
    }else{
      setCart([...cart]);
      localStorage.setItem("cart", JSON.stringify([...cart]))
    }
    setAdded(true);
    setTimeout(()=>{
      setAdded(false);
    }, 1500)
  }
  const [added, setAdded] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);
  function updateImage(nr){
    setCurrentImage(nr);
  }
  let weight;
  if(product.type==="gold"){
    weight = product.name.slice(0,-6);
  }else {
    weight = product.name.slice(0,-8);
  }
  let pricepergram = product.price / weight;
  pricepergram = pricepergram.toFixed(2);
  return (
    <ProductDiv>
      <ImageDisplay mutlipleProducts={product.altImage1||product.altImage2}>
        {
          product.altImage1 &&
          <SmallImage>
          { product.altImage1 && <img src={product.image} alt={product.name} onClick={()=>updateImage(1)} className={currentImage==1 ? "borderBlack" : null} /> }
          </SmallImage>
        }
        {
          product.altImage1 &&
          <SmallImage>
          { product.altImage1 && <img src={product.altImage1} alt={product.name+" alternate image nr. 1"} onClick={()=>updateImage(2)} className={currentImage==2 ? "borderBlack" : null} /> }
          </SmallImage>
        }
        {
          product.altImage1 && product.altImage2 &&
          <SmallImage>
          { product.altImage2 && <img src={product.altImage2} alt={product.name+" alternate image nr. 2"} onClick={()=>updateImage(3)} className={currentImage==3 ? "borderBlack" : null} /> }
          </SmallImage>
        }
        <Image src={currentImage==1?product.image:currentImage==2?product.altImage1:product.altImage2} alt={product.name}/>
      </ImageDisplay>
      <InfoDisplay>
        <h2>{product.name}</h2>
        {product.price && <h5 className="number">{insert(product.price.toString(),-6," ").replace(".",",")} kr</h5>}
        <p>{product.description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat officia quibusdam repellat porro itaque rem eos harum tempore eaque, tenetur sit dolorum ab, deleniti debitis animi praesentium fugit laboriosam autem."}</p>
        <ul>
          {product.size &&
          <li>
            <p>
            {product.size}.
            </p>
          </li>}
          {product.purity &&
          <li>
            <p>
            {product.purity} renhet.
            </p>
          </li>}
          <li>
            <p>
            {pricepergram} kr per gram.
            </p>
          </li>
        </ul>
        <AddItem onClick={()=>{updateCart()}}>Lägg Till I Kundvagn</AddItem>
        {
          added && <AddedSquare>Tillagt i kundvagnen</AddedSquare>
        }
      </InfoDisplay>
    </ProductDiv>
  )
}

export default Product;
