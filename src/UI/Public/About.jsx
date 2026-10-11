import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'; 
import { ArrowDownCircle, Trophy, MapPin, Users, Hotel } from 'lucide-react';

const About = () => {
  const galleryRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]); 

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { label: "Bespoke Suites", value: "150+", icon: <Hotel size={20} /> },
    { label: "Global Capitals", value: "12", icon: <MapPin size={20} /> },
    { label: "Service Awards", value: "25", icon: <Trophy size={20} /> },
    { label: "Luxury Experts", value: "300+", icon: <Users size={20} /> }
  ];

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", title: "The Royal Suite" },
    { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d", title: "Oceanic View" },
    { url: "https://images.unsplash.com/photo-1540518614846-7eded433c457", title: "Grand Lounge" },
    { url: "https://images.unsplash.com/photo-1561501900-3701fa6a0864", title: "Dining Excellence" }
  ];

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-20 font-serif text-white overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c5a059]/5 blur-[150px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col lg:flex-row items-center gap-20 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <span className="text-[#c5a059] text-[10px] uppercase tracking-[10px] font-bold block mb-4">Established 1995</span>
              <h2 className="text-5xl md:text-7xl font-extralight uppercase tracking-tight leading-[1.1]">
                The Art of <br />
                <span className="italic font-serif text-[#c5a059]">Refined Living</span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed font-light max-w-lg">
              LuxuryStay is a sanctuary of elegance. We redefine the hospitality landscape through timeless design and an obsession with the guest experience.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToGallery}
              className="flex items-center gap-4 text-[#c5a059] text-[10px] uppercase tracking-[4px] border-b border-[#c5a059]/30 pb-2 hover:border-[#c5a059] transition-all"
            >
              Explore Atmosphere <ArrowDownCircle size={16} />
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute -inset-6 border border-[#c5a059]/10 rounded-sm -z-10 translate-x-4 translate-y-4" />
            <div className="overflow-hidden bg-[#111]">
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070" 
                alt="Luxury Lobby" 
                className="w-full h-[600px] object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-[2s] grayscale hover:grayscale-0"
              />
            </div>
          </motion.div>
        </section>

        {/* --- STATS SECTION --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-20 border-y border-white/5 mb-32 bg-white/[0.01] backdrop-blur-sm px-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center space-y-4 group"
            >
              <div className="text-[#c5a059]/40 group-hover:text-[#c5a059] transition-colors duration-500">{stat.icon}</div>
              <div className="text-center">
                <h4 className="text-white text-4xl font-extralight mb-1 tracking-tighter">{stat.value}</h4>
                <p className="text-[9px] uppercase tracking-[4px] text-gray-500 font-bold">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- MISSION SECTION --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-48">
          <div className="relative h-[600px] group overflow-hidden">
             <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" 
              alt="Mission" 
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>

          <div className="space-y-12">
            <h3 className="text-3xl font-light uppercase tracking-[8px]">Our <span className="text-[#c5a059]">Manifesto</span></h3>
            <div className="space-y-10">
              {[
                { title: "Excellence", desc: "Striving for perfection in every micro-detail of your stay." },
                { title: "Heritage", desc: "Preserving the classic art of service since the last three decades." },
                { title: "Privacy", desc: "Your sanctuary is guarded with the utmost discretion and care." }
              ].map((item, idx) => (
                <div key={idx} className="group cursor-default border-l border-[#c5a059]/20 pl-6 hover:border-[#c5a059] transition-all">
                  <h5 className="text-[#c5a059] text-[12px] uppercase tracking-[3px] mb-2 font-bold">{item.title}</h5>
                  <p className="text-gray-400 text-sm font-light leading-relaxed group-hover:text-white transition-colors">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- DYNAMIC GALLERY SECTION --- */}
        <section ref={galleryRef} className="pt-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-[#c5a059] text-[10px] uppercase tracking-[10px] font-bold block">Atmosphere</span>
              <h2 className="text-4xl font-light uppercase tracking-[8px]">Curated <span className="italic">Visuals</span></h2>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-[3px] max-w-xs text-right hidden md:block">
              A glimpse into the soul of LuxuryStay across the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {galleryImages.map((img, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative h-[500px] overflow-hidden group cursor-pointer"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-700" />
                <div className="absolute bottom-10 left-10 overflow-hidden">
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="text-white text-xs uppercase tracking-[6px] font-bold"
                  >
                    {img.title}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;