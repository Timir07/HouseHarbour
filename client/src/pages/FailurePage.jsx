import React from 'react';
import { Link } from 'react-router-dom';

const FailurePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="max-w-md w-full p-8 bg-white rounded shadow-lg">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Failure!</h2>
        <p className="text-lg text-gray-800 mb-6">Something went wrong.</p>
        <Link to={"/listing/:listingId"}>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Back to Home
            </button>
        </Link>
      </div>
    </div>
  );
};

export default FailurePage;
