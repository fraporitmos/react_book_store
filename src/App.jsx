import React, { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { CartContext } from './context/CartContext'

const App = () => {

  const [cart, addBookCart] = useState([])

  return (
      <CartContext.Provider value={{cart, addBookCart}}>
          <Sidebar/>
      </CartContext.Provider>
  )
}

export default App