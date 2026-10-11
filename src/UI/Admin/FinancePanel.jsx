import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, CreditCard, DollarSign, ArrowUpRight, Activity } from 'lucide-react';

const FinancePanel = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyProfit: 0,
    totalBookings: 0,
    growth: 12.5
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/bookings/admin/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setStats({
          totalRevenue: response.data.totalEarnings || 0,
          monthlyProfit: response.data.monthlyProfit || 0,
          totalBookings: response.data.totalBookings || 0,
          growth: 12.5 
        });
      } catch (err) {
        console.error("Finance Data Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFinanceData();
  }, []);

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-[#0a0a0a]">
        <Activity className="animate-pulse text-[#c5a059]" size={40} />
      </div>
    );
  }

  return (
    /* UPDATED: Main background to Deep Black */
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 px-2 md:px-0 bg-[#0a0a0a] min-h-screen">
      
      {/* --- Header Section --- */}
      <div className="border-b border-white/5 pb-6 text-center md:text-left">
        <h2 className="text-lg md:text-xl font-light tracking-[4px] uppercase text-white font-serif">Financial Overview</h2>
        <p className="text-[9px] md:text-[10px] text-[#c5a059] uppercase tracking-[2px] mt-1 italic">Real-time Revenue Tracking via Atlas Cloud</p>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Total Revenue Card: Deep Black & Glass Effect */}
        <div className="bg-[#0d0d0d] border border-white/5 p-5 md:p-8 relative overflow-hidden group hover:border-[#c5a059]/30 transition-all flex flex-col justify-between min-h-[220px] shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
            <DollarSign size={50} className="text-[#c5a059]" />
          </div>
          <p className="text-[9px] md:text-[10px] uppercase tracking-[2px] text-white/30 mb-4 font-bold italic">Total Revenue</p>
          <h3 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-light text-white font-serif tracking-tighter break-words leading-none">
            ${Number(stats.totalRevenue).toLocaleString()}
          </h3>
          <div className="mt-4 flex items-center gap-2 text-green-500/80 text-[9px] md:text-[10px] uppercase tracking-widest font-bold">
            <TrendingUp size={12} /> +{stats.growth}% Growth
          </div>
        </div>

        {/* Estimated Profit Card: Updated for more contrast */}
        <div className="bg-[#c5a059]/5 border border-[#c5a059]/30 p-5 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between min-h-[220px] overflow-hidden">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[2px] text-[#c5a059] mb-4 font-bold italic underline underline-offset-8 decoration-[#c5a059]/20">Estimated Profit</p>
          <h3 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-light text-[#c5a059] font-serif tracking-tighter leading-tight break-all">
            ${Number(stats.monthlyProfit).toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </h3>
          <p className="mt-4 text-white/20 text-[8px] md:text-[9px] uppercase tracking-widest italic font-light">After Operational Costs (70%)</p>
        </div>

        {/* Bookings Count Card */}
        <div className="bg-[#0d0d0d] border border-white/5 p-5 md:p-8 sm:col-span-2 lg:col-span-1 flex flex-col justify-between min-h-[220px] shadow-2xl">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[2px] text-white/30 mb-4 font-bold italic">Bookings Count</p>
          <h3 className="text-4xl md:text-5xl font-light text-white/60 font-serif">{stats.totalBookings}</h3>
          <button className="mt-6 flex items-center gap-2 text-[#c5a059]/60 text-[9px] uppercase tracking-[2px] hover:text-[#c5a059] transition-all group w-fit">
            View Analytics <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* --- Bottom Security Footer --- */}
      <div className="mt-8 p-4 md:p-6 bg-[#0d0d0d] border border-white/5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left rounded-sm">
        <div className="p-3 bg-white/5 text-[#c5a059]">
            <CreditCard size={18} />
        </div>
        <p className="text-[8px] md:text-[10px] text-white/40 uppercase tracking-[1.5px] leading-relaxed">
            Financial data is fetched directly from the secure booking ledger. <br className="hidden md:block"/> 
            <span className="text-[#c5a059]/50 italic font-normal">Last updated: Just now via Secure MERN Middleware.</span>
        </p>
      </div>
    </div>
  );
};

export default FinancePanel;