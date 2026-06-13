import React from 'react';

interface AdSpaceProps {
  type: 'banner' | 'sidebar' | 'inline';
  className?: string;
}

export const AdSpace: React.FC<AdSpaceProps> = ({ type, className }) => {
  return (
    <div 
      className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-sm font-medium ${
        type === 'banner' ? 'h-24 w-full' : type === 'sidebar' ? 'h-[600px] w-full' : 'h-32 w-full my-4'
      } ${className}`}
    >
      <div className="text-center p-4">
        <p>Advertisement Space</p>
        <p className="text-xs">Google AdSense Placeholder</p>
      </div>
    </div>
  );
};
