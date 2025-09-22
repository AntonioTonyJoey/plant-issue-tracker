import { createSlice } from '@reduxjs/toolkit'

export const blockstoreSlice = createSlice({
  name: 'blockstore',
  initialState: {
    rechazos: [],
    evidencias: [],
  },
  reducers: {
        rechazosEvidencias: (state, {payload}) => {
          state.rechazos = payload.rechazos,
          state.evidencias = payload.evidencias
        },
    }
});

// Action creators are generated for each case reducer function
export const { rechazosEvidencias } = blockstoreSlice.actions