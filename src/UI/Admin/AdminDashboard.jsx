import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BedDouble, Users, CalendarDays, 
  CreditCard, Settings, LogOut, FileText, RefreshCw, X, Menu,
  Brush, MessageSquare 
} from 'lucide-react';

import { useAuth } from '../../store/auth';
import axios from 'axios';

// --- Components Import ---
import Footer from '../../components/layout/Footer'; 

// --- Panels Import ---
import OverviewPanel from './OverviewPanel';
import InventoryPanel from './InventoryPanel';
import BookingsPanel from './BookingsPanel'; 
import GuestPanel from './GuestPanel';
import FinancePanel from './FinancePanel';
import SystemPanel from './SystemPanel';
import HousekeepingPanel from './HousekeepingPanel';
import FeedbackPanel from './FeedbackPanel';

const AdminDashboard = () => {
  const { logout, user } = useAuth(); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const menuItems = [
    { id: 'Overview', label: 'Overview', icon: <LayoutDashboard size={18}/> },
    { id: 'Inventory', label: 'Inventory', icon: <BedDouble size={18}/> },
    { id: 'Bookings', label: 'Bookings', icon: <CalendarDays size={18}/> },
    { id: 'Guests', label: 'Guests', icon: <Users size={18}/> },
    { id: 'Feedback', label: 'Reviews', icon: <MessageSquare size={18}/> },
    { id: 'Housekeeping', label: 'Housekeeping', icon: <Brush size={18}/> }, 
    { id: 'Finances', label: 'Finances', icon: <CreditCard size={18}/> },
    { id: 'System', label: 'System', icon: <Settings size={18}/> },
  ];

  const handleSignOut = () => {
    logout();
    navigate("/login"); 
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.get("http://localhost:5000/api/rooms/all-rooms");
      const data = response.data;
      const csvRows = [
        ["Room Number", "Type", "Price", "Status"],
        ...data.map(r => [r.roomNumber, r.roomType, r.roomPrice, r.roomStatus])
      ];
      const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `LuxuryStay_Report.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Report generation failed.");
    } finally {
      setTimeout(() => setIsGenerating(false), 1000);
    }
  };

  const renderPanel = () => {
    const panels = {
      Overview: <OverviewPanel />,
      Inventory: <InventoryPanel />,
      Bookings: <BookingsPanel />,
      Guests: <GuestPanel />,
      Finances: <FinancePanel />,
      System: <SystemPanel />,
      Feedback: <FeedbackPanel />,
      Housekeeping: <HousekeepingPanel />, 
    };

    return panels[activeTab] || (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Settings size={30} className="animate-spin-slow text-[#c5a059]/20" />
        <p className="text-white/10 uppercase tracking-[10px] text-sm mt-6">Syncing...</p>
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-white flex overflow-hidden font-sans">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[65] lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:relative z-[70] w-[280px] bg-[#0d0d0d] border-r border-white/5 flex flex-col pt-10 lg:pt-32 shrink-0 h-full transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="px-10 mb-12 flex justify-between items-center">
          <p className="text-[9px] text-[#c5a059] uppercase tracking-[4px] font-bold border-b border-[#c5a059]/20 pb-2">
            Management Portal
          </p>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white transition-colors">
            <X size={24}/>
          </button>
        </div>
        
        <nav className="flex-1 space-y-2 px-4 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 transition-all group rounded-sm
                ${activeTab === item.id 
                  ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/10' 
                  : 'text-white/40 hover:text-[#c5a059] hover:bg-white/[0.02]'
                }`}
            >
              <span className={activeTab === item.id ? 'text-black' : 'text-[#c5a059]/60'}>{item.icon}</span>
              <span className="text-[10px] uppercase tracking-[3px] font-bold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 bg-[#0d0d0d]">
          <button onClick={handleSignOut} className="flex items-center gap-3 text-white/30 hover:text-red-400 text-[10px] uppercase tracking-widest font-bold transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto relative bg-[#0a0a0a] flex flex-col">
        
        {/* MOBILE HEADER */}
        <div className="lg:hidden flex items-center justify-between p-6 bg-[#0d0d0d] border-b border-white/5 sticky top-0 z-50">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-2 -ml-2 text-[#c5a059] bg-white/5 rounded-md active:scale-95 transition-all"
            >
              <Menu size={26}/>
            </button>
            <h1 className="text-[#c5a059] text-[10px] font-bold tracking-[4px] uppercase italic">LuxuryStay</h1>
            <div className="w-8"></div>
        </div>

        {/* WRAPPER FOR CONTENT + FOOTER */}
        <div className="min-h-full flex flex-col">
          
          <div className="p-6 md:p-12 lg:pt-32">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-12 lg:mb-16 gap-8 shrink-0">
              <div>
                <h2 className="text-4xl md:text-6xl font-light text-[#c5a059] tracking-tight italic mb-3 font-serif">
                  {activeTab}
                </h2>
                <p className="text-white/30 text-[10px] uppercase tracking-[4px]">
                  Welcome back, {user?.username || "Admin"}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                 <button 
                   onClick={handleGenerateReport}
                   disabled={isGenerating}
                   className="flex-1 md:flex-none px-10 py-4 bg-[#c5a059] text-black font-bold text-[10px] uppercase tracking-[3px] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3"
                 >
                    {isGenerating ? <RefreshCw size={14} className="animate-spin" /> : <FileText size={14} />}
                    {isGenerating ? 'Processing...' : 'Generate Report'}
                 </button>
              </div>
            </div>

            {/* DYNAMIC PANEL AREA */}
            <div className="flex-1">
              {renderPanel()}
            </div>
          </div>

          {/* FOOTER - Niche add kar diya gaya hai */}
          <Footer /> 
        </div>
      </main>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;