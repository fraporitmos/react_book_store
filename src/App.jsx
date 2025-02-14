import React, { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { CartContext } from './context/CartContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const App = () => {

  const [cart, addBookCart] = useState([])

  return (
      <CartContext.Provider value={{cart, addBookCart}}>
         <PayPalScriptProvider>
             <Sidebar/>
         </PayPalScriptProvider>
      </CartContext.Provider>
  )
}

export default App