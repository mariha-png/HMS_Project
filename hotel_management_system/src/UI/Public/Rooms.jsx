
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Icons
import { FaWifi, FaCoffee, FaWind, FaTv, FaSwimmingPool } from "react-icons/fa";

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // --- Icon Helper ---
  const renderAmenityIcon = (amenity) => {
    const iconStyle = { transition: "all 0.4s ease" };
    switch (amenity.toLowerCase()) {
      case 'wifi': return <FaWifi style={iconStyle} title="High-Speed Wi-Fi" />;
      case 'ac': return <FaWind style={iconStyle} title="Air Conditioning" />;
      case 'coffee': return <FaCoffee style={iconStyle} title="Premium Coffee" />;
      case 'tv': return <FaTv style={iconStyle} title="Smart TV" />;
      case 'pool': return <FaSwimmingPool style={iconStyle} title="Pool Access" />;
      default: return null;
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/rooms/all-rooms");
        setRooms(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const filteredRooms = filter === "All" ? rooms : rooms.filter(r => r.roomType === filter);
  const categories = ["All", ...new Set(rooms.map(r => r.roomType))];

  if (loading) return (
    <div className="bg-[#070707] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-t-2 border-[#c5a059] border-solid rounded-full animate-spin"></div>
        <div className="text-[#c5a059] tracking-[8px] uppercase text-[10px] font-light italic">Loading Sanctuary...</div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#070707] text-[#f5f5f5] font-serif min-h-screen pt-32 pb-32 selection:bg-[#c5a059] selection:text-black">
      
      {/* Background Decorative Element */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#c5a059]/5 to-transparent pointer-events-none -z-10" />

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24 px-6"
      >
        <span className="uppercase text-[10px] text-[#c5a059] font-bold mb-6 tracking-[12px] block">Protocol 04: Residential</span>
        <h1 className="text-5xl md:text-7xl font-extralight tracking-[8px] mb-6 uppercase">
          Private <span className="italic text-white/40">Collections</span>
        </h1>
        <div className="h-[1px] w-24 bg-[#c5a059]/40 mx-auto" />
      </motion.div>

      {/* Professional Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-24 px-6">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)} 
            className={`group relative text-[11px] uppercase tracking-[4px] transition-all duration-500 pb-2 
              ${filter === cat ? "text-[#c5a059]" : "text-white/30 hover:text-white"}`}
          >
            {cat}
            <span className={`absolute bottom-0 left-0 h-[1px] bg-[#c5a059] transition-all duration-500 
              ${filter === cat ? "w-full" : "w-0 group-hover:w-1/2"}`} 
            />
          </button>
        ))}
      </div>

      {/* Luxury Grid */}
      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
        <AnimatePresence mode="popLayout">
          {filteredRooms.map((room) => (
            <motion.div 
              key={room._id} 
              layout
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
              onClick={() => navigate(`/booking/${room._id}`)}
            >
              
              {/* Image Section with Advanced Overlays */}
              <div className="relative overflow-hidden aspect-[4/5] mb-8 bg-[#111] border border-white/5 transition-all duration-700 group-hover:border-[#c5a059]/20 shadow-2xl">
                <img 
                  src={room.roomImage?.startsWith('http') ? room.roomImage : `http://localhost:5000/${room.roomImage}`} 
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  alt={room.roomNumber} 
                />
                
                {/* Price Tag - Elegant Glassmorphism */}
                <div className="absolute top-0 right-0 p-6">
                  <div className="bg-black/40 backdrop-blur-xl px-5 py-3 border border-white/10 text-[#c5a059] text-[12px] tracking-[2px] font-light">
                    From <span className="font-bold ml-1">${room.roomPrice}</span>
                  </div>
                </div>
                
                {/* Status Indicator */}
                <div className="absolute top-0 left-0 p-6">
                  <div className={`px-4 py-1.5 text-[9px] tracking-[3px] uppercase font-bold shadow-lg
                    ${room.roomStatus === 'available' ? 'bg-[#c5a059] text-black' : 'bg-red-950 text-white/80'}`}>
                    {room.roomStatus}
                  </div>
                </div>

                {/* AMENITIES OVERLAY - Minimalist approach */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute bottom-0 left-0 w-full p-10 translate-y-10 group-hover:translate-y-0 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100">
                  <div className="flex gap-6 text-white/80 text-xl border-t border-white/10 pt-6">
                    {room.amenities?.map((a, i) => (
                      <span key={i} className="hover:text-[#c5a059] transition-all transform hover:scale-125">
                        {renderAmenityIcon(a)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Section - Refined Typography */}
              <div className="text-center px-4">
                <p className="text-[10px] text-[#c5a059] uppercase tracking-[5px] mb-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0 italic">
                  Exquisite Sanctuary
                </p>
                <h3 className="text-2xl tracking-[5px] uppercase font-extralight mb-2 group-hover:text-[#c5a059] transition-colors duration-500">
                  Suite <span className="font-normal">{room.roomNumber}</span>
                </h3>
                <p className="text-[10px] text-white/30 uppercase tracking-[3px] mb-8 group-hover:text-white/60 transition-colors italic">
                  {room.roomType}
                </p>
                
                {/* Button with Fill Effect */}
                <div className="relative inline-block overflow-hidden">
                   <button className="px-12 py-4 border border-white/10 text-[10px] uppercase tracking-[4px] relative z-10 group-hover:text-black transition-colors duration-500 font-bold">
                    Reserve Suite
                    <div className="absolute inset-0 bg-[#c5a059] -z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Rooms;