import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, RefreshCw, MessageSquare, User, Calendar, Trash2, Edit3, Activity } from 'lucide-react';
import { toast } from 'react-toastify';

const FeedbackPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Feedbacks from Atlas
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/feedbacks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to sync feedback ledger");
    } finally {
      setLoading(false);
    }
  };

  // 2. DELETE Logic: Purge from Database
  const handleDeleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to purge this record from Atlas?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/admin/feedbacks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // UI Update: Record foran remove karein
        setFeedbacks(prev => prev.filter(item => item._id !== id));
        toast.success("Guest review purged successfully");
      } catch (error) {
        console.error("Delete Error:", error.response?.data || error.message);
        toast.error("Authorization Failed: Record restricted");
      }
    }
  };

  // 3. EDIT/REPLY Logic: (Feature Trigger)
  const handleEditReply = (id) => {
    // Filhal demo ke liye toast, aap yahan Reply Modal open karwa sakti hain
    toast.info("Reply feature is currently in maintenance mode.");
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#0a0a0a] min-h-screen animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-8 gap-4 shadow-sm">
        <div>
          <h2 className="text-[#c5a059] text-[14px] uppercase tracking-[6px] font-medium">Guest Sentiment</h2>
          <p className="text-white/20 text-[9px] uppercase tracking-[2px] mt-2 italic">LuxuryStay Feedback Moderation</p>
        </div>
        <button 
          onClick={fetchFeedbacks} 
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-[#c5a059]/20 text-[#c5a059] text-[10px] uppercase tracking-widest hover:bg-[#c5a059]/5 transition-all"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Synchronizing...' : 'Refresh Cluster'}
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-sm relative overflow-hidden group">
          <MessageSquare className="absolute -right-4 -bottom-4 text-white/[0.02]" size={80} />
          <p className="text-white/30 text-[9px] uppercase tracking-[2px]">Total Reviews</p>
          <p className="text-[#c5a059] text-3xl font-light mt-2">{feedbacks.length}</p>
        </div>
        <div className="bg-[#0d0d0d] border border-white/5 p-6 rounded-sm relative overflow-hidden group">
          <Star className="absolute -right-4 -bottom-4 text-white/[0.02]" size={80} />
          <p className="text-white/30 text-[9px] uppercase tracking-[2px]">Sentiment Score</p>
          <p className="text-[#c5a059] text-3xl font-light mt-2">
            {feedbacks.length > 0 ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1) : "0.0"}
          </p>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-[#0d0d0d] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.01] border-b border-white/5">
                <th className="p-6 text-[10px] uppercase tracking-[3px] text-[#c5a059]">Guest</th>
                <th className="p-6 text-[10px] uppercase tracking-[3px] text-[#c5a059]">Comment</th>
                <th className="p-6 text-[10px] uppercase tracking-[3px] text-[#c5a059] text-center">Rating</th>
                <th className="p-6 text-[10px] uppercase tracking-[3px] text-[#c5a059] text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-32 text-center">
                    <Activity className="animate-spin text-[#c5a059] mx-auto mb-4" size={40} />
                    <p className="text-white/10 text-[9px] uppercase tracking-[5px]">Accessing Database Cluster...</p>
                  </td>
                </tr>
              ) : feedbacks.length > 0 ? (
                feedbacks.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
                          <User size={12} />
                        </div>
                        <span className="text-white/80 text-[11px] font-medium uppercase tracking-wider">{item.username}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-white/40 text-[11px] leading-relaxed max-w-sm italic tracking-wide">
                        "{item.comment}"
                      </p>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={8} fill={i < item.rating ? "#c5a059" : "none"} className={i < item.rating ? "text-[#c5a059]" : "text-white/5"} />
                        ))}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-end gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
                        {/* Edit/Reply Button */}
                        <button 
                          onClick={() => handleEditReply(item._id)}
                          className="p-2 text-white/40 hover:text-[#c5a059] hover:bg-[#c5a059]/5 transition-all rounded-md border border-white/5"
                        >
                          <Edit3 size={14} />
                        </button>
                        {/* Delete Button */}
                        <button 
                          onClick={() => handleDeleteFeedback(item._id)}
                          className="p-2 text-white/40 hover:text-rose-500 hover:bg-rose-500/5 transition-all rounded-md border border-white/5"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center text-white/10 uppercase tracking-[4px]">
                    No feedback records detected
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPanel;