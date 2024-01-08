import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { StatusFlowPayment } from '../redux/slices/paymentSlice';

interface CustomerFeedbackProps {
  handleStep: (step:number) => void
}

const CustomerFeedback: React.FC<CustomerFeedbackProps> = ({ handleStep }) => {
  const statusFlowPayment = useSelector<RootState, string>(
    (store) => store.payment.statusFlowPayment
  );

  const renderIconAndMessage = () => {
    let icon;
    let message;

    switch (statusFlowPayment) {
      case StatusFlowPayment.STATUS_TRANSACTION_SUCCESSFULL:
        icon = <FaCheckCircle className="text-green-500 text-4xl mb-2" />;
        message = '¡Pago exitoso! Gracias por tu compra.';
        break;
      case StatusFlowPayment.STATUS_TRANSACTION_UNSUCCESSFULL:
        icon = <FaTimesCircle className="text-red-500 text-4xl mb-2" />;
        message = 'El pago ha sido rechazado. Por favor, inténtalo de nuevo.';
        break;
      default:
        icon = <FaInfoCircle className="text-gray-500 text-4xl mb-2" />;
        message = 'Estado de pago desconocido.';
        break;
    }

    return (
      <div className="flex flex-col sm:flex-row items-center">
        {icon}
        <div className="ml-4">
          <h2 className="text-lg font-bold mb-2">Resultado del Pago</h2>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="my-8 p-4 border rounded bg-white">
      {renderIconAndMessage()}
      {
        statusFlowPayment === StatusFlowPayment.STATUS_TRANSACTION_UNSUCCESSFULL && 
        ( 
          <button
            onClick={()=> handleStep(1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mt-4 ml-12"
          > 
            Intentar Nuevamente
          </button>
        )
      }
    </div>
  );
};

export default CustomerFeedback;
