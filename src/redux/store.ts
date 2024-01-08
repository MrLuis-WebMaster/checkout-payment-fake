import { configureStore } from '@reduxjs/toolkit'
import paymentSlice from './slices/paymentSlice'
export const store = configureStore({
  reducer: {
    payment: paymentSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch