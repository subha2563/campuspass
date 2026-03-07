import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EventDetails from './pages/EventDetails';
import TicketView from './pages/TicketView'; // 1. Import the new Ticket page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event/:id" element={<EventDetails />} />
        
        {/* 2. New Dynamic route for the Student's QR Ticket */}
        <Route path="/ticket/:hash" element={<TicketView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;