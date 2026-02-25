import React from 'react';

interface ConfidenceBadgeProps {
  score: number;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ score }) => {
  let label = 'Low Confidence';
  let colorClass = 'bg-red-100 text-red-800 border-red-200';

  if (score > 0.8) {
    label = 'High Confidence';
    colorClass = 'bg-green-100 text-green-800 border-green-200';
  } else if (score >= 0.6) {
    label = 'Moderate Confidence';
    colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200';
  }

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {label}
    </div>
  );
};
