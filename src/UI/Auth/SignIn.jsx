import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../store/auth.jsx";

function SignIn() {
  const navigate = useNavigate();
  const { storeToken } = useAuth(); 
  
  const [user, setUser] = useState({
    useremail: "", 
    userpassword: "",
    role: "guest" 
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          useremail: user.useremail,
          userpassword: user.userpassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // --- CLEAN START ---
        localStorage.clear(); 
        
        storeToken(data.token);
        
        // --- ADMIN CHECK LOGIC ---
        
        const isUserAdmin = data.user?.isAdmin === true || data.user?.role === "admin" || data.role === "admin";
        
        // --- SAVE TO LOCALSTORAGE ---
        // App.jsx ki ProtectedRoute hamesha string check karti hai
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", isUserAdmin.toString()); 
        localStorage.setItem("userName", data.username || "Guest");
        
        toast.success(`Welcome back, ${data.username || "Guest"}! ✨`);
        
        setTimeout(() => {
          // Navigation Logic
          if (user.role === "admin" && isUserAdmin) {
            console.log("Navigating to Admin Dashboard...");
        
            window.location.href = "/admin-dashboard"; 
          } else {
            console.log("Navigating to Home...");
            window.location.href = "/"; 
          }
        }, 1500);
      } else {
        toast.error(data.msg || data.message || "Invalid Credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Server Error: Is your backend running?");
    }
  };

  return (
    <div style={containerStyle}>
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
      
      <style>
        {`
          input:focus, select:focus { border-bottom: 1px solid #c5a059 !important; outline: none; }
          .login-card { animation: fadeIn 0.8s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .luxury-overlay-login { background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%); }
          @media (max-width: 768px) {
            .login-card { flex-direction: column; width: 95% !important; }
            .left-panel { display: none !important; }
          }
        `}
      </style>

      <div className="login-card" style={formCardStyle}>
        <div className="left-panel" style={leftPanelStyle}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
             <img 
               src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000&auto=format&fit=crop" 
               style={{ width: "100%", height: "100%", objectFit: "cover" }} 
               alt="Luxury Lobby"
             />
             <div className="luxury-overlay-login" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}></div>
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: "3rem", color: "#c5a059", letterSpacing: "1px" }}>LUXURYSTAY</h2>
            <p style={{ opacity: "0.8", fontSize: "1.1rem", letterSpacing: "3px", textTransform: "uppercase" }}>Hospitality</p>
          </div>
        </div>

        <div style={rightPanelStyle}>
          <h2 style={{ fontSize: "2.2rem", color: "#c5a059", textTransform: "uppercase", letterSpacing: "4px", marginBottom: "10px" }}>Sign In</h2>
          <p style={{ color: "#888", marginBottom: "30px", fontSize: "0.9rem" }}>Enter your credentials to access your profile.</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Email Address</label>
              <input type="email" name="useremail" placeholder="guest@example.com" value={user.useremail} onChange={handleInput} style={inputStyle} required />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Password</label>
              <input type="password" name="userpassword" placeholder="••••••••" value={user.userpassword} onChange={handleInput} style={inputStyle} required />
            </div>

            <div style={{ marginBottom: "35px" }}>
              <label style={labelStyle}>Access Type</label>
              <select name="role" value={user.role} onChange={handleInput} style={{ ...inputStyle, background: "#1a1a1a", color: "#c5a059", cursor: "pointer" }}>
                <option value="guest">Guest Access (Home)</option>
                <option value="admin">Admin Portal (Dashboard)</option>
              </select>
            </div>

            <button type="submit" style={btnStyle} onMouseEnter={(e) => e.target.style.background = "#d4af37"} onMouseLeave={(e) => e.target.style.background = "#c5a059"}>
              Access Profile
            </button>
            
            <p style={{ textAlign: "center", marginTop: "25px", color: "#888", fontSize: "14px" }}>
              New here? <span onClick={() => navigate("/register")} style={{ color: "#c5a059", cursor: "pointer", fontWeight: "bold" }}>Register</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const containerStyle = { backgroundColor: "#121212", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'Cormorant Garamond', serif" };
const formCardStyle = { maxWidth: "1000px", width: "100%", display: "flex", background: "#1a1a1a", border: "1px solid rgba(197, 160, 89, 0.2)", overflow: "hidden" };
const leftPanelStyle = { flex: "1", padding: "60px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" };
const rightPanelStyle = { flex: "1.1", padding: "60px", backgroundColor: "#1a1a1a" };
const labelStyle = { display: "block", fontSize: "11px", color: "#c5a059", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "8px" };
const inputStyle = { width: "100%", padding: "12px 0px", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", fontSize: "15px", color: "#fff", transition: "0.3s" };
const btnStyle = { width: "100%", height: "55px", background: "#c5a059", color: "#000", border: "none", fontWeight: "bold", cursor: "pointer", transition: "0.3s", textTransform: "uppercase", letterSpacing: "2px" };

export default SignIn;