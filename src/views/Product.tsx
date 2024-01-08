import LogoVisa from '../assets/logo-visa.png'
import LogoMastercard from '../assets/logo-mastercard.png'
import LogoAmericanExpress from '../assets/logo-ae.png'
import { useState } from 'react'
import Backdrop from '../components/Backdrop'
import FlowPayment from '../components/FlowPayment'


const Review = () => {
  return (
    <div className="flex mb-4">
      <span className="flex items-center">
        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
        <span className="text-gray-600 ml-3">4 Reviews</span>
      </span>
    </div>
  )
}

export const DescriptionProduct = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">Reloj de colección</h1>
      <Review />
      <p className="leading-relaxed border-y-2 py-4 my-4 border-gray-200">
        Explora nuestro refugio en línea para los entusiastas de los relojes, presentando una exquisita pieza de colección. Elaborada meticulosamente con precisión y elegancia, esta obra maestra ficticia fusiona perfectamente la tradición y la modernidad. Sumérgete en la fantasía de poseer una joya relojera que trasciende el tiempo, donde cada detalle cuenta una historia de una artesanía inigualable.
      </p>
      <p className="title-font font-medium text-3xl text-gray-900 text-right mb-6">$58.00 USD</p>
    </div>
  );
};



const Product = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <section className="text-gray-700 body-font h-screen">
      <div className="container px-5 py-24 m-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded-lg shadow-xl border lg:h-full"
            src="https://cdn.pixabay.com/photo/2014/12/08/14/23/pocket-watch-560937_1280.jpg"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <DescriptionProduct/>
            <button 
              className="flex gap-4 py-2 px-6 focus:outline-none border rounded-lg items-center shadow-xl w-full"
              onClick={toggleModal}
            >
              <div className='flex flex-col gap-1 bg-white border-r pr-4'>
                  <img className='h-6 w-8 object-contain bg-white' src={LogoVisa} alt="Visa" />
                  <img className='h-6 w-8 object-contain bg-white' src={LogoMastercard} alt="Mastercard" />
                  <img className='h-6 w-8 object-contain bg-white' src={LogoAmericanExpress} alt="American Express" />
              </div>
              <p className='text-lg'>
                Paga con tus tarjetas
              </p>
            </button>
          </div>
        </div>
      </div>
      <Backdrop show={showModal} onClick={toggleModal} >
        <FlowPayment />
      </Backdrop>
    </section>
  )
}

export default Product