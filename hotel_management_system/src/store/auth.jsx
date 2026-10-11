import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  const authorizationToken = `Bearer ${token}`;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem('token', serverToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const isLoggedIn = !!token;

  // --- HMS User Authentication Logic ---
  const userAuthentication = async () => {
    
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
       
        setUser(data.userData);
      } else {
        console.warn("Authentication failed, logging out...");
        logout();
      }
    } catch (error) {
      
      console.error("Backend connection failed! Is the server running on port 5000?", error);
      
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

 
  useEffect(() => {
    userAuthentication();
    
  }, [token]);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      token, 
      user, 
      storeToken, 
      logout, 
      authorizationToken, 
      isLoading,
      userAuthentication 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return authContextValue;
};