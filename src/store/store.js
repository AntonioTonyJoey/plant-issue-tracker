import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { checklistSlice } from './checklist'
import { navSlice } from './nav/navSlice'
import { pruebasSlice } from './pruebas/pruebasSlice'
import { blockstoreSlice } from './blockstore/blockstoreSlice'
import { feedbackSlice } from './feedback/feedbackSlice'
import { sisterPlantSlice } from './sisterPlant/sisterPlantSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    checklist: checklistSlice.reducer,
    nav: navSlice.reducer,
    pruebas: pruebasSlice.reducer,
    blockstore: blockstoreSlice.reducer,
    feedback: feedbackSlice.reducer,
    sisterplant: sisterPlantSlice.reducer
  },
})