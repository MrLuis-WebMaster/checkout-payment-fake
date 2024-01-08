import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as reactRedux from 'react-redux'
import { StatusFlowPayment } from '../redux/slices/paymentSlice';
import CustomerFeedback from '../components/CustomerFeedback';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('CustomerFeedback component', () => {
  it('renders correctly for successful transaction', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    useSelectorMock.mockReturnValue(StatusFlowPayment.STATUS_TRANSACTION_SUCCESSFULL);
    render(<CustomerFeedback handleStep={() => {}} />);
    expect(screen.getByText('¡Pago exitoso! Gracias por tu compra.')).toBeInTheDocument();
  });

  it('renders correctly for unsuccessful transaction', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    useSelectorMock.mockReturnValue(StatusFlowPayment.STATUS_TRANSACTION_UNSUCCESSFULL);
    render(<CustomerFeedback handleStep={() => {}} />);
    expect(screen.getByText('El pago ha sido rechazado. Por favor, inténtalo de nuevo.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Intentar Nuevamente' })).toBeInTheDocument();
  });

  it('handles button click correctly for unsuccessful transaction', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    useSelectorMock.mockReturnValue(StatusFlowPayment.STATUS_TRANSACTION_UNSUCCESSFULL);
    const mockHandleStep = jest.fn();
    render(<CustomerFeedback handleStep={mockHandleStep} />);
    fireEvent.click(screen.getByRole('button', { name: 'Intentar Nuevamente' }));
    expect(mockHandleStep).toHaveBeenCalledWith(1);
  });

  it('renders correctly for unknown transaction status', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    useSelectorMock.mockReturnValue('estado-desconocido');
    render(<CustomerFeedback handleStep={() => {}} />);
    expect(screen.getByText('Estado de pago desconocido.')).toBeInTheDocument();
  });
});
