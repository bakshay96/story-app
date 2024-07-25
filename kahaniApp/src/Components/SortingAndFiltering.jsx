// src/components/SortingAndFiltering.js

import React from 'react';

const SortingAndFiltering = ({ onSort, onFilter }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="relative inline-block text-left">
        <select
          onChange={(e) => onSort(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <div className="relative inline-block text-left">
        <select
          onChange={(e) => onFilter(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="byMe">By Me</option>
          <option value="byOthers">By Others</option>
        </select>
      </div>
    </div>
  );
};

export default SortingAndFiltering;
