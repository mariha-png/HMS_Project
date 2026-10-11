import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/bookings/${id}`);
        setBooking(res.data);
      } catch (err) {
        console.error("Booking fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [id]);

  if (loading) return <div className="bg-black min-h-screen flex items-center justify-center text-[#c5a059]">Loading Your Sanctuary...</div>;
  if (!booking) return <div className="bg-black min-h-screen flex items-center justify-center text-white">Booking not found.</div>;

  return (
    <div className="bg-[#070707] min-h-screen pt-32 pb-20 font-serif text-white">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-[#c5a059] uppercase tracking-[8px] text-[10px] font-bold">Reservation Confirmed</h2>
          <h1 className="text-4xl font-light tracking-widest uppercase mt-2">Your Stay Details</h1>
          <p className="text-gray-500 mt-4 italic text-sm">Booking ID: {id}</p>
        </div>

        <div className="bg-[#0c0c0c] border border-white/5 p-10 relative shadow-2xl">
          <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#c5a059]/40"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Side: Stay Info with Timings */}
            <div className="space-y-8">
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <label className="text-[9px] uppercase tracking-[4px] text-[#c5a059] font-bold">Check In</label>
                  <p className="text-xl font-light mt-1">{new Date(booking.checkIn).toDateString()}</p>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">From 02:00 PM</p>
                </div>
                <div className="text-right">
                  <label className="text-[9px] uppercase tracking-[4px] text-[#c5a059] font-bold">Check Out</label>
                  <p className="text-xl font-light mt-1">{new Date(booking.checkOut).toDateString()}</p>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">By 11:00 AM</p>
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[4px] text-[#c5a059] font-bold">Guests</label>
                <p className="text-sm font-light tracking-widest mt-1">{booking.adults} & {booking.children}</p>
              </div>

              <div className="bg-[#c5a059]/5 p-4 border-l-2 border-[#c5a059]">
                 <p className="text-[10px] text-[#c5a059] uppercase tracking-widest font-bold">Policy Note</p>
                 <p className="text-[11px] text-gray-400 font-sans mt-1">Please vacate the room by 11:00 AM on your departure date to avoid late fees.</p>
              </div>
            </div>

            {/* Right Side: Financial Summary */}
            <div className="bg-white/5 p-8 border border-white/5 text-center flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[5px] text-white/30 mb-3">Total Investment</p>
              <h2 className="text-5xl text-[#c5a059] font-light tracking-tighter">${booking.totalAmount}</h2>
              
              <div className="mt-8 space-y-4">
                <button onClick={() => navigate(`/invoice/${id}`)} className="w-full py-3 border border-[#c5a059] text-[#c5a059] text-[10px] uppercase tracking-[3px] hover:bg-[#c5a059] hover:text-black transition-all">
                  View Full Invoice
                </button>
                <button onClick={() => window.print()} className="w-full py-3 bg-white/5 text-white text-[10px] uppercase tracking-[3px] hover:bg-white/10 transition-all">
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;