
import { render, screen } from '@testing-library/react';
import Details from '../components/Details';
import '@testing-library/jest-dom';

jest.mock('../components/FormCard', () => ({ handleStep }: { handleStep: (step: number) => void }) => (
  <div data-testid="form-card-mock" onClick={() => handleStep(1)}>Mocked FormCard</div>
));

jest.mock('../views/Product', () => ({
  DescriptionProduct: ({ className }: { className: string }) => (
    <div data-testid="description-product-mock" className={className}>Mocked DescriptionProduct</div>
  ),
}));

describe('Details component', () => {
  it('renders correctly', () => {
    const mockHandleStep = jest.fn();
    render(<Details handleStep={mockHandleStep} />);
    expect(screen.getByTestId('form-card-mock')).toBeInTheDocument();
    expect(screen.getByTestId('description-product-mock')).toBeInTheDocument();
  });

  it('handles step correctly when clicking FormCard', () => {
    const mockHandleStep = jest.fn();
    render(<Details handleStep={mockHandleStep} />);
    screen.getByTestId('form-card-mock').click();
    expect(mockHandleStep).toHaveBeenCalledWith(1);
  });
});
