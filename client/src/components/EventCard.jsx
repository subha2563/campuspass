import React from 'react';
import { Calendar, Clock, MapPin, Users, DollarSign, Eye, TrendingUp } from 'lucide-react';

const EventCard = ({ title, date, time, category, venue, teamSize, fee, maxCapacity, currentCapacity, image }) => {
  const fillPercentage = Math.round((currentCapacity / maxCapacity) * 100);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col">
      
      <div className="relative h-56 w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/60 to-transparent"></div>
        
        <div className="absolute top-4 left-4 bg-[#21D4B9] text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
          <TrendingUp className="w-3 h-3" /> {fillPercentage}% Full
        </div>
        <div className="absolute top-4 right-4 bg-white text-[#0BD0E3] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
          {category}
        </div>
        
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <h3 className="text-[22px] font-extrabold mb-1.5 leading-tight">{title}</h3>
          <p className="text-xs font-medium flex items-center gap-2 text-slate-200">
            <Calendar className="w-3.5 h-3.5"/> {date} • <Clock className="w-3.5 h-3.5"/> {time}
          </p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#F0FDF8] p-3 rounded-2xl flex flex-col">
            <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mb-1"><MapPin className="w-3 h-3 text-[#21D4B9]"/> VENUE</p>
            <p className="text-sm font-bold text-slate-800 leading-tight truncate" title={venue}>{venue}</p>
          </div>
          <div className="bg-[#F4F7FF] p-3 rounded-2xl flex flex-col">
             <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mb-1"><Users className="w-3 h-3 text-[#3B82F6]"/> TEAM SIZE</p>
            <p className="text-sm font-bold text-slate-800 leading-tight">{teamSize}</p>
          </div>
          <div className="bg-[#FFF5F8] p-3 rounded-2xl flex flex-col">
             <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mb-1"><DollarSign className="w-3 h-3 text-[#EC4899]"/> FEE</p>
            <p className="text-sm font-bold text-slate-800 leading-tight">{fee}</p>
          </div>
        </div>

        <div className="mt-auto mb-5">
          <div className="flex justify-between items-end mb-2">
             <p className="text-xs font-bold text-slate-500 tracking-wider">MAX CAPACITY</p>
             <p className="text-xl font-bold text-[#00A5B5]">{currentCapacity}/{maxCapacity}</p>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#21D4B9] to-[#3B82F6] rounded-full" 
              style={{ width: `${fillPercentage}%` }}
            ></div>
          </div>
        </div>

        <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0BD0E3] to-[#3B82F6] text-white font-bold text-sm flex justify-center items-center gap-2 shadow-[0_4px_15px_rgb(59,130,246,0.3)] hover:opacity-90 transition-opacity">
          <Eye className="w-4 h-4" /> View Event Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;