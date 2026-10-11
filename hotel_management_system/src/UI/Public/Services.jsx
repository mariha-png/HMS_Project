
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel, Utensils, Sparkles, Bell, Shield, Crown, Star, X, ArrowRight } from 'lucide-react';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTier, setSelectedTier] = useState(null);
  const [isMembership, setIsMembership] = useState(false); 
  const [formData, setFormData] = useState({ name: '', email: '', message: '', tier: '' });
  const [loading, setLoading] = useState(false);

  // --- Animation Variants ---
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.15 } }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitData = async (payload) => {
    setLoading(true);
    try {
      const endpoint = isMembership 
        ? 'http://localhost:5000/api/memberships' 
        : 'http://localhost:5000/api/inquiries';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(isMembership ? "Membership application submitted!" : "Inquiry saved successfully!");
        setFormData({ name: '', email: '', message: '', tier: '' });
        setIsModalOpen(false);
        setSelectedTier(null);
        setIsMembership(false); 
      } else {
        const data = await response.json();
        alert(data.extraDetails || data.message || "Submission failed.");
      }
    } catch (error) {
      alert("Network error. Backend check karein.");
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    submitData(formData);
  };

  const handleMembershipApply = () => {
    setIsMembership(true); 
    setIsModalOpen(true);
    setFormData({
      ...formData,
      tier: selectedTier.type, 
      message: `Membership Application: ${selectedTier.type}`
    });
    setSelectedTier(null);
  };

  const servicesData = [
    { 
      title: "Luxury Accommodation", 
      subtitle: "The Royal Suites",
      longDesc: "Experience a sanctuary of absolute comfort. Our suites are curated with hand-picked Italian marble, smart home automation, and a personalized pillow menu.",
      icon: <Hotel size={24} />,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070",
      features: ["Smart Room Control", "Pillow Menu", "Italian Marble Bath"],
      timing: "24/7 Availability",
      access: "Private Entrance"
    },
    { 
      title: "Fine Dining", 
      subtitle: "The Atrium",
      longDesc: "A culinary journey that celebrates organic, locally-sourced ingredients transformed by Michelin-starred expertise.",
      icon: <Utensils size={24} />,
      image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2070",
      features: ["Organic Ingredients", "Private Chef", "Wine Pairing"],
      timing: "18:00 - 23:00",
      access: "Main Restaurant"
    },
    { 
      title: "Wellness & Spa", 
      subtitle: "The Sanctuary",
      longDesc: "Rediscover balance in our world-class sanctuary combining ancient techniques with modern skincare science.",
      icon: <Sparkles size={24} />,
      image: "https://images.pexels.com/photos/6663571/pexels-photo-6663571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
      features: ["Moroccan Hammam", "Heated Pool", "Aroma Therapy"],
      timing: "09:00 - 22:00",
      access: "Private Session"
    },
    { 
      title: "Concierge Service", 
      subtitle: "Elite Desk",
      longDesc: "Your time is your most precious asset. Our dedicated team handles every logistical detail leaving you free to enjoy.",
      icon: <Bell size={24} />,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
      features: ["Chauffeur Service", "Event Booking", "Personal Shopper"],
      timing: "24/7 Service",
      access: "Global Desk"
    }
  ];

  const tiers = [
    { type: "Silver", icon: <Shield size={20}/>, benefit: "10% Spa Discount", details: ["Priority Check-in", "Welcome Drink", "Complimentary High-speed Wi-Fi"] },
    { type: "Gold", icon: <Crown size={20}/>, benefit: "Late Check-out & Lounge", details: ["Suite Upgrades", "Private Lounge Access", "Breakfast Included"] },
    { type: "Platinum", icon: <Star size={20}/>, benefit: "All-Inclusive & Butler", details: ["24/7 Personal Butler", "Unlimited Spa Sessions", "Private Airport Transfer"] }
  ];

  const current = servicesData[activeTab];

  return (
    <div className="bg-[#070707] min-h-screen pt-32 pb-20 font-serif text-white relative overflow-hidden selection:bg-[#c5a059] selection:text-black">
      
      {/* Background Ambient Glow */}
      <motion.div 
        animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#c5a059] blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="text-[#c5a059] text-[10px] uppercase tracking-[10px] font-bold block mb-4 italic">Protocol 02: Excellence</span>
          <h2 className="text-5xl md:text-6xl font-extralight uppercase tracking-[15px] mb-8">
            Our <span className="italic text-white/40">Services</span>
          </h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: "96px" }} transition={{ duration: 1.5, ease: "circOut" }} className="h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto opacity-50" />
        </motion.div>

        {/* TAB NAVIGATION */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-24 border-b border-white/5">
          {servicesData.map((service, index) => (
            <button 
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-4 pb-8 transition-all duration-700 relative group ${activeTab === index ? 'text-[#c5a059]' : 'text-gray-600 hover:text-white'}`}
            >
              <div className={`transition-transform duration-500 ${activeTab === index ? 'scale-125' : 'opacity-40 group-hover:opacity-100 group-hover:scale-110'}`}>{service.icon}</div>
              <span className="text-[11px] uppercase tracking-[4px] font-medium hidden sm:block">{service.title}</span>
              {activeTab === index && <motion.div layoutId="serviceUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a059]" />}
            </button>
          ))}
        </div>

        {/* SERVICE CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
          >
            <motion.div initial="rest" whileHover="hover" className="lg:col-span-7 relative group cursor-pointer" onClick={() => { setIsMembership(false); setIsModalOpen(true); }}>
              <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="absolute -inset-4 border border-[#c5a059]/10 -z-10 translate-x-6 translate-y-6 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700" />
              <div className="overflow-hidden bg-[#0a0a0a] relative">
                <motion.img variants={{ hover: { scale: 1.08 } }} transition={{ duration: 1.5, ease: "circOut" }} src={current.image} alt={current.title} className="w-full h-[500px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                  <motion.span whileHover={{ x: 10 }} className="text-white text-[10px] tracking-[5px] uppercase flex items-center gap-3 cursor-pointer">
                    Inquire Now <ArrowRight size={14} />
                  </motion.span>
                </div>
              </div>
            </motion.div>
            
            <div className="lg:col-span-5 space-y-8">
              <motion.div variants={staggerContainer} initial="initial" animate="animate">
                <motion.span variants={fadeInUp} className="text-[#c5a059] text-[10px] uppercase tracking-[6px] font-bold block mb-4 italic">{current.subtitle}</motion.span>
                <motion.h3 variants={fadeInUp} className="text-4xl font-light uppercase tracking-[8px] mb-6 leading-tight">{current.title}</motion.h3>
                <motion.p variants={fadeInUp} className="text-gray-500 font-light leading-loose text-[14px] italic border-l-2 border-[#c5a059]/40 pl-8 py-2">"{current.longDesc}"</motion.p>
              </motion.div>

              <motion.ul variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 gap-4">
                {current.features.map((feature, i) => (
                  <motion.li key={i} variants={fadeInUp} className="flex items-center gap-4 text-[10px] text-gray-400 uppercase tracking-[3px]">
                    <div className="w-6 h-[1px] bg-[#c5a059]/50" /> {feature}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div>
                  <h4 className="text-[#c5a059] text-2xl font-light mb-1">{current.timing}</h4>
                  <p className="text-[9px] uppercase tracking-[3px] text-gray-600">Availability</p>
                </div>
                <div>
                  <h4 className="text-[#c5a059] text-2xl font-light mb-1">{current.access}</h4>
                  <p className="text-[9px] uppercase tracking-[3px] text-gray-600">Access Point</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* MEMBERSHIP TIERS */}
        <div className="mt-48">
          <div className="text-center mb-24">
            <motion.h3 initial={{ opacity: 0, letterSpacing: "5px" }} whileInView={{ opacity: 1, letterSpacing: "12px" }} className="text-3xl font-light uppercase">
              Elite <span className="italic text-[#c5a059]/80">Memberships</span>
            </motion.h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}
                whileHover={{ y: -15, borderColor: 'rgba(197, 160, 89, 0.4)' }}
                onClick={() => setSelectedTier(tier)} 
                className="bg-[#0c0c0c] border border-white/5 p-12 text-center group transition-all duration-700 cursor-pointer relative"
              >
                <div className="text-[#c5a059] flex justify-center mb-8 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">{tier.icon}</div>
                <h4 className="text-[13px] uppercase tracking-[6px] mb-4 font-bold">{tier.type}</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-[3px] mb-8">{tier.benefit}</p>
                <div className="text-[9px] text-[#c5a059] opacity-0 group-hover:opacity-100 transition-all tracking-[4px] uppercase border-t border-[#c5a059]/10 pt-6">Expand Details</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="mt-48 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-[#0a0a0a] border border-white/5 p-16 max-w-5xl mx-auto relative group overflow-hidden">
            <h3 className="text-2xl font-light tracking-[10px] uppercase mb-10 relative z-10">Crafting Unforgettable Experiences</h3>
            <motion.button 
              whileHover={{ scale: 1.05, letterSpacing: "6px" }} whileTap={{ scale: 0.98 }}
              onClick={() => { setIsMembership(false); setIsModalOpen(true); }} 
              className="relative z-10 px-10 py-3.5 border border-[#c5a059] text-[#c5a059] uppercase tracking-[4px] text-[10px] font-black hover:bg-[#c5a059] hover:text-black transition-all duration-500"
            >
              Consult with Concierge
            </motion.button>
          </motion.div>
        </div>

        {/* MODALS */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center px-4 backdrop-blur-xl">
              <div className="absolute inset-0 bg-black/95" onClick={() => { setIsModalOpen(false); setIsMembership(false); }}></div>
              <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} className="relative bg-[#0d0d0d] border border-[#c5a059]/20 p-10 max-w-lg w-full">
                <button onClick={() => { setIsModalOpen(false); setIsMembership(false); }} className="absolute top-6 right-6 text-gray-500 hover:text-[#c5a059] transition-colors"><X size={20}/></button>
                <h2 className="text-xl font-light tracking-[8px] uppercase text-[#c5a059] mb-10 text-center italic border-b border-white/5 pb-6">
                  {isMembership ? `${formData.tier} Application` : "Bespoke Inquiry"}
                </h2>
                <form className="space-y-6" onSubmit={handleInquirySubmit}>
                   <input name="name" type="text" placeholder="GUEST NAME" value={formData.name} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/10 py-3 text-[11px] tracking-[2px] text-white focus:border-[#c5a059] outline-none transition-all placeholder:text-gray-700 uppercase" required />
                   <input name="email" type="email" placeholder="SECURE EMAIL" value={formData.email} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/10 py-3 text-[11px] tracking-[2px] text-white focus:border-[#c5a059] outline-none transition-all placeholder:text-gray-700 uppercase" required />
                   
                   {/* DROP DOWN START */}
                   <div className="relative group">
                    <select 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      className="w-full bg-[#0d0d0d] border-b border-white/10 py-3 text-[11px] tracking-[2px] text-white focus:border-[#c5a059] outline-none transition-all appearance-none cursor-pointer uppercase"
                      required
                    >
                      <option value="" disabled>How may we assist?</option>
                      <option value="Room Reservation">Room Reservation</option>
                      <option value="Dining Inquiry">Fine Dining Inquiry</option>
                      <option value="Spa Booking">Wellness & Spa Booking</option>
                      <option value="Event Planning">Bespoke Event Planning</option>
                      <option value="Other">General Inquiry</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-[#c5a059]">
                      <ArrowRight size={14} className="rotate-90" />
                    </div>
                   </div>
                   {/* DROP DOWN END */}

                   <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-[#c5a059] text-black py-4 uppercase tracking-[5px] font-black text-[10px] hover:bg-white transition-all duration-700">
                     {loading ? "TRANSMITTING..." : "Send Request"}
                   </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}

          {selectedTier && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center px-4 backdrop-blur-2xl">
              <div className="absolute inset-0 bg-black/98" onClick={() => setSelectedTier(null)}></div>
              <motion.div initial={{ y: 50, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 50, opacity: 0, scale: 0.95 }} className="relative bg-[#0a0a0a] border border-[#c5a059]/30 p-12 max-w-xl w-full text-center">
                <button onClick={() => setSelectedTier(null)} className="absolute top-8 right-8 text-gray-500 hover:text-[#c5a059]"><X size={24}/></button>
                <div className="text-[#c5a059] flex justify-center mb-6">{selectedTier.icon}</div>
                <h2 className="text-3xl font-light tracking-[10px] uppercase mb-4 text-white">{selectedTier.type} Tier</h2>
                <p className="text-[#c5a059] text-[12px] tracking-[4px] mb-12 uppercase italic">{selectedTier.benefit}</p>
                <div className="text-left space-y-4 mb-12 border-y border-white/5 py-8">
                  {selectedTier.details.map((detail, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center gap-4 text-gray-400 text-[11px] tracking-[3px] uppercase font-light">
                      <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full" /> {detail}
                    </motion.div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleMembershipApply} className="w-full py-4 border-2 border-[#c5a059] text-[#c5a059] text-[10px] tracking-[5px] font-black uppercase hover:bg-[#c5a059] hover:text-black transition-all duration-700">
                  Apply Membership
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Services;