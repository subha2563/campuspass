import React from 'react';
import { Link, useParams } from 'react-router-dom';

const EventDetails = () => {
  // This grabs the ID from the URL (e.g., /event/123)
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <h1 className="text-3xl font-extrabold text-[#0A2540] mb-4">Event Details View</h1>
      <p className="text-slate-500 mb-8">Detailed view for event ID: {id} coming soon...</p>
      <Link to="/dashboard" className="px-6 py-3 bg-[#0BD0E3] text-white font-bold rounded-xl hover:opacity-90 transition">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default EventDetails;