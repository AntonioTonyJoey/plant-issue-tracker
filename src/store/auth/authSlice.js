import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated',//not-authenticated authenticated checking
    wiw: null,
    email: null,
    phone: null,
    displayName: null,
    errorMessage: null,
    auth: false,
    rol: null
  },
  reducers: {
        login: (state, {payload}) => {
          state.status = 'authenticated',//not-authenticated authenticated checking
          state.wiw = payload.wiw,
          state.email = payload.email,
          state.phone = payload.phone,
          state.displayName = payload.displayName,
          state.rol = payload.rol,
          state.errorMessage = null,
          state.auth = true
        },
        logout: (state, {payload}) => {
          state.status = 'not-authenticated',//not-authenticated authenticated checking
          state.wiw = null,
          state.email = null,
          state.phone = null,
          state.displayName = null,
          state.errorMessage = payload.errorMessage,
          state.auth = false,
          state.rol = null
        },
        checkingCredentials: (state) => {
          state.status = 'checking';
        }
    }
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions