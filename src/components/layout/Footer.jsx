import React from "react";
import { NavLink } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaChevronUp } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 px-6 font-serif border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* --- 1. CONTACT INFO --- */}
        <div className="space-y-8">
          <h4 className="text-lg uppercase tracking-[3px] font-bold border-b-2 border-[#c5a059] inline-block pb-1">
            Contact Info
          </h4>
          <ul className="space-y-6 text-gray-400 font-sans text-sm">
            <li className="flex items-center gap-4">
              <FaPhoneAlt className="text-[#c5a059]" />
              <span>+980 (1234) 567 220</span>
            </li>
            <li className="flex items-center gap-4">
              <FaEnvelope className="text-[#c5a059]" />
              <span>marihaashfaq@gmail.com</span>
            </li>
            <li className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-[#c5a059] mt-1" />
              <span className="leading-relaxed">102/B New Elephant <br /> Rd Dhaka - 1212</span>
            </li>
          </ul>
          
          <div className="flex gap-3 pt-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaPinterestP].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-300">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* --- 2. USEFUL LINKS (UPDATED) --- */}
        <div className="space-y-8 lg:pl-10">
          <h4 className="text-lg uppercase tracking-[3px] font-bold border-b-2 border-[#c5a059] inline-block pb-1">
            Useful Links
          </h4>
          <ul className="space-y-4 text-gray-400 font-sans text-sm">
            <li><NavLink to="/" className="hover:text-[#c5a059] transition-colors flex items-center gap-2">• Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-[#c5a059] transition-colors flex items-center gap-2">• About Hotel</NavLink></li>
            <li><NavLink to="/rooms" className="hover:text-[#c5a059] transition-colors flex items-center gap-2">• Rooms & Suites</NavLink></li>
            <li><NavLink to="/services" className="hover:text-[#c5a059] transition-colors flex items-center gap-2">• Services</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-[#c5a059] transition-colors flex items-center gap-2">• Contact</NavLink></li>
          </ul>
        </div>

        {/* --- 3. GALLERY --- */}
        <div className="space-y-8">
          <h4 className="text-lg uppercase tracking-[3px] font-bold border-b-2 border-[#c5a059] inline-block pb-1">
            Gallery
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {[
              "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200",
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200",
              "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200",
              "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200",
              "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200",
              "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=200"
            ].map((img, idx) => (
              <div key={idx} className="overflow-hidden aspect-square group cursor-pointer border border-white/5">
                <img src={img} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* --- 4. NEWSLETTER --- */}
        <div className="space-y-8">
          <h4 className="text-lg uppercase tracking-[3px] font-bold border-b-2 border-[#c5a059] inline-block pb-1">
            Newsletter
          </h4>
          <p className="text-gray-400 font-sans text-sm">Subscribe our Newsletter</p>
          <div className="space-y-3">
            <input 
              type="email" 
              placeholder="Enter Your Email..." 
              className="w-full bg-[#1a1a1a] border border-white/10 text-white px-6 py-4 outline-none font-sans text-sm focus:border-[#c5a059]/50 transition-all"
            />
            <button className="w-full bg-[#c5a059] text-black font-bold uppercase tracking-[2px] py-4 text-xs hover:bg-white transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center relative">
        <p className="text-gray-500 text-[13px] tracking-wide">
          © 2026, <span className="text-[#c5a059]">LUXURYSTAY</span>. All Rights Reserved.
        </p>
        
        <button 
          onClick={scrollToTop}
          className="mt-6 md:mt-0 w-12 h-12 bg-[#c5a059]/10 flex items-center justify-center rounded-full text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all group"
        >
          <FaChevronUp className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;