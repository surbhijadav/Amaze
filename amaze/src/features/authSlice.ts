import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface User {
  username: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ user: User, token: string }>) => {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    registerStart: (state) => { state.loading = true; state.error = null; },
    registerSuccess: (state, action: PayloadAction<{ user: User, token: string }>) => { state.loading = false; state.user = action.payload.user; state.token = action.payload.token; },
    registerError: (state, action: PayloadAction<string>) => { state.loading = false; state.error = action.payload; 

    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
    }
  }
})

export const { loginStart, loginSuccess, loginError, logout } = authSlice.actions
export const {registerStart,registerSuccess,registerError} = authSlice.actions
export default authSlice.reducer