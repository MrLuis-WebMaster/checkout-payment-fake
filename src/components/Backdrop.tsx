import React, { ReactNode, useEffect } from 'react';
import { StatusFlowPayment, setStatusFlow } from '../redux/slices/paymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';

interface BackdropProps {
  show: boolean;
  onClick: () => void;
  children?: ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({ show, onClick, children }) => {
  const backdropClasses = `fixed top-0 left-0 w-full h-full bg-black opacity-50 transition-opacity duration-300 z-10 ${
    show ? 'visible' : 'invisible'
  }`;
  const statusFlowPayment = useSelector<RootState>(store => store.payment.statusFlowPayment);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    document.querySelector('body')?.classList.toggle('overflow-hidden')
    if (!show && ( statusFlowPayment === StatusFlowPayment.STATUS_TRANSACTION_SUCCESSFULL)) {
      dispatch(setStatusFlow(StatusFlowPayment.STATUS_INITIAL))
    }
  },[dispatch, show, statusFlowPayment])

  return (
    <div>
      <div className={backdropClasses} onClick={onClick}></div>
      {show && (
        <div data-testid="backdrop" className="fixed top-[10%] bottom-0 left-0 right-0 bg-white rounded-t-xl z-20 overflow-hidden">
          <div className="py-12 px-8 relative overflow-auto h-full">
            <button
              className="absolute top-4 right-6 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={onClick}
            >
              &#x2715;
            </button>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Backdrop;

