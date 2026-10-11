import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, Plus, X, Activity } from 'lucide-react';
import { toast } from 'react-toastify';

const InventoryPanel = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Saare presets shamil hain
  const roomPresets = {
    "Deluxe": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
    "Suite": "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    "Villa": "https://images.unsplash.com/photo-1582719508461-905c673771fd",
    "Executive": "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    "Classic": "https://images.unsplash.com/photo-1595576508898-0ad5c879a061",
    "Loft": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"
  };

  const initialForm = { 
    rNum: '', 
    rType: 'Deluxe', 
    rPrice: '', 
    rDesc: 'Premium stay experience.', 
    rAmenities: 'WiFi, AC, TV', 
    rImage: roomPresets["Deluxe"] 
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchInventory = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/rooms/all-rooms");
      setRooms(data);
    } catch (e) { 
      toast.error("Atlas Sync Failed"); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchInventory(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safety check: Agar image URL missing ho toh preset se lazmi le
    const finalImage = formData.rImage || roomPresets[formData.rType];

    const formPayload = new FormData();
    formPayload.append("rNum", formData.rNum);
    formPayload.append("rType", formData.rType);
    formPayload.append("rPrice", formData.rPrice);
    formPayload.append("rDesc", formData.rDesc || "Luxury Guest Room");
    formPayload.append("rAmenities", formData.rAmenities || "WiFi, Service");
    formPayload.append("rImage", finalImage);

    try {
      const url = editingId 
        ? `http://localhost:5000/api/rooms/update-room/${editingId}` 
        : "http://localhost:5000/api/rooms/add-room";
      
      const method = editingId ? 'put' : 'post';
      
      await axios[method](url, formPayload, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success(editingId ? "Asset Updated" : "Room Registered Successfully");
      setIsModalOpen(false);
      setEditingId(null);
      setFormData(initialForm);
      fetchInventory();
    } catch (err) {
      console.error("Submission Error:", err.response?.data);
      toast.error(err.response?.data?.msg || "Validation Failed - Check Console");
    }
  };

  const handleEdit = (room) => {
    setEditingId(room._id);
    setFormData({
      rNum: room.roomNumber,
      rType: room.roomType,
      rPrice: room.roomPrice,
      rDesc: room.description || '',
      rAmenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities,
      rImage: room.roomImage
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-[#0a0a0a] min-h-screen text-white font-sans">
      <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-light tracking-[5px] text-[#c5a059] uppercase">Inventory</h2>
          <p className="text-[10px] text-white/30 uppercase tracking-[3px] mt-1">Global Asset Control</p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setFormData(initialForm); setIsModalOpen(true); }} 
          className="bg-[#c5a059] px-8 py-3 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl"
        >
          Register Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full flex flex-col items-center py-20">
            <Activity className="animate-spin text-[#c5a059] mb-4" size={32} />
            <p className="text-[10px] uppercase tracking-[4px] text-white/20">Syncing with Atlas...</p>
          </div>
        ) : (
          rooms.map(room => (
            <div key={room._id} className="bg-[#111] border border-white/5 p-6 group hover:border-[#c5a059]/30 transition-all duration-500">
              <div className="h-44 w-full overflow-hidden mb-6 bg-black">
                <img 
                  src={room.roomImage?.startsWith('http') ? room.roomImage : `http://localhost:5000/${room.roomImage}`} 
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt="Asset"
                />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[#c5a059] tracking-widest uppercase text-sm">{room.roomType}</h3>
                <span className="text-[8px] bg-white/5 px-2 py-1 uppercase tracking-widest text-white/40">{room.roomStatus}</span>
              </div>
              <p className="text-[10px] text-white/20 uppercase mb-5 font-mono">Ref: {room.roomNumber}</p>
              
              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="text-xl font-light tracking-tighter">${room.roomPrice}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(room)} className="p-2 bg-white/5 hover:text-[#c5a059] transition-all"><Edit3 size={14}/></button>
                  <button 
                    onClick={async () => { if(window.confirm("Remove this asset?")) { await axios.delete(`http://localhost:5000/api/rooms/delete-room/${room._id}`); fetchInventory(); toast.warn("Asset Deleted"); }}} 
                    className="p-2 bg-white/5 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={14}/>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[200] backdrop-blur-sm">
           <div className="bg-[#0d0d0d] p-10 border border-white/10 w-full max-w-md relative shadow-2xl animate-in zoom-in duration-300">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/20 hover:text-white"><X size={22}/></button>
              
              <h3 className="text-[10px] font-bold tracking-[5px] uppercase mb-8 text-[#c5a059] border-b border-white/5 pb-4">
                {editingId ? "Update Global Asset" : "Register New Asset"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest text-white/40">Room No.</label>
                      <input type="text" className="w-full bg-white/[0.03] border border-white/10 p-4 text-xs outline-none focus:border-[#c5a059] text-white" value={formData.rNum} onChange={e => setFormData({...formData, rNum: e.target.value})} required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest text-white/40">Daily Rate ($)</label>
                      <input type="number" className="w-full bg-white/[0.03] border border-white/10 p-4 text-xs outline-none focus:border-[#c5a059] text-white" value={formData.rPrice} onChange={e => setFormData({...formData, rPrice: e.target.value})} required />
                    </div>
                 </div>
                 
                 <div className="space-y-1">
                    <label className="text-[8px] uppercase tracking-widest text-white/40">Category Selection</label>
                    <select 
                      className="w-full bg-white/[0.03] border border-white/10 p-4 text-xs outline-none focus:border-[#c5a059] text-white cursor-pointer" 
                      value={formData.rType} 
                      onChange={(e) => {
                        const selected = e.target.value;
                        setFormData({...formData, rType: selected, rImage: roomPresets[selected]});
                      }}
                    >
                      {Object.keys(roomPresets).map(type => (
                        <option key={type} value={type} className="bg-[#0d0d0d]">{type}</option>
                      ))}
                    </select>
                 </div>

                 <button type="submit" className="w-full bg-[#c5a059] py-4 text-black font-bold uppercase text-[9px] tracking-[3px] mt-6 hover:bg-white transition-all shadow-lg">
                   {editingId ? "Update Asset" : "Commit to Database"}
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPanel;