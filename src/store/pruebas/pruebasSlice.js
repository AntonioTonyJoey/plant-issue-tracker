import { createSlice } from '@reduxjs/toolkit'

export const pruebasSlice = createSlice({
  name: 'pruebas',
  initialState: {
    files: [],
    withoutQRN: []
  },
  reducers: {
        filesBlock: (state, {payload}) => {
          state.files = payload.files
        },
        withoutQRN: (state, {payload}) => {
          state.withoutQRN = payload.withoutQRN
        }
    }
});

// Action creators are generated for each case reducer function
export const { filesBlock, withoutQRN } = pruebasSlice.actions