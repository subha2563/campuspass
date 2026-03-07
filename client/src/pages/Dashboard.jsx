import React, { useState, useMemo } from 'react';
import { Filter, Calendar, TrendingUp, Award, Clock, Users, ChevronDown, CheckSquare, Plus, Grid, List, Search, Trophy, Star, Code, BarChart2, FileText, Trash2, Send, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';

const Dashboard = () => {
  // --- 1. STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('discover'); 
  
  // Discover Tab States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('All Events');
  const [activeCategories, setActiveCategories] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');

  // Notes Tab States
  const [notes, setNotes] = useState([
    { id: 1, text: "Brainstorm ideas for the Guidewire Hackathon. Need to look into React Native.", date: "Mar 6, 2026" },
    { id: 2, text: "Review Express.js middleware documentation before the MERN sprint.", date: "Mar 8, 2026" }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // --- 2. MOCK DATA ---
  const eventData = [
    { title: "Guidewire Innovate Hackathon 2026", date: "Mar 15, 2026", timestamp: new Date("Mar 15, 2026").getTime(), time: "10:00 AM", category: "Hackathon", venue: "Main Auditorium", teamSize: "3-5 Members", fee: "Free", maxCapacity: 500, currentCapacity: 387, status: "Enrolled", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800" },
    { title: "Advanced MERN Stack Sprints", date: "Apr 12, 2026", timestamp: new Date("Apr 12, 2026").getTime(), time: "2:00 PM", category: "Coding Sprint", venue: "Lab Complex 4", teamSize: "Individual", fee: "$15", maxCapacity: 150, currentCapacity: 145, status: "Saved", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" },
    { title: "Cisco Cybersecurity CTF", date: "May 05, 2026", timestamp: new Date("May 05, 2026").getTime(), time: "9:00 AM", category: "Cybersecurity CTF", venue: "Tech Park", teamSize: "2-4 Members", fee: "Free", maxCapacity: 300, currentCapacity: 120, status: "None", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" },
    { title: "AI Prompt Engineering Expo", date: "May 20, 2026", timestamp: new Date("May 20, 2026").getTime(), time: "11:00 AM", category: "Tech Summit", venue: "Seminar Hall A", teamSize: "Individual", fee: "$25", maxCapacity: 200, currentCapacity: 89, status: "Enrolled", image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=800" }
  ];

  // --- 3. LOGIC & HANDLERS ---
  const filteredEvents = useMemo(() => {
    return eventData
      .filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeStatus === 'All Events' || event.status === activeStatus;
        const matchesCategory = activeCategories.length === 0 || activeCategories.includes(event.category);
        return matchesSearch && matchesStatus && matchesCategory;
      })
      .sort((a, b) => sortBy === 'date' ? a.timestamp - b.timestamp : 0);
  }, [searchQuery, activeStatus, activeCategories, sortBy, eventData]);

  const toggleCategory = (categoryName) => {
    setActiveCategories(prev => prev.includes(categoryName) ? prev.filter(cat => cat !== categoryName) : [...prev, categoryName]);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    setNotes([{ id: Date.now(), text: newNoteText, date: dateStr }, ...notes]);
    setNewNoteText('');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const enrolledEvents = eventData.filter(e => e.status === 'Enrolled').sort((a, b) => a.timestamp - b.timestamp);

  // --- 4. RENDER HELPERS ---
  const NavButton = ({ tab, icon: Icon, label }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`flex flex-col xl:flex-row items-center justify-center gap-2 py-3 px-2 rounded-xl font-semibold transition shadow-sm border ${
        activeTab === tab 
          ? 'bg-[#0BD0E3] text-white border-[#0BD0E3] shadow-cyan-500/20' 
          : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'
      }`}
    >
      <Icon className="w-5 h-5 xl:w-4 xl:h-4" /> 
      <span className="text-xs xl:text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-slate-800 flex flex-col">
      <Navbar />

      <div className="flex flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 gap-8">
        
        {/* === SIDEBAR (Sticky Alignment) === */}
        <aside className="hidden lg:flex w-[280px] flex-shrink-0 flex-col gap-6 sticky top-[96px] h-[calc(100vh-120px)] overflow-y-auto pb-6 scrollbar-hide">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#0A2540]"><Filter className="w-5 h-5 text-[#21D4B9]" /> Dashboard</h2>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 gap-3">
            <NavButton tab="discover" icon={Search} label="Discover" />
            <NavButton tab="schedule" icon={Calendar} label="Schedule" />
            <NavButton tab="analytics" icon={BarChart2} label="Analytics" />
            <NavButton tab="notes" icon={FileText} label="Notes" />
          </div>

          {/* Conditional Sidebar Tools (Discover tab only) */}
          {activeTab === 'discover' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-300">
              
              <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-slate-100 p-2 flex flex-col gap-1">
                <div className="p-3 flex justify-between items-center"><span className="font-semibold text-slate-700 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#3B82F6]" /> Status</span></div>
                {['All Events', 'Enrolled', 'Saved'].map((status) => (
                  <div key={status} onClick={() => setActiveStatus(status)} className={`p-3 rounded-xl cursor-pointer flex justify-between items-center transition ${activeStatus === status ? 'bg-[#0BD0E3] text-white shadow-md shadow-cyan-500/20' : 'text-slate-600 font-medium hover:bg-slate-50'}`}>
                    <span>{status}</span>{activeStatus === status && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-slate-100 p-2">
                 <div className="p-3 flex justify-between items-center"><span className="font-semibold text-slate-700 flex items-center gap-2"><Award className="w-4 h-4 text-[#A855F7]" /> Category</span></div>
                <div className="px-3 pb-3 flex flex-col gap-4 mt-2">
                  {['Hackathon', 'Coding Sprint', 'Cybersecurity CTF', 'Tech Summit'].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 text-slate-700 font-medium cursor-pointer" onClick={(e) => { e.preventDefault(); toggleCategory(cat); }}>
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${activeCategories.includes(cat) ? 'bg-[#0BD0E3] border-[#0BD0E3]' : 'border-slate-300'}`}>
                        {activeCategories.includes(cat) && <CheckSquare className="w-4 h-4 text-white" />}
                      </div> {cat}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Always Visible Stats */}
          <div className="bg-[#EFFFFB] rounded-2xl p-5 border border-[#21D4B9]/20 shadow-sm mt-auto">
            <h3 className="text-[#21D4B9] font-bold text-sm flex items-center gap-2 mb-4"><Star className="w-4 h-4"/> MY PROFILE STATS</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium text-sm">Learning Hours</span><span className="text-[#21D4B9] font-bold">124h</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium text-sm">Teams Formed</span><span className="text-blue-500 font-bold">5</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium text-sm">Hackathons Won</span><span className="text-purple-500 font-bold">2</span></div>
            </div>
          </div>
        </aside>

        {/* === MAIN CONTENT AREA === */}
        <main className="flex-1 w-full max-w-full overflow-y-auto pb-12">
          
          <div className="mb-8">
            <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#00A5B5] mb-2 tracking-tight">
              {activeTab === 'discover' && 'Welcome back, Hari! 👋'}
              {activeTab === 'schedule' && 'My Schedule 📅'}
              {activeTab === 'analytics' && 'Performance Analytics 📊'}
              {activeTab === 'notes' && 'Workspace Notes 📝'}
            </h1>
            <p className="text-slate-500 text-[14px] sm:text-[15px] font-medium">
              {activeTab === 'discover' && 'Ready for your next coding challenge? Here are your opportunities.'}
              {activeTab === 'schedule' && 'Track your upcoming registered hackathons and deadlines.'}
              {activeTab === 'analytics' && 'Visualize your progress and skill distribution.'}
              {activeTab === 'notes' && 'Jot down project ideas, team contacts, and to-do lists.'}
            </p>
          </div>

          {/* --- VIEW 1: DISCOVER --- */}
          {activeTab === 'discover' && (
            <div className="animate-in fade-in duration-500">
              
              {/* Perfectly Aligned Metrics Row */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-[#EBF4FF] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-32 border border-[#DBEAFE]">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-500 shadow-sm"><Calendar className="w-4 h-4" /></div>
                  <div><p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Total Enrolled</p><p className="text-2xl font-extrabold text-slate-800">14</p></div>
                </div>
                <div className="bg-[#E6FCED] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-32 border border-[#D1FAE5]">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-500 shadow-sm"><TrendingUp className="w-4 h-4" /></div>
                  <div><p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Upcoming Events</p><p className="text-2xl font-extrabold text-slate-800">3</p></div>
                </div>
                <div className="bg-[#F5F3FF] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-32 border border-[#EDE9FE]">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-purple-500 shadow-sm"><Users className="w-4 h-4" /></div>
                  <div><p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Connections</p><p className="text-2xl font-extrabold text-slate-800">42</p></div>
                </div>
                <div className="bg-[#FFF0F5] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-32 border border-[#FCE7F3]">
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-pink-500 shadow-sm"><Code className="w-4 h-4" /></div>
                    <div className="bg-white px-2 py-0.5 rounded-md text-[10px] font-bold text-green-500 shadow-sm">+2 New</div>
                  </div>
                  <div><p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Projects</p><p className="text-2xl font-extrabold text-slate-800">7</p></div>
                </div>
                <div className="bg-[#FFFBEB] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-32 border border-[#FEF3C7]">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-400 shadow-sm"><CheckSquare className="w-4 h-4" /></div>
                  <div><p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Certificates</p><p className="text-2xl font-extrabold text-slate-800">8</p></div>
                </div>
                <div className="bg-[#E0FAFA] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-32 border border-[#CCFBFB]">
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-teal-500 shadow-sm"><Trophy className="w-4 h-4" /></div>
                    <div className="bg-white px-2 py-0.5 rounded-md text-[10px] font-bold text-green-500 shadow-sm">Top 5%</div>
                  </div>
                  <div><p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Global Rank</p><p className="text-2xl font-extrabold text-slate-800">#420</p></div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="bg-white rounded-2xl p-2 mb-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded shadow-sm transition ${viewMode === 'grid' ? 'bg-white text-cyan-500' : 'text-slate-400 hover:text-slate-600'}`}><Grid className="w-4 h-4" /></button>
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded transition ${viewMode === 'list' ? 'bg-white text-cyan-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}><List className="w-4 h-4" /></button>
                  </div>
                  <div className="hidden sm:block h-6 w-px bg-slate-200 mx-2"></div>
                  <button onClick={() => setSortBy(sortBy === 'date' ? 'relevance' : 'date')} className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 font-medium text-sm border border-slate-100 transition">
                    <Filter className="w-4 h-4" /> Sort: {sortBy === 'date' ? 'Date' : 'Relevance'}
                  </button>
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input type="text" placeholder="Search hackathons..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full sm:w-64 pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:border-cyan-300 transition" />
                  </div>
                </div>
              </div>

              {/* Grid Cards */}
              <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => <EventCard key={index} {...event} />)
                ) : (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100 border-dashed">
                    <Search className="w-12 h-12 text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-700">No events found</h3>
                    <button onClick={() => { setSearchQuery(''); setActiveCategories([]); setActiveStatus('All Events'); }} className="mt-6 px-6 py-2 bg-cyan-50 text-cyan-600 font-bold rounded-lg hover:bg-cyan-100 transition">Clear all filters</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- VIEW 2: MY SCHEDULE --- */}
          {activeTab === 'schedule' && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 animate-in fade-in duration-500 min-h-[500px]">
              <h3 className="text-xl font-bold text-[#0A2540] mb-8 flex items-center gap-2"><Clock className="w-5 h-5 text-emerald-500"/> Upcoming Itinerary</h3>
              <div className="relative border-l-2 border-slate-100 ml-4 flex flex-col gap-10">
                {enrolledEvents.map((event, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-emerald-400 border-4 border-white shadow-sm"></div>
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-md transition">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="text-emerald-500 font-bold text-sm mb-1">{event.date} • {event.time}</p>
                          <h4 className="text-lg font-extrabold text-slate-800">{event.title}</h4>
                        </div>
                        <span className="px-3 py-1 bg-white text-slate-600 text-xs font-bold rounded-lg border border-slate-200 w-fit">{event.category}</span>
                      </div>
                      <div className="flex gap-4 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-400"/> {event.venue}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4 text-slate-400"/> {event.teamSize}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- VIEW 3: ANALYTICS --- */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500 items-start">
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
                <h3 className="text-lg font-bold text-[#0A2540] mb-8 flex items-center gap-2"><BarChart2 className="w-5 h-5 text-blue-500"/> Skill Distribution</h3>
                <div className="flex flex-col gap-8">
                  <div>
                    <div className="flex justify-between text-sm font-bold text-slate-600 mb-2"><span>Frontend (React/Tailwind)</span><span>75%</span></div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold text-slate-600 mb-2"><span>Backend (Node/Express)</span><span>60%</span></div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold text-slate-600 mb-2"><span>Database (MongoDB)</span><span>85%</span></div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold text-slate-600 mb-2"><span>Cybersecurity</span><span>40%</span></div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-orange-500 rounded-full" style={{ width: '40%' }}></div></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col">
                <h3 className="text-lg font-bold text-[#0A2540] mb-6 flex items-center gap-2"><Trophy className="w-5 h-5 text-orange-500"/> Events by Category</h3>
                <div className="flex-1 flex items-end justify-around gap-2 h-48 mt-auto border-b-2 border-slate-100 pb-2">
                   
                   <div className="w-16 flex flex-col items-center gap-3 group h-[80%]">
                     <div className="w-full bg-blue-100 rounded-t-xl relative group-hover:bg-blue-200 transition h-full flex flex-col justify-end pb-2 items-center">
                       <span className="text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition">8</span>
                     </div>
                     <span className="text-xs font-bold text-slate-400">Tech</span>
                   </div>
                   
                   <div className="w-16 flex flex-col items-center gap-3 group h-[40%]">
                     <div className="w-full bg-purple-100 rounded-t-xl relative group-hover:bg-purple-200 transition h-full flex flex-col justify-end pb-2 items-center">
                       <span className="text-sm font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition">4</span>
                     </div>
                     <span className="text-xs font-bold text-slate-400">Cyber</span>
                   </div>
                   
                   <div className="w-16 flex flex-col items-center gap-3 group h-[60%]">
                     <div className="w-full bg-emerald-100 rounded-t-xl relative group-hover:bg-emerald-200 transition h-full flex flex-col justify-end pb-2 items-center">
                       <span className="text-sm font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition">6</span>
                     </div>
                     <span className="text-xs font-bold text-slate-400">Coding</span>
                   </div>
                   
                   <div className="w-16 flex flex-col items-center gap-3 group h-[20%]">
                     <div className="w-full bg-orange-100 rounded-t-xl relative group-hover:bg-orange-200 transition h-full flex flex-col justify-end pb-2 items-center">
                       <span className="text-sm font-bold text-orange-600 opacity-0 group-hover:opacity-100 transition">2</span>
                     </div>
                     <span className="text-xs font-bold text-slate-400">Biz</span>
                   </div>

                </div>
              </div>
            </div>
          )}

          {/* --- VIEW 4: NOTES --- */}
          {activeTab === 'notes' && (
            <div className="animate-in fade-in duration-500">
              <form onSubmit={handleAddNote} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                <div className="flex-1 w-full">
                  <label className="text-sm font-bold text-slate-700 mb-2 block">New Quick Note</label>
                  <textarea 
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Type an idea, contact email, or to-do here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:border-[#0BD0E3] focus:ring-2 focus:ring-[#0BD0E3]/20 transition resize-none h-24"
                  />
                </div>
                <button type="submit" className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-[#0BD0E3] to-[#3B82F6] text-white font-bold flex justify-center items-center gap-2 shadow-[0_4px_15px_rgb(59,130,246,0.3)] hover:opacity-90 transition h-[56px]">
                  <Send className="w-4 h-4" /> Save Note
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map(note => (
                  <div key={note.id} className="bg-[#FFFBEB] rounded-2xl p-6 shadow-sm border border-[#FEF3C7] relative group flex flex-col justify-between min-h-[160px]">
                    <p className="text-slate-800 font-medium whitespace-pre-wrap">{note.text}</p>
                    <div className="mt-6 flex justify-between items-center border-t border-[#FDE68A] pt-4">
                      <span className="text-xs font-bold text-orange-400 flex items-center gap-1"><Clock className="w-3 h-3"/> {note.date}</span>
                      <button onClick={() => handleDeleteNote(note.id)} className="text-slate-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {notes.length === 0 && (
                  <p className="col-span-full text-slate-500 text-center py-10 font-medium">Your workspace is empty. Add a note above!</p>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;