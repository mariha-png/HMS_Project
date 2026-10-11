import React, { useState, useEffect } from "react";
import axios from "axios";
import { RefreshCcw, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const HousekeepingPanel = () => {
  const [housekeepingData, setHousekeepingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(null); 

  // 1. Fetch data from Backend
  const fetchHousekeepingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/rooms/all-rooms");
      setHousekeepingData(response.data);
    } catch (error) {
      console.error("Error fetching housekeeping data:", error);
      toast.error("Failed to load room data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHousekeepingData();
  }, []);

  // 2. Status update logic with Optimistic UI
  const updateStatus = async (id, newStatus) => {
    setIsUpdating(id);
    
    // Save previous state for rollback in case of error
    const previousData = [...housekeepingData];

    // Optimistic Update: UI ko foran badal dein
    const updatedData = housekeepingData.map((room) =>
      room._id === id ? { ...room, roomStatus: newStatus } : room
    );
    setHousekeepingData(updatedData);

    try {
      // Backend request - Ensure field name matches your Schema (roomStatus)
      await axios.patch(`http://localhost:5000/api/rooms/status/${id}`, { 
        roomStatus: newStatus 
      });
      
      toast.success(`Room status updated to ${newStatus}`, {
        theme: "dark",
        fontSize: "10px"
      });
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed. Reverting changes...");
      setHousekeepingData(previousData); // Rollback if API fails
    } finally {
      setIsUpdating(null);
    }
  };

  // Status Colors Mapping
  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "available": return "#28a745"; // Green
      case "cleaning": return "#ffc107";  // Yellow
      case "dirty": return "#dc3545";     // Red
      case "maintenance": return "#17a2b8"; // Cyan
      default: return "#ffffff";
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 p-2">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-[#c5a059] text-[10px] uppercase tracking-[4px] font-bold mb-2">
            Operations Management
          </h3>
          <p className="text-white/40 text-[11px] uppercase tracking-widest">
            Room Maintenance & Housekeeping Logs
          </p>
        </div>
        <button 
          onClick={fetchHousekeepingData}
          disabled={loading}
          className="p-3 border border-white/5 text-[#c5a059] hover:bg-[#c5a059]/10 transition-all disabled:opacity-50"
        >
          <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border border-white/5 rounded-sm bg-[#0d0d0d]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-[2px] text-white/60 bg-white/[0.02]">
              <th className="p-6 font-bold">Room No</th>
              <th className="p-6 font-bold">Type</th>
              <th className="p-6 font-bold">Current Status</th>
              <th className="p-6 font-bold text-right">Action Control</th>
            </tr>
          </thead>
          <tbody className="text-[11px] tracking-wide">
            {loading && housekeepingData.length === 0 ? (
               <tr>
                 <td colSpan="4" className="p-20 text-center">
                   <Loader2 className="animate-spin mx-auto text-[#c5a059]" size={30} />
                 </td>
               </tr>
            ) : housekeepingData.length > 0 ? (
              housekeepingData.map((room) => (
                <tr key={room._id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-all group">
                  <td className="p-6 text-[#c5a059] font-bold">{room.roomNumber}</td>
                  <td className="p-6 text-white/70 uppercase font-medium">{room.roomType}</td>
                  <td className="p-6">
                    <span 
                      className="flex items-center gap-2 font-semibold uppercase text-[9px] tracking-wider"
                      style={{ color: getStatusColor(room.roomStatus) }}
                    >
                      <span 
                        className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentcolor]" 
                        style={{ backgroundColor: getStatusColor(room.roomStatus) }}
                      ></span>
                      {room.roomStatus}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end items-center gap-3">
                      {isUpdating === room._id && <Loader2 size={12} className="animate-spin text-[#c5a059]" />}
                      <select 
                        value={room.roomStatus}
                        disabled={isUpdating === room._id}
                        onChange={(e) => updateStatus(room._id, e.target.value)}
                        className="bg-[#0a0a0a] text-[#c5a059] border border-white/10 px-3 py-2 rounded-sm outline-none focus:border-[#c5a059] transition-all text-[9px] uppercase tracking-widest cursor-pointer hover:border-[#c5a059]/50"
                      >
                        <option value="available">Mark Available</option>
                        <option value="cleaning">Start Cleaning</option>
                        <option value="dirty">Mark Dirty</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-20 text-center text-white/10 uppercase tracking-[5px]">
                  No Rooms Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HousekeepingPanel;