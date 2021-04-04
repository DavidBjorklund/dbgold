import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const localCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, setCart] = useState(localCart);

  return (
    <AppContext.Provider value={{cart, setCart, width, setWidth}}>
      { children }
    </AppContext.Provider>
  )
}

export default AppContextProvider;
