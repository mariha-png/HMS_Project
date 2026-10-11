import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, Trash2, Activity, CheckCircle, 
  RefreshCcw, Clock, CreditCard, XCircle 
} from 'lucide-react';
import { toast } from 'react-toastify';

const BookingsPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetching Data from Atlas
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/all-bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
      setFilteredBookings(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Atlas synchronization failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  // 2. Logic: Status Update (Handles Pending, Confirmed, Cancelled)
  const updateStatus = async (id, newStatus) => {
    const originalBookings = [...bookings];

    // Optimistic UI Update
    setBookings(prev => 
      prev.map(b => b._id === id ? { ...b, bookingStatus: newStatus } : b)
    );

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/admin/update-status/${id}`, 
        { bookingStatus: newStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Booking status: ${newStatus.toUpperCase()}`);
    } catch (err) { 
      setBookings(originalBookings);
      toast.error("Database update failed"); 
    }
  };

  // 3. Purge Record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to purge this record?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/admin/delete-booking/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(prev => prev.filter(b => b._id !== id));
        toast.info("Record removed from Atlas");
      } catch (err) { 
        toast.error("Delete operation restricted"); 
      }
    }
  };

  // 4. Search Filter Logic
  useEffect(() => {
    const results = bookings.filter(b =>
      b.guestId?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b._id.includes(searchTerm)
    );
    setFilteredBookings(results);
  }, [searchTerm, bookings]);

  return (
    <div className="space-y-4 p-2 animate-in fade-in duration-700 bg-[#0a0a0a] min-h-screen">
      
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#0d0d0d] p-6 border border-white/5 gap-4 shadow-2xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c5a059]/40" size={18} />
          <input 
            type="text" 
            placeholder="Search Ledger..."
            className="w-full bg-white/[0.02] border border-white/10 py-3 pl-12 text-sm text-white focus:outline-none focus:border-[#c5a059]/50 transition-all font-light"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-6">
          <button onClick={fetchBookings} className="p-2 text-white/20 hover:text-[#c5a059] transition-all">
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <div className="text-right">
            <p className="text-[10px] text-[#c5a059] uppercase tracking-[3px] font-bold">{filteredBookings.length} Active Records</p>
            <p className="text-[8px] text-white/20 uppercase tracking-widest font-mono">Cluster: Atlas-Production</p>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#0d0d0d] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/5 text-white/30 text-[9px] uppercase tracking-widest bg-white/[0.01]">
                <th className="p-6 font-medium">Guest Identity</th>
                <th className="p-6 font-medium">Suite & Rate</th>
                <th className="p-6 font-medium">Timeline</th>
                <th className="p-6 text-center">Status & Payment</th>
                <th className="p-6 text-right font-medium">Manage</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-32 text-center">
                    <Activity className="animate-spin text-[#c5a059] mx-auto mb-4" size={40} />
                    <span className="text-[10px] uppercase tracking-[5px] text-white/10 italic">Synchronizing Database...</span>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group text-[11px]">
                    <td className="p-6">
                      <p className="font-medium group-hover:text-[#c5a059] transition-colors uppercase tracking-wider">
                        {booking.guestId?.username || booking.guestName || "External Guest"}
                      </p>
                      <p className="text-[9px] text-white/20 font-mono mt-1 italic">ID: {booking._id.slice(-8)}</p>
                    </td>

                    <td className="p-6">
                      <p className="text-white/50">{booking.roomId?.roomType || "Luxury Suite"}</p>
                      <p className="text-[#c5a059] font-bold mt-1 tracking-tighter">${booking.totalPrice || "0.00"}</p>
                    </td>

                    <td className="p-6 font-mono leading-relaxed">
                      <span className="text-emerald-500/60">IN: {new Date(booking.checkInDate).toLocaleDateString()}</span><br/>
                      <span className="text-rose-500/60">OUT: {new Date(booking.checkOutDate).toLocaleDateString()}</span>
                    </td>

                    <td className="p-6">
                      <div className="flex flex-col items-center gap-2">
                        {/* Status Badge */}
                        <span className={`px-4 py-1 rounded-full text-[8px] uppercase font-bold border transition-all ${
                          booking.bookingStatus === 'confirmed' ? 'border-[#c5a059]/40 text-[#c5a059] bg-[#c5a059]/5' :
                          booking.bookingStatus === 'cancelled' ? 'border-red-500/40 text-red-500 bg-red-500/5' :
                          'border-yellow-600/40 text-yellow-600 bg-yellow-600/5'
                        }`}>
                          {booking.bookingStatus || "pending"}
                        </span>
                        
                        {/* Dynamic Payment Label */}
                        <span className={`flex items-center gap-1 text-[7px] uppercase font-bold tracking-tighter ${
                          booking.bookingStatus === 'confirmed' ? 'text-emerald-500' : 'text-rose-500 animate-pulse'
                        }`}>
                          <CreditCard size={8} />
                          {booking.bookingStatus === 'confirmed' ? "● Paid" : "⚠ Payment Due"}
                        </span>
                      </div>
                    </td>

                    <td className="p-6 text-right space-x-2">
                      {/* Confirm Action */}
                      <button 
                        onClick={() => updateStatus(booking._id, 'confirmed')} 
                        disabled={booking.bookingStatus === 'confirmed'}
                        className={`p-2.5 transition-all rounded-md border border-white/5 ${
                          booking.bookingStatus === 'confirmed' 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 opacity-50' 
                          : 'hover:bg-[#c5a059]/10 text-white/20 hover:text-[#c5a059]'
                        }`}
                      >
                        <CheckCircle size={18}/>
                      </button>

                      {/* Cancel/Revert Action */}
                      <button 
                        onClick={() => updateStatus(booking._id, booking.bookingStatus === 'cancelled' ? 'pending' : 'cancelled')} 
                        className={`p-2.5 transition-all rounded-md border border-white/5 ${
                          booking.bookingStatus === 'cancelled'
                          ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                          : 'hover:bg-red-500/10 text-white/20 hover:text-red-500'
                        }`}
                      >
                        {booking.bookingStatus === 'cancelled' ? <Clock size={18}/> : <XCircle size={18}/>}
                      </button>

                      <button 
                        onClick={() => handleDelete(booking._id)} 
                        className="p-2.5 hover:bg-white/10 text-white/10 hover:text-white transition-all rounded-md border border-white/5"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsPanel;