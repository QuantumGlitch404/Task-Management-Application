import React from 'react';

const EmptyState = ({ icon: Icon, message, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center w-full">
      {Icon && (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-obsidian border border-border mb-6 text-slate">
          <Icon size={32} />
        </div>
      )}
      <p className="font-body font-medium text-[16px] text-silver mb-6">
        {message || "No data available"}
      </p>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
