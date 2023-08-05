import { Prediction } from '@/components/Prediction'

const Result = () => {
  return (
    <div className="flex flex-col p-4">
      <div className="py-10 px-4 gap-20 bg-zinc-100 rounded">
        <Prediction />
      </div>
    </div>
  )
}

export default Result
