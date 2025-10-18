import { Bike } from 'lucide-react';

interface EmptyStateProps {
  isConnected: boolean;
}

export function EmptyState({ isConnected }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#E6F5EE] mb-6">
        <Bike className="w-10 h-10 text-[#00A884]" />
      </div>
      
      <h3 className="mb-3 text-[#1A1F2C]">
        {isConnected ? 'Submit your first trip' : 'Connect your wallet to get started'}
      </h3>
      
      <p className="text-[#667085] max-w-md mx-auto">
        Your CarbonPoints will appear after you submit your first trip.
      </p>
    </div>
  );
}