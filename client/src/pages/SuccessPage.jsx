import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="max-w-md w-full p-8 bg-white rounded shadow-lg">
        <h2 className="text-3xl font-semibold text-green-600 mb-4">Success!</h2>
        <p className="text-lg text-gray-800 mb-6">Your action was successful.</p>
        <Link to={"/"}>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Back to Home
            </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
