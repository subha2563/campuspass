import React from 'react';
import { Filter, Search, Ticket, Mail, User } from 'lucide-react';

const Navbar = ({ onTicketClick }) => {
  return (
    <header className="bg-gradient-to-r from-[#21D4B9] via-[#0BD0E3] to-[#3B82F6] py-3 px-6 flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-4">
        <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition">
          <Filter className="w-5 h-5 text-white" />
        </button>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-cyan-600 shadow-md">
          CP
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-8 relative">
        <input 
          type="text" 
          placeholder="Search hackathons, workshops, coding sprints..." 
          className="w-full py-3 px-6 pr-12 rounded-full outline-none shadow-inner text-slate-600 focus:ring-2 focus:ring-white/50 transition"
        />
        <button className="absolute right-2 top-1.5 bottom-1.5 w-10 bg-[#0BD0E3] hover:bg-cyan-500 rounded-full flex items-center justify-center text-white transition">
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Ticket Icon with Logic */}
        <div 
          onClick={onTicketClick} 
          className="group relative p-2 bg-white/20 rounded-xl backdrop-blur-sm cursor-pointer hover:bg-white/30 transition active:scale-95"
          title="View My Tickets"
        >
          <Ticket className="w-6 h-6 text-white" />
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0BD0E3] group-hover:scale-110 transition">
            3
          </span>
        </div>

        <div className="relative p-2 bg-white/20 rounded-xl backdrop-blur-sm cursor-pointer hover:bg-white/30 transition">
          <Mail className="w-6 h-6 text-white" />
          <span className="absolute -top-2 -right-2 bg-emerald-400 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0BD0E3]">
            5
          </span>
        </div>

        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 cursor-pointer shadow-md ml-2 overflow-hidden border-2 border-transparent hover:border-white transition">
          <User className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;