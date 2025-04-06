import React from 'react';

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">🎉 Login Successful!</h1>
        <p className="text-gray-700">Welcome to the job platform.</p>
      </div>
    </div>
  );
};

export default Success;
