import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../store/auth.jsx";

function Register() {
  const navigate = useNavigate();
  const { storeToken } = useAuth(); 

  const [user, setUser] = useState({
    username: "",
    useremail: "",    
    userpnumber: "",  
    userpassword: "",
    role: "guest" 
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account Created! Please Sign In to continue. ✨");
        setTimeout(() => { 
          navigate("/signin"); 
        }, 2000);
      } else {
        toast.error(data.msg || data.message || "Registration Failed");
      }
    } catch (err) {
      console.error("Register Error:", err);
      toast.error("Network Error: Backend is not running.");
    }
  };

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", fontFamily: "'Cormorant Garamond', serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      
      <style>
        {`
          input:focus, select:focus { 
            border-bottom: 1px solid #c5a059 !important; 
            outline: none;
          }
          .luxury-overlay {
            background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%);
          }
          .register-card { animation: fadeIn 1s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          select option { background: #1a1a1a; color: #fff; }
        `}
      </style>

      <div className="register-card" style={formCardStyle}>
        
        <div style={leftPanelStyle}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
             <img 
               src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop" 
               style={{ width: "100%", height: "100%", objectFit: "cover" }} 
               alt="Luxury Room"
             />
             <div className="luxury-overlay" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}></div>
          </div>

          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: "3rem", fontWeight: "600", color: "#c5a059", marginBottom: "20px", lineHeight: "1", letterSpacing: "2px" }}>
                 LUXURYSTAY
            </h2>
            <p style={{ fontSize: "1.2rem", letterSpacing: "4px", textTransform: "uppercase", opacity: "0.8" }}>
              Hospitality
            </p>
          </div>
        </div>

        <div style={rightPanelStyle}>
          <h2 style={{ fontSize: "2rem", color: "#c5a059", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "3px" }}>Guest Profile</h2>
          <p style={{ color: "#888", marginBottom: "40px", fontSize: "0.9rem" }}>Create your account for seamless booking.</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Full Name</label>
              <input type="text" name="username" value={user.username} onChange={handleInput} placeholder="Enter your name" required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Email Address</label>
              <input type="email" name="useremail" value={user.useremail} onChange={handleInput} placeholder="name@example.com" required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Phone Number</label>
              <input type="text" name="userpnumber" value={user.userpnumber} onChange={handleInput} placeholder="+92 ..." required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Password</label>
              <input type="password" name="userpassword" value={user.userpassword} onChange={handleInput} placeholder="••••••••" required style={inputStyle} />
            </div>

            {/* --- 2. Registration Role Dropdown Added Here --- */}
            <div style={{ marginBottom: "35px" }}>
              <label style={labelStyle}>Account Type</label>
              <select 
                name="role" 
                value={user.role} 
                onChange={handleInput} 
                style={{ ...inputStyle, cursor: "pointer", background: "transparent" }}
              >
                <option value="guest">Guest (User)</option>
                <option value="admin">Admin (Hotel Staff)</option>
              </select>
            </div>

            <button 
              type="submit" 
              style={btnStyle} 
              onMouseEnter={(e) => e.target.style.background = "#d4af37"} 
              onMouseLeave={(e) => e.target.style.background = "#c5a059"}
            >
              Register Now
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "30px", color: "#888", fontSize: "14px" }}>
            Already a guest? <span style={{ color: "#c5a059", cursor: "pointer", fontWeight: "bold" }} onClick={() => navigate("/signin")}>Log In</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Styles remain exactly the same as yours
const formCardStyle = { maxWidth: "1000px", width: "100%", background: "#1a1a1a", borderRadius: "0px", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.5)", display: "flex", border: "1px solid rgba(197, 160, 89, 0.2)" };
const leftPanelStyle = { flex: "1", position: "relative", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px" };
const rightPanelStyle = { flex: "1", padding: "60px", background: "#1a1a1a" };
const labelStyle = { display: "block", marginBottom: "8px", fontWeight: "400", fontSize: "11px", color: "#c5a059", textTransform: "uppercase", letterSpacing: "2px" };
const inputStyle = { width: "100%", padding: "12px 0px", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", fontSize: "15px", color: "#fff", transition: "0.3s" };
const btnStyle = { width: "100%", height: "55px", background: "#c5a059", color: "#000", border: "none", fontWeight: "bold", fontSize: "14px", cursor: "pointer", transition: "0.3s", textTransform: "uppercase", letterSpacing: "2px" };

export default Register;