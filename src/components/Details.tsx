import { DescriptionProduct } from '../views/Product'
import FormCard from './FormCard'

interface DetailsProps {
    handleStep: (step:number) => void
}

const Details: React.FC<DetailsProps> = ({ handleStep }) => {
  return (
    <div className='flex flex-col lg:flex-row gap-12'>
        <div className='w-full lg:w-1/2'>
            <DescriptionProduct className='flex flex-col mx-auto max-w-screen-md'/>
        </div>
        <div className='w-full lg:w-1/2'>
            <FormCard handleStep={handleStep} />
        </div>
    </div>
  )
}

export default Details