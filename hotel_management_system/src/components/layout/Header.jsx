// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../store/auth';
// import { Bell, MessageSquare } from 'lucide-react'; // Icons import kiye
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, isLoggedIn, logout } = useAuth();

//   const isAdmin = localStorage.getItem("isAdmin") === "true";

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 30);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//     window.location.reload(); 
//   };

//   // Test Notification function
//   const notify = () => {
//     toast.info("Welcome to your Luxury Dashboard", {
//       position: "top-right",
//       theme: "dark",
//     });
//   };

//   const navItemBase = "text-[10px] font-bold uppercase tracking-[2px] transition-all duration-300";

//   return (
//     <header 
//       className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 px-10 md:px-16 py-6 flex justify-between items-center ${
//         isScrolled || location.pathname !== "/" 
//           ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-4 shadow-2xl border-b border-white/5' 
//           : 'bg-transparent'
//       }`}
//     >
//       {/* Toast Container for global notifications */}
//       <ToastContainer 
//         toastStyle={{ 
//           backgroundColor: "#0d0d0d", 
//           border: "1px solid rgba(197, 160, 89, 0.2)",
//           color: "#fff",
//           fontSize: "10px",
//           letterSpacing: "1px",
//           textTransform: "uppercase"
//         }}
//         progressStyle={{ background: "#c5a059" }}
//       />

//       {/* --- LOGO SECTION --- */}
//       <Link to="/" className="group">
//         <h1 className="text-[#c5a059] text-2xl font-semibold tracking-[4px] uppercase transition-all duration-500 group-hover:tracking-[5px]" 
//             style={{ fontFamily: "'Playfair Display', serif" }}>
//           LUXURYSTAY
//         </h1>
//         <div className="flex items-center gap-2 -mt-1 opacity-40">
//           <div className="h-[1px] w-4 bg-[#c5a059]"></div>
//           <p className="text-[7px] text-white tracking-[2px] uppercase font-sans">Hospitality Group</p>
//         </div>
//       </Link>

//       {/* --- CENTRAL NAVIGATION --- */}
//       <nav className="hidden lg:flex gap-10">
//         {['Home', 'Rooms', 'Services', 'About', 'Contact'].map((item) => {
//           const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
//           const isActive = location.pathname === path;
//           return (
//             <Link 
//               key={item}
//               to={path} 
//               className={`${navItemBase} relative group ${isActive ? 'text-[#c5a059]' : 'text-white/80 hover:text-[#c5a059]'}`}
//             >
//               {item}
//               <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-[#c5a059] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
//             </Link>
//           );
//         })}

//         {/* FEEDBACK LINK (Added) */}
//         {isLoggedIn && (
//           <Link 
//             to="/feedback/general" 
//             className={`${navItemBase} flex items-center gap-2 relative group ${location.pathname.includes('/feedback') ? 'text-[#c5a059]' : 'text-white/80 hover:text-[#c5a059]'}`}
//           >
//             <MessageSquare size={12} />
//             Feedback
//             <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-[#c5a059] transition-all duration-300 ${location.pathname.includes('/feedback') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
//           </Link>
//         )}
//       </nav>

//       {/* --- ACTION SECTION --- */}
//       <div className="flex items-center gap-8">
        
//         {/* Notification Bell (Added) */}
//         {isLoggedIn && (
//           <div className="relative cursor-pointer group px-2" onClick={notify}>
//             <Bell size={18} className="text-white/40 group-hover:text-[#c5a059] transition-colors" />
//             <span className="absolute top-0 right-1 w-2 h-2 bg-[#c5a059] rounded-full animate-pulse border border-black"></span>
//           </div>
//         )}

//         {/* Sign In / User Info */}
//         {!isLoggedIn ? (
//           <Link 
//             to="/signin" 
//             className={`${navItemBase} text-white/90 hover:text-[#c5a059] hidden sm:block`}
//           >
//             Sign In
//           </Link>
//         ) : (
//           <div className="flex items-center gap-6">
//             <div className="hidden xl:flex flex-col items-end border-r border-white/10 pr-6">
//               <span className="text-[7px] text-white/30 uppercase tracking-[2px]">
//                 {isAdmin ? "Administrator" : "Welcome back"}
//               </span>
//               <span className="text-[#c5a059] text-[10px] font-medium italic">
//                 {user?.username || "Mariha"}
//               </span>
//             </div>

//             {isAdmin && (
//               <Link 
//                 to="/admin-dashboard" 
//                 className="text-[#c5a059] text-[9px] font-bold uppercase tracking-[2px] border border-[#c5a059]/30 px-3 py-1 hover:bg-[#c5a059] hover:text-black transition-all"
//               >
//                 Admin Panel
//               </Link>
//             )}

//             <button 
//               onClick={handleLogout}
//               className="text-white/50 text-[9px] font-bold uppercase tracking-[1px] hover:text-red-400 transition-colors"
//             >
//               Logout
//             </button>
//           </div>
//         )}

//         {/* Book Now Button */}
//         <Link 
//           to="/rooms" 
//           className="relative overflow-hidden group bg-[#c5a059] text-black px-10 py-3 text-[10px] font-bold uppercase tracking-[2px] transition-all duration-500 hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]"
//         >
//           <span className="relative z-10">Book Now</span>
//           <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
//         </Link>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { Bell, MessageSquare, Menu, X } from 'lucide-react'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // 1. Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; // Normal scrolling restored
    }
  }, [isMobileMenuOpen]);

  // 3. Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload(); 
  };

  const notify = () => {
    toast.info("Welcome to your Luxury Dashboard", {
      position: "top-right",
      theme: "dark",
    });
  };

  const navItemBase = "text-[10px] font-bold uppercase tracking-[2px] transition-all duration-300";

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 px-4 md:px-8 py-4 lg:py-6 flex justify-between items-center ${
        isScrolled || location.pathname !== "/" 
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-3 lg:py-4 shadow-2xl border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <ToastContainer 
        toastStyle={{ 
          backgroundColor: "#0d0d0d", 
          border: "1px solid rgba(197, 160, 89, 0.2)",
          color: "#fff",
          fontSize: "10px",
        }}
        progressStyle={{ background: "#c5a059" }}
      />

      {/* --- LEFT: LOGO --- */}
      <Link to="/" className="group z-[1001] flex-shrink-0">
        <h1 className="text-[#c5a059] text-lg md:text-2xl font-semibold tracking-[3px] md:tracking-[4px] uppercase transition-all duration-500 group-hover:tracking-[5px]" 
            style={{ fontFamily: "'Playfair Display', serif" }}>
          LUXURYSTAY
        </h1>
        <div className="flex items-center gap-2 -mt-1 opacity-40">
          <div className="h-[1px] w-3 md:w-4 bg-[#c5a059]"></div>
          <p className="text-[6px] md:text-[7px] text-white tracking-[2px] uppercase font-sans">Hospitality Group</p>
        </div>
      </Link>

      {/* --- CENTER: DESKTOP NAVIGATION --- */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
        {['Home', 'Rooms', 'Services', 'About', 'Contact'].map((item) => {
          const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
          const isActive = location.pathname === path;
          return (
            <Link 
              key={item}
              to={path} 
              className={`${navItemBase} relative group ${isActive ? 'text-[#c5a059]' : 'text-white/80 hover:text-[#c5a059]'}`}
            >
              {item}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#c5a059] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          );
        })}

        {isLoggedIn && (
          <Link 
            to="/feedback/general" 
            className={`${navItemBase} flex items-center gap-2 relative group ${location.pathname.includes('/feedback') ? 'text-[#c5a059]' : 'text-white/80 hover:text-[#c5a059]'}`}
          >
            <MessageSquare size={12} />
            Feedback
          </Link>
        )}
      </nav>

      {/* --- RIGHT: ACTIONS --- */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden sm:flex items-center gap-4 border-r border-white/10 pr-4">
          {isLoggedIn && (
            <div className="relative cursor-pointer group" onClick={notify}>
              <Bell size={16} className="text-white/40 group-hover:text-[#c5a059] transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#c5a059] rounded-full animate-pulse border border-black"></span>
            </div>
          )}

          {!isLoggedIn ? (
            <Link to="/signin" className={`${navItemBase} text-white/90 hover:text-[#c5a059]`}>
              Sign In
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden xl:flex flex-col items-end">
                <span className="text-[7px] text-white/30 uppercase tracking-[2px]">
                  {isAdmin ? "Administrator" : "Welcome"}
                </span>
                <span className="text-[#c5a059] text-[10px] font-medium italic">
                  {user?.username || "Guest"}
                </span>
              </div>
              {isAdmin && (
                <Link to="/admin-dashboard" className="hidden lg:block text-[#c5a059] text-[9px] font-bold uppercase tracking-[1px] border border-[#c5a059]/30 px-2 py-1 hover:bg-[#c5a059] hover:text-black transition-all">
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="text-white/40 text-[9px] hover:text-red-400 transition-colors uppercase font-bold tracking-widest">
                Logout
              </button>
            </div>
          )}
        </div>

        <Link 
          to="/rooms" 
          className="relative overflow-hidden group bg-[#c5a059] text-black px-6 md:px-8 py-2 md:py-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[1.5px] transition-all duration-500 hover:shadow-[0_0_15px_rgba(197,160,89,0.3)]"
        >
          <span className="relative z-10">Book Now</span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </Link>

        <button 
          className="lg:hidden text-white hover:text-[#c5a059] transition-colors p-1 z-[1001]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE NAVIGATION OVERLAY --- */}
      <div className={`fixed inset-0 bg-[#0a0a0a] z-[999] transition-all duration-500 flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-full'}`}>
         {['Home', 'Rooms', 'Services', 'About', 'Contact'].map((item) => (
            <Link 
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="text-xl font-light uppercase tracking-[4px] text-white hover:text-[#c5a059]"
            >
              {item}
            </Link>
         ))}
      </div>
    </header>
  );
};

export default Header;