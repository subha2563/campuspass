import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Download, ChevronLeft, MapPin, Calendar, Clock, User, ShieldCheck, Share2, Loader2, X } from 'lucide-react';

const TicketView = () => {
  const navigate = useNavigate();
  const ticketRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Your list of registered events
  const registeredEvents = [
    { id: 1, eventTitle: "Guidewire Innovate Hackathon 2026", date: "Mar 15, 2026", time: "10:00 AM", venue: "Main Auditorium", status: "Valid" },
    { id: 2, eventTitle: "AI Prompt Engineering Expo", date: "May 20, 2026", time: "11:00 AM", venue: "Seminar Hall A", status: "Valid" }
  ];

  const downloadTicket = async () => {
    if (ticketRef.current === null) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(ticketRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `Ticket-${selectedEvent.eventTitle.slice(0, 5)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { console.error(err); } finally { setIsDownloading(false); }
  };

  // --- LIST VIEW ---
  if (!selectedEvent) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-black text-slate-800 mb-8">My Registered Events</h1>
        <div className="space-y-4">
          {registeredEvents.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">{event.eventTitle}</h3>
              <button onClick={() => setSelectedEvent(event)} className="px-4 py-2 bg-[#0BD0E3] text-white font-bold rounded-lg hover:bg-cyan-600 transition">View QR</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- FULL-PAGE UI (DETAIL MODE) ---
  return (
    <div className="min-h-screen bg-[#F4F7FB] p-4 sm:p-8 flex flex-col items-center animate-in slide-in-from-bottom-8 duration-500">
      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <button onClick={() => setSelectedEvent(null)} className="p-2 bg-white rounded-xl shadow-sm"><ChevronLeft className="w-6 h-6" /></button>
        <h1 className="font-extrabold text-slate-800">Entry Pass</h1>
        <div className="w-10"></div>
      </div>

      <div ref={ticketRef} className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden w-full max-w-sm border border-slate-100">
        <div className="bg-gradient-to-br from-[#0BD0E3] to-[#3B82F6] p-8 text-white text-center">
          <h2 className="text-2xl font-black uppercase italic">CampusPass</h2>
        </div>
        <div className="p-10 flex flex-col items-center bg-white">
          <div className="p-4 bg-white border-[12px] border-slate-50 rounded-[2rem] shadow-inner mb-6">
            <QRCodeSVG value={`${selectedEvent.id}-${selectedEvent.eventTitle}`} size={180} />
          </div>
          <div className="px-5 py-2 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase">
            <ShieldCheck className="inline w-3 h-3 mr-1" /> {selectedEvent.status} Verified
          </div>
        </div>
        <div className="px-8 pb-10 border-t border-dashed border-slate-200 mt-2 pt-8 space-y-6">
          <h3 className="text-xl font-black text-[#0A2540] text-center">{selectedEvent.eventTitle}</h3>
          <div className="grid grid-cols-2 gap-y-6">
            <TicketInfo label="Venue" value={selectedEvent.venue} />
            <TicketInfo label="Date" value={selectedEvent.date} />
          </div>
        </div>
      </div>

      <button onClick={downloadTicket} className="mt-10 px-12 py-5 bg-[#0A2540] text-white rounded-2xl font-black shadow-xl">
        {isDownloading ? <Loader2 className="animate-spin" /> : "SAVE TO GALLERY"}
      </button>
    </div>
  );
};

const TicketInfo = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-bold text-slate-700">{value}</p>
  </div>
);

export default TicketView;