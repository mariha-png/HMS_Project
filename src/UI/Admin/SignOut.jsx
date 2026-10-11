import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
 
    localStorage.clear(); 

   
    const timer = setTimeout(() => {
   
      navigate("/signin", { replace: true });
    }, 2500); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor: "#0a0a0a", // Luxury Dark
      color: "#d4af37", // Gold
      fontFamily: "'Playfair Display', serif" 
    }}>
      <h1 style={{ fontSize: "2.5rem", letterSpacing: "8px", fontWeight: "300" }}>
        SIGNING OUT
      </h1>
      <p style={{ color: "#666", marginTop: "15px", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "2px" }}>
        Cleaning your secure session...
      </p>
      
      <div className="loader" style={{ 
        marginTop: "40px",
        border: "1px solid rgba(212, 175, 55, 0.1)",
        borderTop: "2px solid #d4af37",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        animation: "spin 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite"
      }}></div>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default SignOut;