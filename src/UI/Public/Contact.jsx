import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, Globe } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      if (response.status === 200) {
        setStatus('success');
        setFormData({ fullName: '', email: '', subject: 'General Inquiry', message: '' });
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-20 font-serif text-white selection:bg-[#c5a059] selection:text-black overflow-hidden relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c5a059]/5 blur-[160px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c5a059]/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- DYNAMIC HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-28"
        >
          <span className="text-[#c5a059] text-[10px] uppercase tracking-[10px] font-bold block mb-6 italic">Protocol 04: Contact</span>
          <h2 className="text-5xl md:text-7xl font-extralight uppercase tracking-[15px] mb-8 leading-tight">
            Get In <span className="italic text-white/40">Touch</span>
          </h2>
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT: OFFICE INFO --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 space-y-16"
          >
            <div className="space-y-10">
              <div className="group border-l border-white/5 pl-8 hover:border-[#c5a059] transition-all duration-700">
                <div className="flex items-center gap-4 mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                  <MapPin size={18} className="text-[#c5a059]" />
                  <span className="text-[10px] uppercase tracking-[4px]">Location</span>
                </div>
                <h3 className="text-xl font-light tracking-wide mb-2 uppercase">Ahsanabad</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed font-light tracking-widest uppercase">
                  123 Luxury Boulevard, Karachi, PK
                </p>
              </div>

              <div className="group border-l border-white/5 pl-8 hover:border-[#c5a059] transition-all duration-700">
                <div className="flex items-center gap-4 mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                  <Phone size={18} className="text-[#c5a059]" />
                  <span className="text-[10px] uppercase tracking-[4px]">Direct Line</span>
                </div>
                <h3 className="text-2xl font-light text-[#c5a059] tracking-[3px]">+92 300 1234567</h3>
                <p className="text-gray-600 text-[10px] uppercase tracking-[2px] mt-2 italic">Exclusive 24/7 Concierge Support</p>
              </div>

              <div className="group border-l border-white/5 pl-8 hover:border-[#c5a059] transition-all duration-700">
                <div className="flex items-center gap-4 mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                  <Globe size={18} className="text-[#c5a059]" />
                  <span className="text-[10px] uppercase tracking-[4px]">Network</span>
                </div>
                <p className="text-gray-500 text-[13px] font-light tracking-[2px]">atlas.cluster.internal</p>
              </div>
            </div>

            <div className="bg-white/[0.02] p-8 border border-white/5 rounded-sm">
              <p className="text-[9px] uppercase tracking-[5px] text-[#c5a059] mb-4">Response Time</p>
              <p className="text-gray-400 text-xs font-light leading-loose">
                Average synchronization: <span className="text-white italic">&lt; 15 Minutes</span><br/>
                Global Support: <span className="text-white uppercase tracking-tighter">Operational 24/7</span>
              </p>
            </div>
          </motion.div>

          {/* --- RIGHT: FORM SECTION (Normal Button Applied) --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7 bg-[#0d0d0d] border border-white/5 p-10 md:p-16 relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#c5a059]/20"></div>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <CheckCircle2 size={60} className="text-[#c5a059] mx-auto mb-8 stroke-[1px] animate-pulse" />
                  <h3 className="text-white uppercase tracking-[8px] mb-4 text-lg">Message Synced</h3>
                  <p className="text-gray-500 text-[11px] tracking-[3px] uppercase leading-relaxed max-w-xs mx-auto">
                    Data has been securely transmitted to Atlas Cluster Central.
                  </p>
                  <button 
                    onClick={() => setStatus('')}
                    className="mt-12 text-[10px] uppercase tracking-[5px] text-[#c5a059] hover:text-white border-b border-[#c5a059]/30 pb-2 transition-all"
                  >
                    Initiate New Transfer
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative group border-b border-white/10 focus-within:border-[#c5a059] transition-all duration-500">
                      <label className="text-[9px] uppercase tracking-[4px] text-white/30 group-focus-within:text-[#c5a059]">Identification</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="MARIHA ASHFAQ"
                        className="w-full bg-transparent py-3 text-[12px] tracking-[2px] text-white outline-none placeholder:opacity-10 uppercase"
                        required 
                      />
                    </div>
                    <div className="relative group border-b border-white/10 focus-within:border-[#c5a059] transition-all duration-500">
                      <label className="text-[9px] uppercase tracking-[4px] text-white/30 group-focus-within:text-[#c5a059]">Secure Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="PROTOCOL@ATLAS.COM"
                        className="w-full bg-transparent py-3 text-[12px] tracking-[2px] text-white outline-none placeholder:opacity-10 uppercase"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="relative group border-b border-white/10 focus-within:border-[#c5a059] transition-all duration-500">
                    <label className="text-[9px] uppercase tracking-[4px] text-white/30 group-focus-within:text-[#c5a059]">Inquiry Type</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent py-3 text-[12px] tracking-[2px] text-white outline-none cursor-pointer uppercase font-sans"
                    >
                      <option className="bg-black" value="General Inquiry">General Inquiry</option>
                      <option className="bg-black" value="Room Reservation">Room Reservation</option>
                      <option className="bg-black" value="Event Planning">Event Planning</option>
                      <option className="bg-black" value="Feedback">Strategic Feedback</option>
                    </select>
                  </div>

                  <div className="relative group border-b border-white/10 focus-within:border-[#c5a059] transition-all duration-500">
                    <label className="text-[9px] uppercase tracking-[4px] text-white/30 group-focus-within:text-[#c5a059]">Detailed Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4" 
                      placeholder="HOW MAY WE ASSIST YOUR STAY?"
                      className="w-full bg-transparent py-3 text-[12px] tracking-[2px] text-white outline-none resize-none placeholder:opacity-10 uppercase font-sans leading-relaxed"
                      required
                    ></textarea>
                  </div>

                  {/* ✅ NORMAL BUTTON SIZE: py-5 se py-3.5 kar diya hai */}
                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full group bg-[#c5a059] hover:bg-white text-black py-3.5 transition-all duration-700 disabled:opacity-50 flex items-center justify-center gap-4 overflow-hidden relative"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[6px] relative z-10 flex items-center gap-3">
                      {status === 'sending' ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <><Send size={14} /> Send Message</>
                      )}
                    </span>
                  </button>
                  
                  {status === 'error' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] uppercase tracking-[3px] text-center text-red-500 font-bold">
                      Connection Interrupted. Check Backend Status.
                    </motion.p>
                  )}
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Floating UI Detail */}
      <div className="fixed bottom-10 right-10 hidden xl:block opacity-10">
        <p className="text-[8px] uppercase tracking-[10px] [writing-mode:vertical-rl]">
          Atlas Cluster Central Node
        </p>
      </div>
    </div>
  );
};

export default Contact;