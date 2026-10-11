
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout Import
import AppLayout from "./components/layout/AppLayout";

// --- Public & Functional Pages ---
import Home from "./UI/Public/Home";
import About from "./UI/Public/About";
import Rooms from "./UI/Public/Rooms";
import Contact from "./UI/Public/Contact";
import ErrorPage from "./UI/Public/Error";
import Booking from "./UI/Public/Booking";
import Services from "./UI/Public/Services";
import Invoice from "./UI/Public/Invoice"; 
import BookingDetail from "./UI/Public/Booking_Detail";

// --- Feedback Components ---
import Feedback from "./UI/Public/Feedback"; 
import FeedbackPanel from "./UI/Admin/FeedbackPanel"; 

// --- Admin Pages ---
import AdminDashboard from "./UI/Admin/AdminDashboard";
import GuestPanel from "./UI/Admin/GuestPanel";
import FinancePanel from "./UI/Admin/FinancePanel"; 
import SystemPanel from "./UI/Admin/SystemPanel"; 
import InventoryPanel from "./UI/Admin/InventoryPanel";
import SignOut from "./UI/Admin/SignOut"; 
import HousekeepingPanel from "./UI/Admin/HousekeepingPanel";

// --- Auth & Components ---
import Logout from "./components/Logout"; 
import Register from "./UI/Auth/Register";
import SignIn from "./UI/Auth/SignIn";

// --- Protected Route Component ---
const ProtectedRoute = ({ children, isAdminRoute = false }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; 

  if (!token) {
    
    return <Navigate to="/login" replace />;
  }

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />

        {/* Standard Protected Routes */}
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} /> 
        <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path="/booking-detail/:id" element={<ProtectedRoute><BookingDetail /></ProtectedRoute>} />
        <Route path="/invoice/:bookingId" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
        <Route path="/feedback/:roomId" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />

        {/* Admin Panels */}
        <Route path="/admin-dashboard" element={<ProtectedRoute isAdminRoute={true}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/guests" element={<ProtectedRoute isAdminRoute={true}><GuestPanel /></ProtectedRoute>} />
        <Route path="/admin/inventory" element={<ProtectedRoute isAdminRoute={true}><InventoryPanel /></ProtectedRoute>} />
        <Route path="/admin/finances" element={<ProtectedRoute isAdminRoute={true}><FinancePanel /></ProtectedRoute>} />
        <Route path="/admin/system" element={<ProtectedRoute isAdminRoute={true}><SystemPanel /></ProtectedRoute>} />
        <Route path="/admin/invoice" element={<ProtectedRoute isAdminRoute={true}><Invoice /></ProtectedRoute>} />
        <Route path="/admin/housekeeping" element={<ProtectedRoute isAdminRoute={true}><HousekeepingPanel /></ProtectedRoute>} />
        <Route path="/admin/feedback" element={<ProtectedRoute isAdminRoute={true}><FeedbackPanel /></ProtectedRoute>} />
      </Route>

      <Route path="/register" element={<Register />} />
      
      
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} /> 
      
      {/* Redirection Routes */}
      <Route path="/logout" element={<SignOut />} />
      <Route path="/user-logout" element={<Logout />} />
      
      {/* Error Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;