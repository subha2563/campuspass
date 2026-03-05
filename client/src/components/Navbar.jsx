import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-white border-b shadow-sm">
      <Link to="/" className="font-bold text-blue-600">CampusPass</Link>
      <div className="flex gap-4">
        <Link to="/" className="text-sm">Home</Link>
        <Link to="/dashboard" className="text-sm">Dashboard</Link>
      </div>
    </nav>
  );
}