
import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const feedbackSlice = createSlice({
    name: "feedback",
    initialState: {
        rechazos: [],
        evidencias: [],
    },
    reducers: {
        rechazosFeedback: (state, {payload}) => {
            state.rechazos = payload.rechazos,
            state.evidencias = payload.evidencias
          },
    }
});

// Action creators are generated for each case reducer function
export const { rechazosFeedback } = feedbackSlice.actions