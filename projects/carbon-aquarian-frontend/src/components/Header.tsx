import { Button } from './ui/button'

interface HeaderProps {
  isConnected: boolean
  walletAddress: string
  onConnect: () => void
  onDisconnect: () => void
}

export function Header({ isConnected, walletAddress, onConnect, onDisconnect }: HeaderProps) {
  const truncateAddress = (addr: string) => {
    if (addr.length < 12) return addr
    return `${addr.slice(0, 5)}...${addr.slice(-4)}`
  }

  return (
    <header className="bg-white border-b border-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="text-[#1A1F2C]">Carbon Wallet</span>
        </div>

        <div>
          {isConnected ? (
            <Button onClick={onDisconnect} variant="outline" className="gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              Connected: {truncateAddress(walletAddress)}
            </Button>
          ) : (
            <Button onClick={onConnect} className="bg-[#00A884] hover:bg-[#00A884]/90 text-white">
              Connect Pera Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
