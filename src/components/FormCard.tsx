import React from 'react';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { User } from '../types/user';
import { simulateApiCall } from '../services/simulateApi.service';
import { toast } from 'react-toastify';
import identifyCardType from '../utils/identifyCardType';
import isExpirationDateValid from '../utils/isExpirationDateValid';
import Logos from '../utils/logos';
import { StatusFlowPayment, setStatusFlow } from '../redux/slices/paymentSlice';
import LoadingProcessPayment from './LoadingProcessPayment';

interface FormCardValues {
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvc: string;
  cardHolderName: string;
  identificationType: string;
  identificationNumber: string;
  installments: string;
  termsAndConditions: boolean;
}

interface FormCardProps {
  handleStep: (step:number) => void
}

const FormCard: React.FC<FormCardProps> = ({ handleStep }) => {
  const user = useSelector<RootState>(store => store.payment.user) as User
  const statusFlowPayment = useSelector<RootState>(store => store.payment.statusFlowPayment) as string
  const dispatch = useDispatch<AppDispatch>()
  const formik: FormikProps<FormCardValues> = useFormik<FormCardValues>({
    initialValues: {
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      cvc: '',
      cardHolderName: '',
      identificationType: '',
      identificationNumber: '',
      installments: '1',
      termsAndConditions: false,
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string().matches(/^\d{16}$/, 'Número de tarjeta inválido').required('Campo obligatorio'),
      expirationMonth: Yup.string().required('Campo obligatorio'),
      expirationYear: Yup.string().required('Campo obligatorio'),
      cvc: Yup.string().matches(/^\d{3,4}$/, 'CVC inválido').required('Campo obligatorio'),
      cardHolderName: Yup.string().required('Campo obligatorio'),
      identificationType: Yup.string().required('Campo obligatorio'),
      identificationNumber: Yup.string().required('Campo obligatorio'),
      installments: Yup.string().required('Campo obligatorio'),
      termsAndConditions: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones'),
    })
    .test(
      'is-not-expired',
      'La tarjeta ha expirado',
      () => isExpirationDateValid(formik.values.expirationMonth, formik.values.expirationYear)
    ),
    onSubmit: async () => {
      try {
        dispatch(setStatusFlow(StatusFlowPayment.STATUS_TRANSACTION_PENDING))
        await simulateApiCall();
        dispatch(setStatusFlow(StatusFlowPayment.STATUS_TRANSACTION_SUCCESSFULL))
      } catch (error:unknown) {
        toast.error(error as string)
        dispatch(setStatusFlow(StatusFlowPayment.STATUS_TRANSACTION_UNSUCCESSFULL))
      } finally {
        handleStep(2)
      }
    },
  });


  const cardType = identifyCardType(formik.values.cardNumber);


  return (
    <>
      {
        statusFlowPayment === StatusFlowPayment.STATUS_TRANSACTION_PENDING 
        ? (
            <LoadingProcessPayment />
        )
        : (
            <form onSubmit={formik.handleSubmit} className=''>
              <p className="mb-4 text-gray-500">Hola {user.fullName}, ingresa los datos de tu tarjeta por favor</p>

              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">Número de Tarjeta:</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formik.values.cardNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 p-2 w-full border ${formik.touched.cardNumber && formik.errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.touched.cardNumber && formik.errors.cardNumber && (
                  <div className="text-red-500 text-sm">{formik.errors.cardNumber}</div>
                )}
                <div className="absolute right-4 top-[calc(34px+0.25rem)] bottom-[50%]">
                    <img
                      src={ cardType === 'Desconocido' ? 'https://placehold.co/32x16?text=Card' : Logos[cardType]}
                      alt={`${cardType} Logo`}
                      className="w-8 h-4 object-contain"
                    />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 mb-4">
                <div className="w-full lg:w-[30%]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Expiración:</label>
                  <div className="flex gap-2">
                    <select
                      name="expirationMonth"
                      value={formik.values.expirationMonth}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`p-2 border w-1/2 ${formik.touched.expirationMonth && formik.errors.expirationMonth ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                      <option value="" disabled>MM</option>
                      {Array.from({ length: 12 }).map((_, index: number) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                    <select
                      name="expirationYear"
                      value={formik.values.expirationYear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`p-2 border w-1/2 ${formik.touched.expirationYear && formik.errors.expirationYear ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                      <option value="" disabled>YYYY</option>
                      {Array.from({ length: 10 }).map((_, index) => {
                        const currentYear = new Date().getFullYear();
                        const year = currentYear + index;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {formik.touched.expirationMonth && formik.errors.expirationMonth && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.expirationMonth}
                    </div>
                  )}
                  {formik.touched.expirationYear && formik.errors.expirationYear && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.expirationYear}
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-[70%]">
                  <label className="block text-sm font-medium text-gray-700">CVC (Código de seguridad):</label>
                  <input
                    type="text"
                    name="cvc"
                    value={formik.values.cvc}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`mt-1 p-2 w-full border ${formik.touched.cvc && formik.errors.cvc ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formik.touched.cvc && formik.errors.cvc && (
                    <div className="text-red-500 text-sm">{formik.errors.cvc}</div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nombre en la Tarjeta:</label>
                <input
                  type="text"
                  name="cardHolderName"
                  value={formik.values.cardHolderName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 p-2 w-full border ${formik.touched.cardHolderName && formik.errors.cardHolderName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.touched.cardHolderName && formik.errors.cardHolderName && (
                  <div className="text-red-500 text-sm">{formik.errors.cardHolderName}</div>
                )}
              </div>

              <div className="flex flex-col lg:flex-row gap-6 mb-4">
                <div className="w-full lg:w-[30%]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Identificación:</label>
                  <select
                    name="identificationType"
                    value={formik.values.identificationType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`p-2 w-full border ${formik.touched.identificationType && formik.errors.identificationType ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="" disabled>Selecciona</option>
                    <option value="CC">Cédula de Ciudadania</option>
                    <option value="CE">Cédula de Extranjeria</option>
                    <option value="pasaporte">Pasaporte</option>
                  </select>
                  {formik.touched.identificationType && formik.errors.identificationType && (
                    <div className="text-red-500 text-sm">{formik.errors.identificationType}</div>
                  )}
                </div>

                <div className="w-full lg:w-[70%]">
                  <label className="block text-sm font-medium text-gray-700">Número de Identificación:</label>
                  <input
                    type="text"
                    name="identificationNumber"
                    value={formik.values.identificationNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`mt-1 p-2 w-full border ${formik.touched.identificationNumber && formik.errors.identificationNumber ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formik.touched.identificationNumber && formik.errors.identificationNumber && (
                    <div className="text-red-500 text-sm">{formik.errors.identificationNumber}</div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Número de Cuotas:</label>
                <select
                  name="installments"
                  value={formik.values.installments}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`p-2 w-full border ${formik.touched.installments && formik.errors.installments ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="" disabled>Selecciona</option>
                  {
                    Array.from({ length: 12 }).map((_, index: number) => {
                      return (
                        <option key={index} value={index + 1}>{index + 1}</option>
                      );
                    })
                  }
                </select>
                {formik.touched.installments && formik.errors.installments && (
                  <div className="text-red-500 text-sm">{formik.errors.installments}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    name="termsAndConditions"
                    checked={formik.values.termsAndConditions}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mr-2"
                  />
                  Acepto los Términos y Condiciones
                </label>
                {formik.touched.termsAndConditions && formik.errors.termsAndConditions && (
                  <div className="text-red-500 text-sm">{formik.errors.termsAndConditions}</div>
                )}
              </div>
              <div className="flex w-full">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none w-full sm:w-auto sm:ml-auto">
                  Completar Pago
                </button>
              </div>
            </form>
        )
      }
    </>
  );
};

export default FormCard;
