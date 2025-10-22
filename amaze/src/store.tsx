import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'  // Link to counter feature
import regionsReducer from "./features/regionSlice";
import authReducer from "./features/authSlice"
export const store = configureStore({
  reducer: {
    counter: counterReducer,  // Add more: e.g., auth: authReducer
    regions: regionsReducer,
    auth : authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch