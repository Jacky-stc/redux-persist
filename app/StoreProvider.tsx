'use client'

import { ReactNode, useRef } from "react"
import { Provider } from 'react-redux'
import { AppStore, makeStore } from "./lib/store"
import { PersistGate } from "redux-persist/integration/react"
import { Persistor, persistStore } from "redux-persist"

export default function StoreProvider ({children}:{children:ReactNode}){
    const storeRef = useRef<AppStore>()
    const persistStoreRef = useRef<Persistor | null>(null)
    if(!storeRef.current){
        storeRef.current = makeStore()
        persistStoreRef.current = persistStore(storeRef.current)
    }
    return <Provider store={storeRef.current}>
        <PersistGate loading={null} persistor={persistStoreRef.current!}>
        {children}
        </PersistGate>
        </Provider>
}