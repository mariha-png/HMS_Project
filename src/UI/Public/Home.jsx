


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Waves, Dumbbell, Coffee, Car, Utensils, GlassWater, 
  ChevronLeft, ChevronRight, X, Plus, Minus 
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  // --- STATES ---
  const [heroIndex, setHeroIndex] = useState(0);
  const [testiIndex, setTestiIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const backgroundImages = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070", 
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070", 
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000", 
  ];

  const testimonials = [
    { name: "Mariha Ashfaq", role: "Premium Member", text: "The attention to detail at LuxuryStay is unmatched. From the seamless check-in to the breathtaking views.", initials: "MA" },
    { name: "John Doe", role: "Business Traveler", text: "The fusion of modern technology with classic luxury makes it the best stay in the city.", initials: "JD" },
    { name: "Ayesha Siddiqua", role: "Lifestyle Blogger", text: "The hospitality team went above and beyond. Truly a 5-star experience for modern travelers.", initials: "AS" },
    { name: "Zain Ahmed", role: "Software Architect", text: "I appreciate the seamless tech integration and the minimalist dark aesthetic.", initials: "ZA" }
  ];

  const facilities = [
    { icon: <Waves size={24} />, label: "Infinity Pool", detail: "Enjoy our temperature-controlled pool with panoramic views." },
    { icon: <GlassWater size={24} />, label: "Luxury Spa", detail: "Rejuvenate your senses with our signature organic treatments." },
    { icon: <Dumbbell size={24} />, label: "Fitness Center", detail: "State-of-the-art equipment available 24/7." },
    { icon: <Coffee size={24} />, label: "Sky Bar", detail: "Artisan cocktails served in an elegant, elevated setting." },
    { icon: <Utensils size={24} />, label: "Fine Dining", detail: "A Michelin-star experience with local organic ingredients." },
    { icon: <Car size={24} />, label: "Valet Service", detail: "Seamless arrival and departure with our professional team." }
  ];

  const faqs = [
    { q: "What is the check-in and check-out time?", a: "Check-in starts from 2:00 PM, and check-out is until 12:00 PM." },
    { q: "Do you offer airport pick-up services?", a: "Yes, we provide luxury chauffeur services for airport transfers." },
    { q: "Is there a private workspace in the rooms?", a: "Every suite is equipped with high-speed fiber and an ergonomic workstation." }
  ];

  // Auto-Sliders Logic
  useEffect(() => {
    const heroTimer = setInterval(() => setHeroIndex((prev) => (prev + 1) % backgroundImages.length), 8000);
    const testiTimer = setInterval(() => setTestiIndex((prev) => (prev + 1) % testimonials.length), 5000);
    return () => { clearInterval(heroTimer); clearInterval(testiTimer); };
  }, []);

  return (
    <div className="bg-[#070707] text-[#f5f5f5] font-sans overflow-x-hidden min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5 }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImages[heroIndex]}')` }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h4 className="uppercase tracking-[5px] text-[12px] text-[#c5a059] mb-6 font-bold">The Pinnacle of Living</h4>
          <h1 className="text-4xl md:text-7xl mb-10 font-serif font-light leading-tight">
            Where Modernity Meets <br /> 
            <span className="italic text-[#c5a059]">Pure Elegance</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/rooms")} className="bg-[#c5a059] text-black px-10 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all">Explore Suites</button>
            <button onClick={() => navigate("/rooms")} className="border border-white/30 backdrop-blur-md px-10 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Reserve Now</button>
          </div>
        </motion.div>
      </section>

      {/* --- ABOUT SECTION (Scroll Animated + Grayscale Hover) --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="absolute -inset-4 border border-[#c5a059]/20 translate-x-6 translate-y-6 z-0 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-700"></div>
            <img 
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000" 
              className="relative z-10 w-full h-[550px] object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out shadow-2xl cursor-pointer" 
              alt="Luxury Interior"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h4 className="text-[#c5a059] tracking-[5px] text-[12px] uppercase font-bold">Our Heritage</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight">Crafting <span className="italic text-[#c5a059]">Moments</span> <br/> Since 1992</h2>
            <p className="text-gray-400 leading-relaxed font-light italic border-l-2 border-[#c5a059]/30 pl-6">
              "True luxury is found in the silence between high-tech features and old-world hospitality."
            </p>
            <button onClick={() => setIsStoryOpen(true)} className="text-[#c5a059] flex items-center gap-4 uppercase tracking-[3px] text-[11px] font-bold group pt-4">
              Our Full Philosophy <span className="w-12 h-[1px] bg-[#c5a059] group-hover:w-20 transition-all duration-500"></span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- FACILITIES (Staggered Animation) --- */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.h4 variants={fadeInUp} className="text-[#c5a059] tracking-[5px] text-[12px] uppercase mb-4 font-bold">Services</motion.h4>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif font-light italic mb-20">Signature Facilities</motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, backgroundColor: "#c5a059" }}
                onClick={() => setSelectedFacility(f)} 
                className="group border border-white/5 p-12 transition-all duration-500 cursor-pointer"
              >
                <div className="text-[#c5a059] group-hover:text-black transition-colors mb-6 flex justify-center">{f.icon}</div>
                <h5 className="text-[13px] font-bold uppercase tracking-widest text-white/90 group-hover:text-black">{f.label}</h5>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- TESTIMONIALS (Auto-Moving) --- */}
      <section className="py-32 bg-white text-black px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h4 className="text-[#c5a059] tracking-[4px] text-[11px] uppercase mb-6 font-bold">Testimonials</h4>
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-8 italic">Guest Experiences</h2>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${testiIndex === idx ? 'w-8 bg-[#c5a059]' : 'w-2 bg-gray-200'}`} />
              ))}
            </div>
          </div>

          <div className="relative min-h-[200px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div 
                key={testiIndex} 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -50 }} 
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <p className="text-xl md:text-2xl font-serif italic text-gray-700 leading-relaxed">"{testimonials[testiIndex].text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-[10px] rounded-full border-2 border-[#c5a059]">{testimonials[testiIndex].initials}</div>
                  <div>
                    <h5 className="font-bold text-[12px] uppercase tracking-widest">{testimonials[testiIndex].name}</h5>
                    <p className="text-[#c5a059] text-[10px] font-bold">{testimonials[testiIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-32 px-6 bg-[#070707]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-serif font-light mb-16 italic">Concierge <span className="text-[#c5a059]">Help</span></h2>
          <div className="space-y-3 text-left">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-white/10 bg-[#0a0a0a]">
                <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-6">
                  <span className={`text-[13px] uppercase tracking-[2px] font-medium transition-all ${activeFaq === idx ? 'text-[#c5a059]' : 'text-gray-400'}`}>{faq.q}</span>
                  {activeFaq === idx ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 overflow-hidden">
                      <p className="text-gray-400 text-sm italic pt-4 border-t border-white/5">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {(selectedFacility || isStoryOpen) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-xl w-full text-center p-10 bg-[#0a0a0a] border border-white/10 relative">
              <button onClick={() => {setSelectedFacility(null); setIsStoryOpen(false)}} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><X size={20}/></button>
              {selectedFacility ? (
                <>
                  <div className="text-[#c5a059] flex justify-center mb-6">{selectedFacility.icon}</div>
                  <h3 className="text-2xl font-serif italic text-white mb-4 uppercase tracking-[4px]">{selectedFacility.label}</h3>
                  <p className="text-gray-400 italic mb-8">"{selectedFacility.detail}"</p>
                  <button onClick={() => setSelectedFacility(null)} className="px-10 py-3 border border-[#c5a059] text-[#c5a059] text-[11px] font-bold uppercase hover:bg-[#c5a059] hover:text-black transition-all duration-300">Close</button>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-serif italic text-[#c5a059] mb-6">Our Philosophy</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">At LuxuryStay, we believe true elegance lies in details. We combine state-of-the-art tech with heartfelt hospitality to create an experience that feels like home, yet looks like a dream.</p>
                  <button onClick={() => setIsStoryOpen(false)} className="text-[#c5a059] uppercase tracking-[3px] text-[11px] font-bold border-b border-[#c5a059]">Back to Lobby</button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;