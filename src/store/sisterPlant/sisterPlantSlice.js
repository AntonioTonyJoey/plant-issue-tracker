import { createSlice } from '@reduxjs/toolkit'

export const sisterPlantSlice = createSlice({
  name: 'sisterplant',
  initialState: {
    rechazos: [],
    evidencias: [],
  },
  reducers: {
        rechazosEvidenciasSisterPlant: (state, {payload}) => {
          state.rechazos = payload.rechazos,
          state.evidencias = payload.evidencias
        },
    }
});

// Action creators are generated for each case reducer function
export const { rechazosEvidenciasSisterPlant } = sisterPlantSlice.actions