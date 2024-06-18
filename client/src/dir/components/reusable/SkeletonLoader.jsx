import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="bg-gray-100 rounded animate-pulse p-4 ">
      <div className="h-12 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-12 bg-gray-300 animate-pulse ease-in-out delay-75 rounded w-4/5 mb-2"></div>
      <div className="h-12 bg-gray-200 rounded w-2/4 mb-2"></div>
      <div className="h-12 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
};

export default SkeletonLoader;
