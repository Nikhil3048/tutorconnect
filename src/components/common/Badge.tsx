import React from 'react';
import type { TutorApplicationStatus, InquiryStatus } from '../../types';

interface BadgeProps {
  status: TutorApplicationStatus | InquiryStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, size = 'md' }) => {
  let colorClass = 'bg-slate-100 text-slate-700 border-slate-300';

  switch (status) {
    case 'Approved':
    case 'Completed':
      colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      break;
    case 'Submitted':
    case 'New':
      colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
      break;
    case 'Under Review':
    case 'Matching':
    case 'Contacted':
      colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
      break;
    case 'Documents Required':
    case 'Tutor Suggested':
      colorClass = 'bg-purple-50 text-purple-700 border-purple-200';
      break;
    case 'Rejected':
    case 'Closed':
      colorClass = 'bg-rose-50 text-rose-700 border-rose-200';
      break;
    default:
      colorClass = 'bg-slate-100 text-slate-700 border-slate-300';
  }

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3 py-1 text-sm font-semibold' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center rounded-full border ${colorClass} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'Approved' || status === 'Completed' ? 'bg-emerald-500' :
        status === 'Submitted' || status === 'New' ? 'bg-blue-500' :
        status === 'Under Review' || status === 'Matching' ? 'bg-amber-500' :
        status === 'Rejected' || status === 'Closed' ? 'bg-rose-500' : 'bg-purple-500'
      }`} />
      {status}
    </span>
  );
};
