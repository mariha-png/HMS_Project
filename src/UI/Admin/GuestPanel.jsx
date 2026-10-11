import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, LogOut, Search, FileText, Activity } from 'lucide-react';

const GuestPanel = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/bookings/all-bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGuests(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching guests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGuests(); }, []);

  const handleCheckOut = async (id) => {
    if (window.confirm("Confirm Guest Check-out?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGuests(guests.filter(g => g._id !== id));
      } catch (err) { 
        alert("Check-out failed"); 
      }
    }
  };

  const goToInvoice = (guest) => {
    navigate('/admin/invoice', { state: { guestData: guest } });
  };

  const filteredGuests = guests.filter(g => {
    const guestName = (g.guestId?.username || g.guestId?.name || g.guestName || "Guest").toLowerCase();
    const roomNo = (g.roomId?.roomNumber || g.roomNumber || "").toString();
    return guestName.includes(searchTerm.toLowerCase()) || roomNo.includes(searchTerm);
  });

  return (
    /* UPDATED: Background to Rich Black */
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 bg-[#0a0a0a] min-h-screen p-2 md:p-0">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-6 gap-6">
        <div>
          <h2 className="text-xl md:text-2xl font-light tracking-[4px] uppercase font-serif text-white">Guest Ledger</h2>
          <div className="flex items-center gap-2 mt-2">
            <Activity size={12} className="text-[#c5a059] animate-pulse" />
            <p className="text-[9px] md:text-[10px] text-[#c5a059] uppercase tracking-[2px] italic">
              Live Residency Management
            </p>
          </div>
        </div>
        
        {/* Search Bar: Updated to Card Black */}
        <div className="relative w-full md:w-72 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c5a059] transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="Search by name or unit..." 
            className="w-full bg-[#0d0d0d] border border-white/10 py-3 pl-10 pr-4 text-[10px] uppercase outline-none focus:border-[#c5a059]/50 focus:bg-white/[0.04] transition-all text-white tracking-widest"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- Table Container: Updated to Deep Card Black --- */}
      <div className="relative overflow-hidden bg-[#0d0d0d] border border-white/5 backdrop-blur-sm shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="p-5 text-[10px] uppercase tracking-[3px] font-semibold text-[#c5a059]/80">Guest Profile</th>
                <th className="p-5 text-[10px] uppercase tracking-[3px] font-semibold text-[#c5a059]/80">Unit Allocation</th>
                <th className="p-5 text-[10px] uppercase tracking-[3px] font-semibold text-[#c5a059]/80">Settlement</th>
                <th className="p-5 text-[10px] uppercase tracking-[3px] font-semibold text-[#c5a059]/80">Status Details</th>
                <th className="p-5 text-[10px] uppercase tracking-[3px] font-semibold text-[#c5a059]/80 text-center">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-[10px] uppercase tracking-[4px] text-white/30">Syncing Cloud Ledger...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-24 text-center text-white/20 text-[10px] uppercase tracking-[4px]">
                    No active residency records found
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => (
                  <tr key={guest._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        {/* Avatar box update */}
                        <div className="w-11 h-11 bg-gradient-to-br from-[#c5a059]/10 to-transparent rounded-lg flex items-center justify-center border border-white/10 group-hover:border-[#c5a059]/40 transition-all">
                          <User size={18} className="text-[#c5a059]/80 group-hover:text-[#c5a059]" />
                        </div>
                        <div>
                          <p className="text-[12px] font-medium uppercase tracking-wider text-white">
                            {guest.guestId?.username || guest.guestId?.name || guest.guestName || "Guest"}
                          </p>
                          <p className="text-[9px] text-white/30 mt-1 lowercase font-light tracking-wide">
                            {guest.guestId?.email || guest.email || "internal_record@system"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 border border-white/5 rounded-sm">
                        <span className="text-[10px] text-white/60 font-mono tracking-tighter">
                          ROOM {guest.roomId?.roomNumber || guest.roomNumber || "000"}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 font-serif text-[#c5a059] text-base italic">
                      ${guest.totalAmount?.toLocaleString() || "0.00"}
                    </td>
                    <td className="p-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          {/* Glow effect for status */}
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]"></div>
                          <span className="text-[9px] text-green-400/80 uppercase tracking-[2px] font-bold">
                            {guest.bookingStatus || "Confirmed"}
                          </span>
                        </div>
                        <span className="text-[10px] text-white/30 flex items-center gap-1.5 font-light">
                          <Calendar size={11} className="text-white/20" /> 
                          {guest.checkInDate ? new Date(guest.checkInDate).toLocaleDateString('en-GB') : "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => goToInvoice(guest)} 
                          className="group/btn relative flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-[9px] uppercase hover:bg-[#c5a059] hover:text-black transition-all duration-300 tracking-widest text-white/70"
                        >
                          <FileText size={12}/> Invoice
                        </button>
                        <button 
                          onClick={() => handleCheckOut(guest._id)} 
                          className="flex items-center gap-2 text-red-400/60 border border-red-400/10 px-4 py-2 text-[9px] uppercase hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 tracking-widest"
                        >
                          <LogOut size={12}/> Out
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Table Footer --- */}
      <div className="flex justify-between items-center px-4 py-4 bg-[#0d0d0d] border border-white/5">
        <p className="text-[9px] text-white/20 uppercase tracking-[3px]">
          Showing {filteredGuests.length} active entries
        </p>
        <p className="text-[9px] text-[#c5a059]/40 uppercase tracking-[3px]">
          Secured by LuxuryStay Cloud
        </p>
      </div>
    </div>
  );
};

export default GuestPanel;