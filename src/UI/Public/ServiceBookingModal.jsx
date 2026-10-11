import React, { useState } from 'react';

const ServiceBookingModal = ({ setIsOpen }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      // ⚠️ Check karein ke PORT 5000 hi hai ya nahi
      const response = await fetch('http://localhost:5000/api/inquiries/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();

      if (response.ok) {
        alert("Success! Data saved in Atlas.");
        setIsOpen(false);
      } else {
        alert(res_data.extraDetails || "Submission failed");
      }
    } catch (err) {
      console.error("Connection Failed:", err);
      alert("Backend se connection nahi ho pa raha!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f0f0f] p-10 border border-white/20 max-w-lg w-full relative">
      <h2 className="text-[#c5a059] text-center tracking-[4px] uppercase mb-12 italic text-lg">
        Service Booking
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <input name="name" type="text" placeholder="NAME" className="w-full bg-transparent border-b border-white/20 py-2 text-xs outline-none focus:border-[#c5a059] text-white" required />
        <input name="email" type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-white/20 py-2 text-xs outline-none focus:border-[#c5a059] text-white" required />
        <textarea name="message" placeholder="HOW CAN WE ASSIST YOU?" rows="3" className="w-full bg-transparent border-b border-white/20 py-2 text-xs outline-none focus:border-[#c5a059] text-white resize-none" required></textarea>
        
        {/* Button size set to px-10 (Chota size) and centered */}
        <div className="flex justify-center">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#c5a059] text-black px-10 py-3 text-[10px] font-bold tracking-[3px] uppercase hover:bg-white transition-all duration-500"
          >
            {loading ? "Sending..." : "Request Information"}
          </button>
        </div>
      </form>
    </div>
  );
};