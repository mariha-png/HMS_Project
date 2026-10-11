import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#070707] min-h-screen flex items-center justify-center font-serif text-white relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a059]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        
        {/* Animated Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="flex justify-center mb-12"
        >
          <div className="p-8 border border-[#c5a059]/20 rounded-full relative">
            <Compass size={60} className="text-[#c5a059] animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-0 border border-[#c5a059]/40 rounded-full animate-ping opacity-20" />
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-[120px] md:text-[160px] font-extralight leading-none tracking-tighter text-white/10 select-none">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl uppercase tracking-[10px] mb-6 -mt-10 md:-mt-14 font-light">
            Lost in <span className="italic text-[#c5a059]">Sanctuary</span>
          </h2>
          
          <p className="text-gray-500 text-[13px] tracking-[2px] uppercase max-w-md mx-auto leading-loose mb-12">
            The suite you are looking for has been moved or does not exist in our private collection.
          </p>
        </motion.div>

        {/* Professional Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => navigate("/")}
            className="group relative inline-flex items-center gap-4 px-10 py-4 border border-[#c5a059] text-[#c5a059] text-[10px] uppercase tracking-[4px] font-bold overflow-hidden transition-all duration-500 hover:text-black"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft size={14} /> Return to Grand Lobby
            </span>
            <div className="absolute inset-0 bg-[#c5a059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </button>
        </motion.div>

      </div>

      {/* Side Decorative Text */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <p className="text-[9px] text-white/20 uppercase tracking-[5px] [writing-mode:vertical-lr] rotate-180">
          Error Protocol _ 0404
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;