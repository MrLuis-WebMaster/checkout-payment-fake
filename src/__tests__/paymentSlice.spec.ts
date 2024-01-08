import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import paymentReducer, {
  setStatusFlow,
  getStatusFlow,
  setUser,
  removeUser,
  PaymentState,
  StatusFlowPayment,
} from '../redux/slices/paymentSlice';

describe('paymentSlice', () => {
  let store: EnhancedStore<{ payment: PaymentState }>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        payment: paymentReducer,
      },
    });
  });

  it('should set status flow correctly', () => {
    store.dispatch(setStatusFlow(StatusFlowPayment.STATUS_TRANSACTION_PENDING));

    const state = store.getState().payment;
    expect(state.statusFlowPayment).toBe(StatusFlowPayment.STATUS_TRANSACTION_PENDING);
  });

  it('should get status flow from localStorage', () => {
    localStorage.setItem('STATUS_PAYMENT', JSON.stringify(StatusFlowPayment.STATUS_TRANSACTION_SUCCESSFULL));

    store.dispatch(getStatusFlow());

    const state = store.getState().payment;
    expect(state.statusFlowPayment).toBe(StatusFlowPayment.STATUS_TRANSACTION_SUCCESSFULL);
  });

  it('should set user correctly', () => {
    const user = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        countryCode: '+1',
        phoneNumber: '123456789',
    };

    store.dispatch(setUser(user));

    const state = store.getState().payment;
    expect(state.user).toEqual(user);
  });

  it('should remove user and reset status flow', () => {

    store.dispatch(setStatusFlow(StatusFlowPayment.STATUS_TRANSACTION_SUCCESSFULL));

    store.dispatch(removeUser());

    const state = store.getState().payment;
    expect(state.user).toEqual({});
    expect(state.statusFlowPayment).toBe(StatusFlowPayment.STATUS_INITIAL);
  });
});
