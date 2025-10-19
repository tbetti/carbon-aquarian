import { Bike } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../app/store'
import { setIsConnected as connectAction } from '../slices/connectionSlice'
import { addTrip } from '../slices/tripSlice'

export function EmptyState() {
  const isConnected = useSelector((s: RootState) => s.connection.isConnected)
  const dispatch = useDispatch<AppDispatch>()

  function handleConnect() {
    dispatch(connectAction(!isConnected))
  }

  function handleSubmitTrip() {
    const trip = { id: 'kju8', distanceKm: 3.2, date: new Date().toISOString() }
    dispatch(addTrip(trip))
  }

  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#E6F5EE] mb-6">
        <Bike className="w-10 h-10 text-[#00A884]" />
      </div>

      <h3 className="mb-3 text-[#1A1F2C]">{isConnected ? 'Submit your first trip' : 'Connect your wallet to get started'}</h3>

      <p className="text-[#667085] max-w-md mx-auto">Your CarbonPoints will appear after you submit your first trip.</p>

      <div className="mt-6 flex justify-center gap-3">
        {!isConnected ? (
          <button onClick={handleConnect} className="btn-primary">
            Connect Wallet
          </button>
        ) : (
          <button onClick={handleSubmitTrip} className="btn-outline">
            Submit Trip (simulate)
          </button>
        )}
      </div>
    </div>
  )
}
