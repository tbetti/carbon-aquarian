import { Badge } from './ui/badge'

export function Hero() {
  return (
    <div className="relative text-center space-y-6 py-8">
      {/* Background visual */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#E6F5EE] via-[#E6F5EE]/40 to-transparent opacity-50 blur-3xl" />

        {/* Decorative eco icons */}
        <div className="absolute top-0 left-1/4 text-3xl opacity-15">🌍</div>
        <div className="absolute top-8 right-1/4 text-2xl opacity-15">🚲</div>
        <div className="absolute bottom-4 left-1/3 text-2xl opacity-15">🚆</div>
        <div className="absolute bottom-0 right-1/3 text-xl opacity-15">🌿</div>
      </div>

      <h1 className="text-[2rem] leading-tight text-[#1A1F2C]">Earn CarbonPoints for low-carbon travel.</h1>

      <p className="text-[#667085] max-w-xl mx-auto">
        Connect your Pera Wallet, log a trip, and receive Algorand CarbonPoints automatically.
      </p>

      <div className="flex items-center justify-center gap-3 pt-2">
        <Badge variant="secondary" className="bg-white border border-[#E0E0E0] text-[#667085] hover:bg-white">
          Built on Algorand
        </Badge>
        <Badge variant="secondary" className="bg-white border border-[#E0E0E0] text-[#667085] hover:bg-white">
          Powered by Carbon Interface
        </Badge>
      </div>
    </div>
  )
}
