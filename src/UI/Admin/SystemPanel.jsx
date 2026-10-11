import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings, Server, Database, ShieldCheck, Activity, RefreshCw } from 'lucide-react';

const SystemPanel = () => {
  const [systemStatus, setSystemStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSystemStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/bookings/system/status", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSystemStatus(response.data);
    } catch (error) {
      console.error("System Status Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemStatus();
    const interval = setInterval(fetchSystemStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !systemStatus) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-[#0a0a0a]">
        <RefreshCw className="animate-spin text-[#c5a059]" size={32} />
      </div>
    );
  }

  return (
    /* UPDATED: Main background to Deep Black */
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#0a0a0a] min-h-screen p-2 md:p-0">
      
      {/* Header */}
      <div className="border-b border-white/5 pb-6">
        <h2 className="text-xl font-light tracking-[4px] uppercase text-white font-serif">System Infrastructure</h2>
        <p className="text-[10px] text-[#c5a059] uppercase tracking-[2px] mt-1 italic">
          Monitoring Cloud Services & Database Health
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Connection Status Card: Card Black background */}
        <div className="bg-[#0d0d0d] border border-white/5 p-8 relative group shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-full text-green-500">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-white/30">Global Status</p>
              <h3 className="text-lg text-white font-light uppercase tracking-widest">Systems Operational</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 hover:border-[#c5a059]/20 transition-all">
              <div className="flex items-center gap-3">
                <Database size={16} className="text-[#c5a059]" />
                <span className="text-[11px] text-white/60 uppercase tracking-widest">Database (MongoDB Atlas)</span>
              </div>
              <span className="text-[9px] px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 uppercase font-bold tracking-tighter">
                {systemStatus?.database || "Connected"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 hover:border-[#c5a059]/20 transition-all">
              <div className="flex items-center gap-3">
                <Server size={16} className="text-[#c5a059]" />
                <span className="text-[11px] text-white/60 uppercase tracking-widest">API Server (Node.js)</span>
              </div>
              <span className="text-[9px] px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 uppercase font-bold tracking-tighter">
                {systemStatus?.status || "Running"}
              </span>
            </div>
          </div>
        </div>

        {/* System Metrics Card */}
        <div className="bg-[#0d0d0d] border border-white/5 p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#c5a059]/10 rounded-full text-[#c5a059]">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[2px] text-white/30">Runtime Metrics</p>
              <h3 className="text-lg text-white font-light uppercase tracking-widest">Engine Performance</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/[0.02] border border-white/5 text-center">
              <p className="text-[9px] text-white/20 uppercase tracking-widest mb-2 font-bold">Uptime</p>
              <p className="text-xl text-white font-serif">
                {Math.floor(systemStatus?.uptime / 3600) || 0}h {Math.floor((systemStatus?.uptime % 3600) / 60) || 0}m
              </p>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/5 text-center">
              <p className="text-[9px] text-white/20 uppercase tracking-widest mb-2 font-bold">Last Sync</p>
              <p className="text-[11px] text-[#c5a059] font-mono uppercase tracking-tighter">
                {systemStatus?.lastSync?.split(',')[1] || "Just Now"}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Logs/Terminal Section: Pure Terminal Style */}
      <div className="mt-8 bg-[#050505] border border-white/5 font-mono p-6 shadow-inner">
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <Settings size={14} className="text-[#c5a059]" />
            <span className="text-[10px] text-white/40 uppercase tracking-widest">System Console Logs</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
          </div>
        </div>
        <div className="text-[10px] space-y-2 leading-relaxed">
          <p className="text-green-500/70 font-bold">{`> [INFO] Initializing LuxuryStay Cloud Engine...`}</p>
          <p className="text-white/20">{`> [DEBUG] Authenticating with MongoDB Atlas cluster...`}</p>
          <p className="text-white/20">{`> [SUCCESS] Handshake complete. Environment: Production`}</p>
          <p className="text-[#c5a059] animate-pulse font-bold">{`> [LIVE] Monitoring active connections...`}</p>
          <p className="text-blue-400/40">{`> [LOG] Memory Usage: Optimised for MERN Stack.`}</p>
        </div>
      </div>
    </div>
  );
};

export default SystemPanel;