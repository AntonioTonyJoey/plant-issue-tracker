import { createSlice } from '@reduxjs/toolkit'

export const navSlice = createSlice({
  name: 'nav',
  initialState: {
    navegacion: 'checklist',
  },
  reducers: {
        checklist: (state, {payload}) => {
          state.navegacion = payload.nav
        },
        procesando: (state, {payload}) => {
          state.navegacion = payload.nav
        },
        blockstore: (state, {payload}) => {
          state.navegacion = payload.nav
        },
        feedback: (state, {payload}) => {
          state.navegacion = payload.nav
        },
        pruebas: (state, {payload}) => {
          state.navegacion = payload.nav
        },
    }
});

// Action creators are generated for each case reducer function
export const { checklist, procesando, blockstore, feedback, pruebas } = navSlice.actions