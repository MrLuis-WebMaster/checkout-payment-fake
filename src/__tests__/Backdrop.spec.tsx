
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Backdrop from '../components/Backdrop';
import { setStatusFlow, StatusFlowPayment } from '../redux/slices/paymentSlice';
import { store } from '../redux/store';

const mockStore = configureStore();

describe('Backdrop component', () => {

  it('renders correctly with show=true', () => {
        render(
            <Provider store={store}>
                <Backdrop show={true} onClick={() => {}} /> 
            </Provider>
        );
        const backdropElement = screen.getByTestId('backdrop');
        expect(backdropElement).toBeInTheDocument();
   });

  it('renders correctly with show=false', () => {

    render(
      <Provider store={store}>
        <Backdrop show={false} onClick={() => {}} />
      </Provider>
    );

    expect(screen.findByTestId('backdrop')).toMatchObject({});
  });


  it('dispatches setStatusFlow when show=false and statusFlowPayment=STATUS_TRANSACTION_SUCCESSFULL', () => {
    const store = mockStore({
      payment: {
        statusFlowPayment: StatusFlowPayment.STATUS_TRANSACTION_SUCCESSFULL,
      },
    });

    render(
      <Provider store={store}>
        <Backdrop show={false} onClick={() => {}} />
      </Provider>
    );

    expect(store.getActions()).toContainEqual(setStatusFlow(StatusFlowPayment.STATUS_INITIAL));
  });
});
