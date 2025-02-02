"use client"
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store, persistor } from "./store"; // Import persistor
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
const ClientProvider = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <Provider store={store}>

 <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
        </Provider>
    </div>
  )
}

export default ClientProvider