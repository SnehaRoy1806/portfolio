import React from 'react';

// Now accepts 'data' passed from App.jsx
export default function Experience({ data }) {
  
  // Safety check: if data hasn't loaded yet, render nothing
  if (!data || data.length === 0) return null;

  return (
    <div className="relative max-w-2xl mx-auto pt-20 pb-10">
      
      {/* Central Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-gray-700 top-0"></div>

      <div className="space-y-12">
        {data.map((exp, index) => {
          // STRICT ALTERNATING LOGIC:
          // Even indexes (0, 2, 4) go LEFT. Odd indexes (1, 3, 5) go RIGHT.
          // This ensures the zigzag is always perfect regardless of data content.
          const align = index % 2 === 0 ? 'left' : 'right';

          return (
            <div key={index} className={`flex items-center w-full ${align === 'right' ? 'flex-row-reverse' : ''}`}>
              
              {/* Content Side */}
              <div className={`w-1/2 ${align === 'right' ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                <h3 className="font-bold text-lg">{exp.role}</h3>
                {/* Added Company Name for context */}
                <p className="text-sm font-medium opacity-70">{exp.company}</p>
                <p className="text-xs font-medium opacity-50 mt-1">{exp.year}</p>
              </div>

              {/* The Dot Logic */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center">
                {exp.isFuture ? (
                  // Future Item Style: Hollow + Pulsing Ring + Wave
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-8 h-8 rounded-full animate-ping opacity-75 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="relative w-5 h-5 bg-white dark:bg-gray-900 border-2 border-gray-900 dark:border-white rounded-full z-20"></div>
                  </div>
                ) : (
                  // Past Item Style: Standard Solid Dot
                  <div className="w-4 h-4 bg-gray-900 dark:bg-white border-4 border-white dark:border-gray-900 rounded-full"></div>
                )}
              </div>

              {/* Empty Side (balances the flexbox layout) */}
              <div className="w-1/2"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}