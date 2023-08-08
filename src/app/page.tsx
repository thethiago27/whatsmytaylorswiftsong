import { PreferenceForm } from '@/components/PreferenceForm'
import { useTracking } from '@/services/mixpanel'

const Home = () => {
  useTracking('Home')

  return (
    <div className="flex flex-col p-4 gap-5">
      <div className="py-10 px-4 gap-20 bg-zinc-100 rounded">
        <PreferenceForm />
      </div>
    </div>
  )
}

export default Home
