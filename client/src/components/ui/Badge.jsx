import React from 'react';

const Badge = ({ type, variant }) => {
  let styles = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-body font-medium text-[11px] uppercase tracking-[0.05em] ";
  let text = "";
  let icon = null;

  if (type === 'priority') {
    switch (variant) {
      case 'High':
        styles += "bg-red-glow text-red-light border border-red/30";
        text = "HIGH";
        icon = "🔥";
        break;
      case 'Medium':
        styles += "bg-amber-glow text-amber-light border border-amber/30";
        text = "MEDIUM";
        icon = "➡";
        break;
      case 'Low':
        styles += "bg-gray-glow text-gray-light border border-gray/30";
        text = "LOW";
        icon = "⬇";
        break;
      default:
        break;
    }
  } else if (type === 'status') {
    switch (variant) {
      case 'Pending':
        styles += "bg-gray-glow text-gray-light border border-transparent";
        text = "PENDING";
        break;
      case 'In Progress':
        styles += "bg-blue-glow text-blue-light border border-transparent animate-pulse-custom";
        text = "IN PROGRESS";
        break;
      case 'Completed':
        styles += "bg-green-glow text-green-light border border-transparent";
        text = "COMPLETED";
        break;
      default:
        break;
    }
  }

  return (
    <span className={styles}>
      {icon && <span>{icon}</span>}
      {text}
    </span>
  );
};

export default Badge;
