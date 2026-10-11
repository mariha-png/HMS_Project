import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { X, Printer, Download } from "lucide-react";

const Invoice = () => {
  const { bookingId } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  const [booking, setBooking] = useState(location.state?.guestData || null);
  const [loading, setLoading] = useState(!location.state?.guestData);

  useEffect(() => {
    const fetchInvoiceData = async () => {
     
      if (booking && !loading) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        // Backend API call
        if (bookingId && bookingId !== "undefined") {
          const response = await axios.get(`http://localhost:5000/api/bookings/${bookingId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data) setBooking(response.data);
        }
      } catch (err) {
        console.error("Invoice Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceData();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-[#c5a059] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#070707] flex flex-col items-center justify-center text-white px-6 text-center">
        <h2 className="text-3xl font-light mb-4 uppercase tracking-[4px]">Invoice Not Found</h2>
        <button 
          onClick={() => navigate(-1)}
          className="border border-[#c5a059] px-8 py-3 text-[#c5a059] uppercase tracking-[3px] text-[10px]"
        >
          Go Back
        </button>
      </div>
    );
  }

 
  const subtotal = booking.totalAmount || 0;
  const taxRate = 0.10;
  const taxAmount = subtotal * taxRate;
  const finalTotal = subtotal + taxAmount;

  return (
    <div className="min-h-screen bg-[#070707] pt-32 pb-20 px-6 font-serif flex justify-center items-start relative overflow-x-hidden">
      
      {/* ❌ CLOSE BUTTON */}
      <button 
        onClick={() => navigate(-1)} 
        className="fixed top-6 right-6 md:top-10 md:right-10 z-[9999] flex items-center gap-3 group transition-all duration-300"
      >
        <span className="hidden md:block text-[10px] uppercase tracking-[4px] text-white/20 group-hover:text-[#c5a059]">Close Receipt</span>
        <div className="p-3 bg-white/5 border border-white/10 rounded-full hover:border-[#c5a059] hover:bg-[#c5a059]/10 shadow-2xl backdrop-blur-sm text-white group-hover:text-[#c5a059]">
          <X size={24} />
        </div>
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-[#111] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Invoice Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-10 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl tracking-[8px] uppercase text-[#c5a059] mb-3 font-light">Invoice</h1>
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gray-700"></span>
              <p className="text-[10px] text-gray-500 tracking-[3px] uppercase">
                Receipt No: {booking._id?.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>
          <div className="mt-8 md:mt-0 text-left md:text-right">
            <h2 className="text-2xl tracking-[4px] uppercase text-white font-light">LuxuryStay</h2>
            <p className="text-[10px] text-[#c5a059] tracking-[4px] uppercase italic mt-1">Hospitality Group</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] text-[#c5a059] uppercase tracking-[4px] mb-3 font-bold">Guest Details</h4>
              <p className="text-2xl font-light text-white uppercase tracking-wider">
                {booking.guestId?.username || booking.guestName || "Valued Guest"}
              </p>
              <p className="text-sm text-gray-500 font-sans mt-1">{booking.guestId?.email || "No Email"}</p>
            </div>
            <div>
              <h4 className="text-[10px] text-[#c5a059] uppercase tracking-[4px] mb-3 font-bold">Room Information</h4>
              <p className="text-lg text-gray-300 italic">
                {booking.roomId?.roomType || "Premium Suite"} — Unit {booking.roomId?.roomNumber || "N/A"}
              </p>
            </div>
          </div>

          <div className="md:text-right space-y-6">
            <div>
              <h4 className="text-[10px] text-[#c5a059] uppercase tracking-[4px] mb-3 font-bold">Stay Period</h4>
              <p className="text-lg text-white">
                {new Date(booking.checkInDate).toLocaleDateString()} 
                <span className="text-[#c5a059] mx-2">—</span> 
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="bg-black/30 border border-white/5 p-8 mb-12">
          <div className="space-y-4 border-b border-white/5 pb-6 mb-6">
            <div className="flex justify-between items-center text-gray-400 text-[11px] uppercase tracking-widest">
              <span>Room Charges (Subtotal)</span>
              <span className="text-white">${subtotal}</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 text-[11px] uppercase tracking-widest">
              <span>Luxury Tax (10%)</span>
              <span className="text-white">${taxAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
               <span className="text-green-500 text-[10px] uppercase tracking-[3px]">Payment Successful</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 uppercase tracking-[4px] mb-1">Total Paid</p>
              <h3 className="text-5xl md:text-6xl text-[#c5a059] font-light tracking-tighter leading-none">
                ${finalTotal.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row gap-4 items-center print:hidden">
          <button 
            onClick={() => window.print()} 
            className="w-full bg-[#c5a059] py-4 text-[11px] uppercase tracking-[4px] text-black font-bold hover:bg-white transition-all duration-500 flex items-center justify-center gap-2"
          >
            <Printer size={16}/> Print / Save PDF
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="w-full border border-white/10 py-4 text-[11px] uppercase tracking-[4px] text-white hover:border-[#c5a059] transition-all duration-500"
          >
            Close Receipt
          </button>
        </div>

        <p className="text-center text-[9px] text-gray-600 uppercase tracking-[5px] mt-12 italic">
          Thank you for choosing LuxuryStay
        </p>
      </motion.div>
    </div>
  );
};

export default Invoice;