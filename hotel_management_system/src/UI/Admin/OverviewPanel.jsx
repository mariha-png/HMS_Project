import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ArrowUpRight, CalendarDays, CreditCard, BedDouble, 
  Users, BarChart3, RefreshCw, Activity, Terminal, 
  ShieldCheck, Zap, Cpu, Database 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- HELPER COMPONENTS ---

const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-[#0d0d0d]/60 backdrop-blur-md p-8 border border-white/5 group hover:border-[#c5a059]/40 hover:shadow-[0_0_30px_rgba(197,160,89,0.05)] hover:-translate-y-1 transition-all duration-500 cursor-default relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
       {React.cloneElement(icon, { size: 60 })}
    </div>
    <div className="flex justify-between items-start mb-6">
      <span className="text-[#c5a059]/50 group-hover:text-[#c5a059] transition-colors">
        {icon}
      </span>
      <span className="text-[10px] text-[#c5a059] font-bold tracking-tighter flex items-center gap-1">
        {change} <ArrowUpRight size={12}/>
      </span>
    </div>
    <h3 className="text-white/30 text-[9px] uppercase tracking-[3px] mb-2">{title}</h3>
    <p className="text-4xl font-light tracking-tight group-hover:translate-x-1 transition-transform duration-500 text-white">{value}</p>
  </div>
);

const StatusItem = ({ label, value, active, icon: Icon }) => (
  <div className="flex justify-between items-center text-[11px] uppercase tracking-widest border-b border-white/5 pb-3 group">
    <div className="flex items-center gap-3">
      {Icon && <Icon size={12} className="text-white/20 group-hover:text-[#c5a059] transition-colors" />}
      <span className="text-white/40 group-hover:text-white/60 transition-colors">{label}</span>
    </div>
    <span className={active ? "text-[#c5a059] drop-shadow-[0_0_5px_rgba(197,160,89,0.5)]" : "text-yellow-600/50"}>{value}</span>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0a] border border-[#c5a059]/30 p-4 backdrop-blur-xl shadow-2xl">
        <p className="text-[#c5a059] text-[10px] uppercase tracking-[4px] mb-2 font-medium">{label}</p>
        <p className="text-white text-2xl font-light tracking-tight">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// --- MAIN COMPONENT ---
const OverviewPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [roomStats, setRoomStats] = useState({ total: 0, available: 0, occupancyRate: "0%" });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [bookingsRes, statsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/all-bookings", config),
        axios.get("http://localhost:5000/api/rooms/stats", config)
      ]);

      const fetchedBookings = bookingsRes.data;
      setBookings(fetchedBookings);
      setRoomStats(statsRes.data);

      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const revenueMap = {};
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        revenueMap[days[d.getDay()]] = 0;
      }

      fetchedBookings.forEach(booking => {
        const date = new Date(booking.createdAt);
        const dayName = days[date.getDay()];
        if (revenueMap.hasOwnProperty(dayName)) {
          revenueMap[dayName] += (Number(booking.totalAmount) || 0);
        }
      });

      setChartData(Object.keys(revenueMap).map(day => ({ name: day, revenue: revenueMap[day] })));
    } catch (error) {
      console.error("Dashboard Sync Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const totalRevenue = bookings.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
      
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <StatCard title="Total Bookings" value={bookings.length} change="Live" icon={<CalendarDays size={18}/>} />
        <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} change="Net" icon={<CreditCard size={18}/>} />
        <StatCard title="Occupancy Rate" value={roomStats.occupancyRate || "0%"} change="Optimal" icon={<BedDouble size={18}/>} />
        <StatCard title="Rooms Available" value={roomStats.available || "0"} change="Current" icon={<Users size={18}/>} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 2. LEFT SIDE: ANALYTICS & FEED */}
        <div className="xl:col-span-2 space-y-8">
          
          <div className="bg-[#0d0d0d] border border-white/5 p-10 rounded-sm">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h3 className="text-[#c5a059] text-[12px] uppercase tracking-[4px] font-light flex items-center gap-3">
                    <BarChart3 size={16} /> Revenue Analytics
                  </h3>
                  <p className="text-[10px] text-green-500/70 mt-1 uppercase tracking-widest font-bold">
                    +12.4% Increase <span className="text-white/10 font-normal">vs last month</span>
                  </p>
               </div>
               <div className="text-right">
                  <span className="text-[9px] text-white/20 block uppercase tracking-[2px]">7 Day Transaction Trend</span>
                  <span className="text-[10px] text-[#c5a059]/60 font-mono italic">
                    {currentTime.toLocaleTimeString()}
                  </span>
               </div>
            </div>
            
            <div className="h-[300px] w-full min-w-0">
              <ResponsiveContainer width="99%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c5a059" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#c5a059" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" stroke="#c5a05940" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#c5a059', opacity: 0.5}} />
                  <YAxis stroke="#c5a05940" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} tick={{fill: '#c5a059', opacity: 0.5}} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
                  <Bar 
                    dataKey="revenue" 
                    fill="url(#barGradient)" 
                    radius={[4, 4, 0, 0]} 
                    barSize={45}
                    animationBegin={200}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-white/5 p-10 rounded-sm">
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-[#c5a059] text-[12px] uppercase tracking-[4px] font-light flex items-center gap-3">
                  <Activity size={16} /> Live Booking Feed
                </h3>
                <button onClick={fetchData} className="text-white/20 hover:text-[#c5a059] transition-all">
                  <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
            </div>
            <div className="space-y-6 max-h-[450px] overflow-y-auto pr-4 no-scrollbar">
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <div key={booking._id || index} className="flex justify-between items-center border-b border-white/5 pb-5 group transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-[#c5a059]/50 bg-[#111]/50 group-hover:border-[#c5a059]/40 group-hover:bg-[#c5a059]/5 transition-all">
                         <Users size={16} />
                      </div>
                      <div>
                        <p className="text-white font-medium tracking-wide">{booking.guestId?.username || booking.guestName || "Guest User"}</p>
                        <p className="text-[10px] text-white/20 uppercase tracking-[2px]">{booking.roomId?.roomType || "Luxury Room"} — #{booking.roomId?.roomNumber || "N/A"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#c5a059]">{booking.bookingStatus || "Confirmed"}</p>
                      <p className="text-[9px] text-white/10 italic mt-1">{new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : <div className="py-20 text-center opacity-20 text-[10px] uppercase tracking-widest italic">Syncing Data...</div>}
            </div>
          </div>
        </div>

        {/* 3. RIGHT SIDE: SYSTEM & OPERATIONS */}
        <div className="space-y-8">
          <div className="bg-[#0d0d0d] border border-white/5 p-10 rounded-sm">
            <div className="space-y-12">
              
              {/* Integrity Status */}
              <div>
                <h3 className="text-[#c5a059] text-[12px] uppercase tracking-[4px] mb-8 font-light flex items-center gap-3">
                  <ShieldCheck size={16}/> System Integrity
                </h3>
                <div className="space-y-6">
                  <StatusItem label="Atlas DB" value="Connected" active={true} icon={Database} />
                  <StatusItem label="API Node" value="Healthy" active={true} icon={Zap} />
                  <StatusItem label="API Cluster" value="v6.0" active={true} icon={Cpu} />
                </div>
              </div>

              {/* Operational Log (Added to fill the empty space) */}
              <div>
                <h3 className="text-[#c5a059] text-[10px] uppercase tracking-[4px] mb-6 font-light flex items-center gap-3">
                  <Activity size={14}/> Operational Log
                </h3>
                <div className="space-y-6">
                  <div className="border-l border-[#c5a059]/30 pl-4 py-1">
                    <p className="text-white/60 text-[10px] leading-relaxed">Daily revenue report generated.</p>
                    <span className="text-[8px] text-white/20 uppercase tracking-widest">Active</span>
                  </div>
                  <div className="border-l border-white/10 pl-4 py-1">
                    <p className="text-white/60 text-[10px] leading-relaxed">Cloud Database backup verified.</p>
                    <span className="text-[8px] text-white/20 uppercase tracking-widest">2h ago</span>
                  </div>
                </div>
              </div>

              {/* Direct Commands */}
              <div>
                <h3 className="text-[#c5a059] text-[10px] uppercase tracking-[4px] mb-6 font-light flex items-center gap-3">
                  <Terminal size={14}/> Commands
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <button className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-4 text-[9px] uppercase tracking-[2px] text-white/40 hover:text-[#c5a059] transition-all group">
                    <span>Generate Reports</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all"/>
                  </button>
                  <button className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-4 text-[9px] uppercase tracking-[2px] text-white/40 hover:text-red-500/80 transition-all group">
                    <span>Maintenance Mode</span>
                    <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-red-500 group-hover:animate-pulse transition-all"></div>
                  </button>
                </div>
              </div>

              {/* Server Performance */}
              <div className="pt-8 border-t border-white/5">
                <div className="flex justify-between text-[9px] uppercase tracking-[3px] text-white/20 mb-4 font-bold">
                  <span>Latency</span>
                  <span className="text-[#c5a059]">14ms</span>
                </div>
                <div className="w-full bg-white/5 h-[2px]">
                  <div className="bg-[#c5a059] h-full w-[75%] shadow-[0_0_15px_#c5a059]"></div>
                </div>
                <p className="mt-8 text-[9px] text-center text-white/10 uppercase tracking-[4px] font-bold">
                  LuxuryStay Protocol © 2026
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OverviewPanel;