import React from 'react';

const Skeleton = ({ className = '' }) => {
  return (
    <div className={`bg-input-bg animate-pulse-custom rounded-md ${className}`}></div>
  );
};

export const TaskCardSkeleton = () => {
  return (
    <div className="bg-card-bg border border-border rounded-lg p-5 w-full h-[140px] flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="w-16 h-6 rounded-md" />
        <Skeleton className="w-20 h-6 rounded-md" />
      </div>
      <div>
        <Skeleton className="w-3/4 h-5 mb-2" />
        <Skeleton className="w-full h-4" />
      </div>
      <div className="flex justify-between mt-4">
        <Skeleton className="w-24 h-6 rounded-md" />
        <Skeleton className="w-8 h-8 rounded-md" />
      </div>
    </div>
  );
};

export default Skeleton;
