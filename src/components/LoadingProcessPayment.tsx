import React from 'react';

const LoadingProcessPayment: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p>Procesando pago...</p>
    </div>
  );
};

export default LoadingProcessPayment;
