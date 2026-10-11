import React, { useState } from 'react';
import axios from 'axios';
import { Star, Send, MessageSquare, ShieldCheck, Loader2, ArrowLeft, Globe } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion'; 
import { useAuth } from '../../store/auth';

const API_URL = "http://localhost:5000/api/feedback/submit";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const labels = {
    5: "Exceptional Service",
    4: "Exceeded Expectations",
    3: "Satisfactory Stay",
    2: "Room for Improvement",
    1: "Below Standards",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a rating.");
    if (!comment.trim()) return toast.error("Please provide your feedback.");

    setIsSubmitting(true);
    try {
      const response = await axios.post(API_URL, {
        username: user?.username || "Valued Guest",
        rating,
        comment: comment.trim()
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      if (response.status === 200) {
        toast.success("Feedback Synchronized with Atlas Cluster.");
        setRating(0);
        setComment("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Network synchronization failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#c5a059] selection:text-black font-sans">
      
      {/* --- Navigation Header --- */}
      <nav className="p-8 flex justify-between items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
        <button className="flex items-center gap-2 text-[10px] uppercase tracking-[4px] group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Suite
        </button>
        <div className="flex items-center gap-4">
            <Globe size={14} className="text-[#c5a059]" />
            <span className="text-[10px] tracking-[4px]">INTL / TERMINAL</span>
        </div>
      </nav>

      {/* --- Main Content Layout --- */}
      <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-12 md:py-20">
        
        {/* Left Side: Branding & Messaging */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-[#c5a059] text-xs uppercase tracking-[8px] font-bold italic">The Guest Journal</h3>
            <h1 className="text-5xl md:text-7xl font-serif leading-tight">
              Every detail <br /> 
              <span className="text-white/30 italic">matters to us.</span>
            </h1>
          </div>
          <p className="text-white/40 font-light leading-relaxed max-w-sm text-sm">
            At Atlas Cluster, excellence is a moving target. Your insights provide the compass by which we navigate our standards of luxury.
          </p>
          
          {/* Stats/Metrics for Professional Look */}
          <div className="flex gap-12 pt-8 border-t border-white/5">
            <div>
              <p className="text-[#c5a059] text-xl font-serif">98%</p>
              <p className="text-[9px] uppercase tracking-widest text-white/20">Global Satisfaction</p>
            </div>
            <div>
              <p className="text-[#c5a059] text-xl font-serif">24/7</p>
              <p className="text-[9px] uppercase tracking-widest text-white/20">Secure Node Sync</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Professional Feedback Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          {/* Ambient Glow behind card */}
          <div className="absolute -inset-1 bg-[#c5a059]/5 blur-3xl rounded-full opacity-30" />
          
          <div className="relative bg-[#0d0d0d] border border-white/5 p-10 md:p-14 rounded-sm shadow-2xl shadow-black">
            <header className="text-center mb-12">
              <h2 className="text-[11px] uppercase tracking-[6px] text-white/60 mb-3">Guest Satisfaction</h2>
              <div className="h-[1px] w-10 bg-[#c5a059]/40 mx-auto" />
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Star Interaction Area */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseEnter={() => setHover(s)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(s)}
                      className="transition-all duration-300 transform hover:scale-125 focus:outline-none"
                    >
                      <Star 
                        size={26} 
                        fill={(hover || rating) >= s ? "#c5a059" : "none"} 
                        className={(hover || rating) >= s ? "text-[#c5a059] drop-shadow-[0_0_10px_rgba(197,160,89,0.4)]" : "text-white/10"}
                        strokeWidth={1.2}
                      />
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={hover || rating}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-[#c5a059] uppercase tracking-[4px] font-medium h-4 italic"
                  >
                    {labels[hover || rating] || ""}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Text Input Area */}
              <div className="relative group border-b border-white/10 focus-within:border-[#c5a059]/40 transition-all duration-500">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe your experience with us..."
                  className="w-full bg-transparent py-4 text-white text-sm outline-none h-32 resize-none placeholder:text-white/5 tracking-wide font-light leading-relaxed"
                />
                <MessageSquare className="absolute top-4 right-0 text-white/5 group-focus-within:text-[#c5a059]/10" size={16} />
              </div>

              {/* Action Button: Normal Solid Style */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#c5a059] hover:bg-[#d4b577] active:scale-[0.98] py-4 text-black flex items-center justify-center gap-3 transition-all duration-500 disabled:opacity-50 group"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    <span className="text-[11px] font-black uppercase tracking-[5px]">Send Feedback</span>
                  </>
                )}
              </button>
            </form>

            {/* Bottom Security Branding */}
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-3">
               <div className="flex items-center gap-2 opacity-30">
                  <ShieldCheck size={12} className="text-[#c5a059]" />
                  <p className="text-[8px] text-white uppercase tracking-[4px]">Verified Secure Node Transfer</p>
               </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Floating Side Badge */}
      <aside className="fixed bottom-10 left-10 hidden xl:block pointer-events-none">
        <p className="text-[8px] text-white/10 uppercase tracking-[6px] [writing-mode:vertical-lr] rotate-180">
          Atlas Cluster Terminal © 2026
        </p>
      </aside>
    </div>
  );
};

export default FeedbackPage;