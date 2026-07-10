import React from 'react';

const LeaveCard = ({ title, used, total, icon, bgColor }:any) => {
  // Percentage for progress bar
  const percentage = (used / total) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-3">
        <div className={`p-2 rounded-lg ${bgColor} bg-opacity-10`}>
          {/* Icon placeholder - aap yahan lucide-react ya koi bhi svg use kar sakte hain */}
          <span className={`text-xl ${bgColor.replace('bg-', 'text-')}`}>{icon}</span>
        </div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {title}
        </span>
      </div>

      <div className="flex items-baseline gap-1">
        <h3 className="text-2xl font-bold text-gray-800">{used}</h3>
        <span className="text-gray-400 text-sm italic">/ {total} Days</span>
      </div>

      {/* Responsive Progress Bar */}
      <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-full transition-all duration-700 ease-in-out ${bgColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default LeaveCard;