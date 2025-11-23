import React from 'react';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-amber-500 to-amber-700 text-white px-4 sm:px-8">
      <div className="flex items-center justify-center flex-wrap text-center">
        <h1 className="text-6xl sm:text-8xl font-bold animate-bounce">404</h1>
        <div className="w-4 h-4 mx-2 bg-white rounded-full animate-ping"></div>
        <h1 className="text-6xl sm:text-8xl font-bold animate-bounce">Not Found</h1>
      </div>

      <p className="text-lg sm:text-xl mt-4 opacity-70">
        Oops! The page you're looking for doesn't exist.
      </p>

      <div className="mt-8">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-amber-700 text-white rounded-lg shadow-lg hover:bg-amber-800 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
