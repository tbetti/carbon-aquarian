import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner@2.0.3'
import { EmptyState } from './components/EmptyState'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ResultCard } from './components/ResultCard'
import { TripForm } from './components/TripForm'
import { Toaster } from './components/ui/sonner'
import { setIsConnected, setWalletAddress, resetConnection } from './slices/connectionSlice'
import { submitTrip } from './slices/tripSlice'
import type { AppDispatch, RootState } from './app/store'
import type { TripResult } from './api/carbonApi'

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { walletAddress, isConnected } = useSelector((s: RootState) => s.connection)
  const [tripResult, setTripResult] = useState<TripResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConnect = () => {
    // Mock wallet connection
    const mockAddress = 'BDKMGABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIXW3Q'
    dispatch(setWalletAddress(mockAddress))
    dispatch(setIsConnected(true))
    toast.success('Wallet connected successfully!')
  }

  const handleDisconnect = () => {
    dispatch(resetConnection())
    setTripResult(null)
  }

  const handleSubmitTrip = async (data: { vehicle_model_id: string; distance_km: number; actual_mode: string; wallet_address: string }) => {
    setIsSubmitting(true)
    try {
      // dispatch thunk and unwrap the result
      const result = await dispatch(submitTrip(data)).unwrap()
      setTripResult(result)
      toast.success('CarbonPoints issued successfully!')
    } catch (err) {
      toast.error("We couldn't calculate your trip. Check Vehicle model ID and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F8F7] flex flex-col">
      <Header walletAddress={walletAddress} onConnect={handleConnect} onDisconnect={handleDisconnect} />

      <main className="max-w-[700px] w-full mx-auto px-6 md:px-8 flex-1 py-12">
        <Hero />

        <div className="mt-12">
          <TripForm walletAddress={walletAddress} isConnected={isConnected} isSubmitting={isSubmitting} onSubmit={handleSubmitTrip} />
        </div>

        {tripResult ? (
          <div className="mt-12">
            <ResultCard result={tripResult} walletAddress={walletAddress} />
          </div>
        ) : (
          <div className="mt-12">
            <EmptyState isConnected={isConnected} />
          </div>
        )}
      </main>

      <Footer />

      <Toaster position="top-right" />
    </div>
  )
}
