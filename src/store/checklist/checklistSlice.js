import { createSlice } from '@reduxjs/toolkit'

export const checklistSlice = createSlice({
  name: 'checklist',
  initialState: {
    evidencias: [],
    folioVirtual:"",
  },
  reducers: {
        evidencias: (state, {payload}) => {
          state.evidencias = payload;
        },
        folioVirtual:(state, {payload}) => {
          state.folioVirtual = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { evidencias, folioVirtual } = checklistSlice.actions