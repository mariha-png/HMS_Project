import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dateError, setDateError] = useState(""); 
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    adults: "02",
    children: "00"
  });

  // --- 1. Fetch Room Data (With ID Cleaning) ---
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        
        // 🛡️ FIX: Extra characters like ':1' ko remove karne ke liye
        const cleanId = id.includes(':') ? id.split(':')[0] : id;
        
        const response = await axios.get(`http://localhost:5000/api/rooms/${cleanId}`);
        if (response.data) {
          setRoom(response.data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        // Fallback agar API fail ho jaye
        setRoom({ roomNumber: "Premium", roomPrice: 250, roomImage: "" });
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRoomDetails();
  }, [id]);

  // --- 2. Price & Policy Validation Logic ---
  useEffect(() => {
    const pricePerNight = room?.roomPrice || 0;
    if (bookingData.checkIn && bookingData.checkOut) {
      const start = new Date(bookingData.checkIn);
      const end = new Date(bookingData.checkOut);

      if (end <= start) {
        setDateError("Departure must be at least one night after arrival.");
        setTotalPrice(0);
      } else {
        setDateError("");
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setTotalPrice(diffDays * pricePerNight);
      }
    }
  }, [bookingData.checkIn, bookingData.checkOut, room]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  // --- 3. Booking Submission ---
  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    
    // ID cleaning for submission too
    const cleanId = id.includes(':') ? id.split(':')[0] : id;

    if (dateError || totalPrice === 0) {
        alert(dateError || "Please select valid dates.");
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login to continue.");
        navigate("/signin");
        return;
    }

    try {
      const payload = {
        roomId: cleanId, // Using cleaned ID
        checkInDate: bookingData.checkIn,  
        checkOutDate: bookingData.checkOut,     
        adults: bookingData.adults,
        children: bookingData.children,
        totalAmount: totalPrice
      };

      const response = await axios.post(
        "http://localhost:5000/api/bookings", 
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Reservation Confirmed!");
        navigate(`/invoice/${response.data._id}`);
      }
    } catch (err) {
      console.error("Booking Error:", err);
      alert(err.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <div className="bg-[#070707] min-h-screen pt-28 pb-16 font-serif text-white flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/5 bg-[#0f0f0f] shadow-2xl overflow-hidden min-h-[600px]">

          {/* LEFT: Room Image Section */}
          <div className="relative h-[350px] lg:h-auto overflow-hidden group bg-neutral-900">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-10 h-10 border-t-2 border-[#c5a059] rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="h-full w-full relative">
                <img
                  src={room?.roomImage?.startsWith('http') ? room.roomImage : `http://localhost:5000/${room?.roomImage}`}
                  className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                  alt="Suite View"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/20 opacity-90"></div>
                <div className="absolute bottom-12 left-12 text-left">
                  <span className="text-[#c5a059] text-[10px] uppercase tracking-[5px] font-bold mb-2 block">Luxury Collection</span>
                  <h3 className="text-4xl uppercase tracking-[4px] text-white mb-4 leading-none font-light">
                    {room?.roomNumber ? `Room ${room.roomNumber}` : "Luxury Suite"}
                  </h3>
                  <p className="text-white/60 font-light italic text-2xl">
                    <span className="text-[#c5a059] not-italic font-medium text-3xl">${room?.roomPrice || 0}</span> 
                    <span className="text-sm uppercase tracking-[2px]"> / Night</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Form Section */}
          <div className="p-12 lg:p-16 flex flex-col justify-between bg-[#111111]">
            <form onSubmit={handleConfirmBooking}>
              <div className="mb-14 text-left">
                <h2 className="text-4xl font-light text-white uppercase tracking-[10px] mb-2">Reservation</h2>
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-[#c5a059]"></div>
                  <h2 className="text-2xl font-light text-[#c5a059] uppercase tracking-[8px] italic">Details</h2>
                </div>
              </div>

              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
                  <div className="flex flex-col border-b border-white/10 pb-3">
                    <label className="text-[11px] uppercase tracking-[4px] text-gray-500 mb-4 text-left">Check In</label>
                    <input type="date" name="checkIn" value={bookingData.checkIn} onChange={handleInput} className="bg-transparent outline-none text-[#c5a059] cursor-pointer" style={{ colorScheme: 'dark' }} required />
                  </div>
                  <div className="flex flex-col border-b border-white/10 pb-3">
                    <label className="text-[11px] uppercase tracking-[4px] text-gray-500 mb-4 text-left">Check Out</label>
                    <input type="date" name="checkOut" value={bookingData.checkOut} onChange={handleInput} className="bg-transparent outline-none text-[#c5a059] cursor-pointer" style={{ colorScheme: 'dark' }} required />
                  </div>
                </div>

                <div className={`p-4 transition-all duration-500 border-l-2 ${dateError ? 'bg-red-900/10 border-red-500' : 'bg-[#c5a059]/5 border-[#c5a059]'}`}>
                  {dateError ? (
                    <p className="text-[10px] text-red-400 tracking-widest uppercase font-medium text-left">{dateError}</p>
                  ) : (
                    <div className="flex justify-between items-center text-[10px] tracking-[3px] uppercase font-bold">
                      <div><span className="text-gray-500 mr-2">Arrival:</span> <span className="text-[#c5a059]">02:00 PM</span></div>
                      <div className="text-right"><span className="text-gray-500 mr-2">Departure:</span> <span className="text-[#c5a059]">11:00 AM</span></div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-12">
                  <div className="flex flex-col border-b border-white/10 pb-3 text-white">
                    <label className="text-[11px] uppercase tracking-[4px] text-gray-500 mb-4 text-left">Adults</label>
                    <select name="adults" value={bookingData.adults} onChange={handleInput} className="bg-transparent outline-none text-white cursor-pointer">
                      {[1, 2, 3, 4].map(n => <option key={n} value={n} className="bg-[#111]">{`0${n} Adult${n > 1 ? 's' : ''}`}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col border-b border-white/10 pb-3 text-white">
                    <label className="text-[11px] uppercase tracking-[4px] text-gray-500 mb-4 text-left">Children</label>
                    <select name="children" value={bookingData.children} onChange={handleInput} className="bg-transparent outline-none text-white cursor-pointer">
                      <option className="bg-[#111]" value="0">No Children</option>
                      {[1, 2, 3, 4].map(n => <option key={n} value={n} className="bg-[#111]">{`0${n} Child${n > 1 ? 'ren' : ''}`}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center gap-10 pt-8 border-t border-white/5">
                <div className="text-center">
                  <p className="text-gray-500 text-[10px] uppercase tracking-[6px] mb-2">Total Stay Amount</p>
                  <h3 className="text-6xl font-light text-[#c5a059] tracking-tighter transition-transform duration-500 transform hover:scale-105">
                    ${totalPrice}
                  </h3>
                </div>
                
                <button 
                  type="submit" 
                  disabled={!!dateError || totalPrice === 0}
                  className={`relative w-full max-w-[350px] overflow-hidden group border py-4 uppercase tracking-[6px] text-[11px] transition-all duration-500 z-10 ${
                    dateError || totalPrice === 0 
                    ? 'border-white/10 text-gray-600 cursor-not-allowed' 
                    : 'border-[#c5a059] text-[#c5a059] hover:text-black'
                  }`}
                >
                  <span className="relative z-20">Confirm Your Stay</span>
                  <div className={`absolute inset-0 w-0 bg-[#c5a059] transition-all duration-500 z-0 pointer-events-none ${!(dateError || totalPrice === 0) && 'group-hover:w-full'}`}></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;