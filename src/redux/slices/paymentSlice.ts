import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../types/user';

const KEY_STATUS_PAYMENT = "STATUS_PAYMENT";
const KEY_USER_DATA = "USER_DATA";

export enum StatusFlowPayment {
    STATUS_INITIAL                   = 'Initial',
    STATUS_REGISTERED                = 'Registered',
    STATUS_TRANSACTION_PENDING       = "STATUS_TRANSACTION_PENDING",
    STATUS_TRANSACTION_SUCCESSFULL   = "STATUS_TRANSACTION_SUCCESSFULL",
    STATUS_TRANSACTION_UNSUCCESSFULL = "STATUS_UNSUCCESSFULL",
}

export interface PaymentState {
  statusFlowPayment: StatusFlowPayment;
  user: User | object
}

const initialState: PaymentState = {
  statusFlowPayment: JSON.parse(localStorage.getItem(KEY_STATUS_PAYMENT) as string) || StatusFlowPayment.STATUS_INITIAL,
  user: JSON.parse(localStorage.getItem(KEY_USER_DATA) as string) || {}
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setStatusFlow: (state, action: PayloadAction<StatusFlowPayment>) => {
        state.statusFlowPayment = action.payload
        localStorage.setItem(KEY_STATUS_PAYMENT, JSON.stringify(state.statusFlowPayment))
    },
    setUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        localStorage.setItem(KEY_USER_DATA, JSON.stringify(state.user))
    },
    removeUser: (state) => {
        state.user = {};
        state.statusFlowPayment = StatusFlowPayment.STATUS_INITIAL
        localStorage.removeItem(KEY_STATUS_PAYMENT)
        localStorage.removeItem(KEY_USER_DATA)
    },
    getStatusFlow: (state) => { 
        state.statusFlowPayment = JSON.parse(localStorage.getItem(KEY_STATUS_PAYMENT) as string) 
    }
  },
})

export const { setStatusFlow, getStatusFlow, setUser, removeUser } = paymentSlice.actions

export default paymentSlice.reducer