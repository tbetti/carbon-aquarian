import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ResultCardProps {
  result: {
    carbon_saved_kg: number;
    carbon_points: number;
    txid: string;
  };
  walletAddress: string;
}

export function ResultCard({ result, walletAddress }: ResultCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    
    // Confetti effect
    const confettiTimer = setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }, 250);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, [result]);

  const truncateAddress = (addr: string) => {
    if (addr.length < 12) return addr;
    return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
  };

  return (
    <div 
      className={`transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
      }`}
    >
      <Card className="shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-2xl border-[#A7E081]/40 bg-gradient-to-br from-white to-[#E6F5EE]/40 relative overflow-hidden">
        {/* Success icon */}
        <div className="absolute top-8 right-8">
          <CheckCircle2 
            className={`w-10 h-10 text-[#22C55E] transition-all duration-500 ${
              showConfetti ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
            }`} 
          />
        </div>
        
        <CardContent className="px-10 py-10 space-y-6">
          <div className="space-y-3 pr-12">
            <div className="flex items-start gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <h3 className="text-[1.25rem] text-[#1A1F2C] mb-2">Success!</h3>
                <p className="text-[#1A1F2C] leading-relaxed">
                  You saved <span className="font-semibold">{result.carbon_saved_kg} kg CO₂</span> and earned{' '}
                  <span className="font-semibold">{result.carbon_points} CarbonPoints</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-[#667085]">
              <span className="text-xl">💰</span>
              <span>Sent to: <span className="text-[#1A1F2C] font-medium">{truncateAddress(walletAddress)}</span></span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xl">🔗</span>
              <Button
                variant="link"
                className="p-0 h-auto text-[#00A884] hover:text-[#00A884]/80 hover:no-underline"
                asChild
              >
                <a
                  href={`https://testnet.algoexplorer.io/tx/${result.txid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span className="underline">View transaction on AlgoExplorer</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}