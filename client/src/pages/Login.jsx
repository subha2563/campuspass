import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In the future, you will connect your MERN backend authentication here!
    // For now, it just redirects to the dashboard.
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-800 flex flex-col justify-center items-center p-6 relative">
      
      {/* Back to Home Button */}
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-[#0BD0E3] font-bold transition">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </Link>

      <div className="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#21D4B9] to-[#3B82F6] rounded-2xl flex items-center justify-center font-bold text-white shadow-md mx-auto mb-4 text-xl">
            CP
          </div>
          <h1 className="text-2xl font-extrabold text-[#0A2540]">Welcome Back</h1>
          <p className="text-slate-500 font-medium mt-1">Sign in to your CampusPass account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-bold text-slate-700 mb-2 block">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input 
                type="email" 
                placeholder="student@university.edu" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#0BD0E3] focus:ring-2 focus:ring-[#0BD0E3]/20 transition"
                required 
              />
            </div>
          </div>

          <div>
             <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <a href="#" className="text-xs font-bold text-[#3B82F6] hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#0BD0E3] focus:ring-2 focus:ring-[#0BD0E3]/20 transition"
                required 
              />
            </div>
          </div>

          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0BD0E3] to-[#3B82F6] text-white font-bold text-lg shadow-[0_4px_15px_rgb(59,130,246,0.3)] hover:opacity-90 transition mt-2">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm font-medium text-slate-500 mt-8">
          Don't have an account? <a href="#" className="text-[#0BD0E3] font-bold hover:underline">Sign up</a>
        </p>

      </div>
    </div>
  );
};

export default Login;