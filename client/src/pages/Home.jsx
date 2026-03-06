import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Shield, Users, Rocket } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-cyan-200">
      
      <nav className="flex justify-between items-center py-6 px-10 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#21D4B9] to-[#3B82F6] rounded-xl flex items-center justify-center font-bold text-white shadow-md">
            CP
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#0A2540]">CampusPass</span>
        </div>
        <div className="hidden md:flex gap-8 font-semibold text-slate-500">
          <a href="#features" className="hover:text-cyan-500 transition">Features</a>
          <a href="#events" className="hover:text-cyan-500 transition">Events</a>
          <a href="#about" className="hover:text-cyan-500 transition">About Us</a>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2.5 font-bold text-slate-600 hover:text-cyan-500 transition">Log in</Link>
          <Link to="/dashboard" className="px-5 py-2.5 bg-[#0A2540] text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-bold text-sm mb-8 border border-cyan-200">
          <Rocket className="w-4 h-4" /> CampusPass v1.0 is Live!
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold text-[#0A2540] tracking-tight mb-8 leading-tight">
          Your Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#21D4B9] to-[#3B82F6]">Student Hub</span>
        </h1>
        
        <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Discover the best college hackathons, full-stack coding sprints, and cybersecurity CTFs. Register, form teams, and track your certificates all in one beautiful dashboard.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0BD0E3] to-[#3B82F6] text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_8px_25px_rgb(59,130,246,0.4)] hover:-translate-y-1 transition-all text-lg">
            Explore Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 border border-slate-200 transition-all text-lg shadow-sm">
            Organizer Portal
          </Link>
        </div>
      </main>

      <section id="features" className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#F4F7FB] border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-500 mb-6 shadow-sm"><Terminal className="w-6 h-6" /></div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-3">Tech-Focused Events</h3>
            <p className="text-slate-500">From AI prompt engineering to MERN stack development challenges, find events that match your skill stack.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#F4F7FB] border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-500 mb-6 shadow-sm"><Users className="w-6 h-6" /></div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-3">Seamless Teambuilding</h3>
            <p className="text-slate-500">Looking for a designer or a backend engineer? Find teammates easily and register as a group with one click.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#F4F7FB] border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-purple-500 mb-6 shadow-sm"><Shield className="w-6 h-6" /></div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-3">Secure & Verified</h3>
            <p className="text-slate-500">Every event and organizer is verified. Earn authentic certificates and showcase your real-world coding experience.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;