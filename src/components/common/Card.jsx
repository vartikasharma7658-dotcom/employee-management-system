import React from 'react';

const Card = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 ${className}`}>
      {(title || action) && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
