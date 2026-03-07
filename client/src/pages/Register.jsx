import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <h1 className="text-3xl font-extrabold text-[#0A2540] mb-4">Create an Account</h1>
      <p className="text-slate-500 mb-8">Registration form coming soon...</p>
      <Link to="/login" className="text-[#0BD0E3] font-bold hover:underline">
        Already have an account? Log in
      </Link>
    </div>
  );
};

export default Register;