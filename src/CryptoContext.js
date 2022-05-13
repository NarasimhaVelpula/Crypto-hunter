import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const Crypto=createContext()

const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState("inr")
    const [symbol,setSymbol]=useState("₹")

    useEffect(() => {
      if(currency==="inr"){
          setSymbol("₹")
      }
      else{
          setSymbol("$")
      }
    }, [currency])
    
  return (
    <Crypto.Provider value={{currency,symbol,setCurrency}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState=()=>{
    return useContext(Crypto)
}