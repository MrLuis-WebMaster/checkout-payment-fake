import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlowPayment from '../components/FlowPayment';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('FlowPayment component', () => {
    it('renders correctly at the initial step', () => {
        render(
            <Provider store={store}>
                <FlowPayment />
            </Provider>
        );
        expect(screen.getByText('Datos')).toBeInTheDocument();
    });

    it('renders correctly after advancing one step', () => {
        render(
            <Provider store={store}>
                <FlowPayment />
            </Provider>
        );
        expect(screen.getByText('Detalles y pago')).toBeInTheDocument();
    });

    it('renders correctly after advancing two steps', () => {
        render(
            <Provider store={store}>
                <FlowPayment />
            </Provider>
        );
        expect(screen.getByText('Resultado')).toBeInTheDocument();
    });
});
