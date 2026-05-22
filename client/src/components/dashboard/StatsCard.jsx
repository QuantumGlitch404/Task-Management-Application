import React, { useEffect, useState } from 'react';
import ProgressOrb from '../3d/ProgressOrb';

const StatsCard = ({ title, count, type, icon: Icon }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = count / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= count) {
        setDisplayCount(count);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [count]);

  let typeColor = '';
  let orbColor = '';
  switch (type) {
    case 'Total':
      typeColor = 'text-blue-primary';
      orbColor = '#3b82f6';
      break;
    case 'Pending':
      typeColor = 'text-gray';
      orbColor = '#8b8b8b';
      break;
    case 'In Progress':
      typeColor = 'text-amber';
      orbColor = '#f59e0b';
      break;
    case 'Completed':
      typeColor = 'text-green';
      orbColor = '#22c55e';
      break;
    default:
      typeColor = 'text-blue-primary';
      orbColor = '#3b82f6';
  }

  return (
    <div className="bg-obsidian border border-border rounded-xl p-6 transition-all duration-300 hover:border-blue-primary hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(59,130,246,0.15)] relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-8 h-8 ${typeColor}`}>
          <Icon size={32} />
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ProgressOrb color={orbColor} />
        </div>
      </div>
      
      <div className="font-heading font-bold text-[36px] text-white mb-1">
        {displayCount}
      </div>
      
      <div className="font-body font-medium text-[13px] text-silver uppercase tracking-[0.05em]">
        {title}
      </div>
    </div>
  );
};

export default StatsCard;
