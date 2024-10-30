import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todoReducer from '@/app/lib/features/countSlice'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    todo:todoReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// SSR 階段：每個新的伺服器請求會調用 makeStore 來生成新的 store，
// 並且僅在渲染這個請求的過程中持有該 store。請求處理結束後，該 store 即不再需要，系統自動釋放。
// CSR 階段：應用會保留單一 store 實例，不會重複調用 makeStore，因此也不會導致多餘的記憶體消耗。
export const makeStore = ()=>{
    return configureStore({
        reducer:persistedReducer,
        middleware:(getDefaultMiddleWare)=>
            getDefaultMiddleWare({
                serializableCheck:{
                    ignoredActions:[FLUSH, REHYDRATE, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            })
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']