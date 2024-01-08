import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { StatusFlowPayment, removeUser, setStatusFlow, setUser } from '../redux/slices/paymentSlice'
import { AppDispatch, RootState } from '../redux/store'
import { User } from '../types/user';

interface FormValues extends User { }

interface FormCustomerProps {
  handleStep: (step:number) => void
}

const FormCustomer: React.FC<FormCustomerProps> = ({ handleStep }) => {
  const user = useSelector<RootState>(store => store.payment.user) as User
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: '',
      email: '',
      countryCode: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('El nombre completo es requerido'),
      email: Yup.string().email('Formato de correo electrónico inválido').required('El correo electrónico es requerido'),
      countryCode: Yup.string().required('Selecciona el prefijo del país'),
      phoneNumber: Yup.string().matches(/^\d+$/, 'Formato de número de teléfono inválido').required('El número de teléfono es requerido'),
    }),
    onSubmit: (values) => {
      dispatch(setStatusFlow(StatusFlowPayment.STATUS_REGISTERED))
      dispatch(setUser(values))
      handleStep(1)
    },
  });

  return (
    <>
      {
        user?.fullName?.length ?
          (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg md:text-3xl font-bold mb-6">Hola {user.fullName} ¿Deseas registrarte de nuevo?</h1>
              <div className="flex flex-col md:flex-row gap-4">
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
                  onClick={()=> dispatch(removeUser())}
                >
                  Sí, registrarme de nuevo
                </button>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                  onClick={()=> handleStep(1)}
                >
                  No, continuar con el registro existente
                </button>
              </div>
            </div>
          )
          : (
            <form onSubmit={formik.handleSubmit} className='w-full md:max-w-[50%] mx-auto'>
              <label className="block mb-2">
                Nombre Completo:
                <input
                  type="text"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border px-3 py-2 w-full ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.touched.fullName && formik.errors.fullName && <div className="text-red-500">{formik.errors.fullName}</div>}
              </label>
              <label className="block mb-2">
                Correo Electrónico:
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border px-3 py-2 w-full ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.touched.email && formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
              </label>
              <label className="block mb-2">
                Número de Teléfono:
                <div className="flex gap-4 flex-col md:flex-row">
                  <select
                    name="countryCode"
                    value={formik.values.countryCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border px-3 py-2 ${formik.touched.countryCode && formik.errors.countryCode ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Prefijo</option>
                    <option value="+1">+1 (EE. UU.)</option>
                    <option value="+44">+44 (Reino Unido)</option>
                    <option value="+57">+57 (Colombia)</option>
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border px-3 py-2 w-full ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber && <div className="text-red-500">{formik.errors.phoneNumber}</div>}
              </label>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none w-full">Continuar con el pago</button>
            </form>
          )
      }
    </>
  );
};

export default FormCustomer;
