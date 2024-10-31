git; // src/context/TokenContext.js
import React, { createContext, useState } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [tokenId, setTokenId] = useState(null);

  return (
    <TokenContext.Provider value={{ tokenId, setTokenId }}>
      {children}
    </TokenContext.Provider>
  );
};
