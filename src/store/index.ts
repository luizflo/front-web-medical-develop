import thunk from 'redux-thunk'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import userState from './user'
import appointmentState from './appointment'
import { Action } from './user/types'
import { persistReducer, persistStore } from 'redux-persist'

const rootReducer = combineReducers({
  userState,
  appointmentState,
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const reducer = (state: any, action: Action) => {
  return rootReducer(state, action)
}
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

const persistor = persistStore(store)

export { store, persistor }
export type AppState = ReturnType<typeof rootReducer>
