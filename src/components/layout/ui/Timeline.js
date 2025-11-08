import React from 'react';
import { Link } from 'react-router-dom';

const UI_Timeline = () => {
  return (
    <div>
      {/* title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Timeline</h1>
        <div className="flex items-center gap-2 text-xs">
          <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">Trang chủ</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Timeline</span>
        </div>
      </div>
    </div>
  );
};

export default UI_Timeline;
