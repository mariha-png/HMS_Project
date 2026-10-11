require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./utils/db");

// --- ROUTES IMPORT ---
const authroute = require("./router/auth_router");
const bookingroute = require("./router/booking_router");
const roomroute = require("./router/room_router"); 
const contactroute = require("./router/contact_router");
const inquiryroute = require("./router/inquiry_router"); 
const membershiproute = require("./router/membership_router");
const feedbackroute = require("./router/feedback_router"); 
const adminroute = require("./router/admin_router"); 
const guestroute = require("./router/guest_router"); 

const app = express();

// --- CORS CONFIGURATION ---
const corsOptions = {
  origin: [
    "http://localhost:3000", 
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost:5175"
  ],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// --- MIDDLEWARES ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Static folder for images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- ROUTES ACTIVATION ---
app.use("/api/auth", authroute);
app.use("/api/bookings", bookingroute); 
app.use("/api/rooms", roomroute); 
app.use("/api/contact", contactroute); 
app.use("/api/inquiries", inquiryroute);
app.use("/api/memberships", membershiproute); // ✅ Membership route activated
app.use("/api/feedback", feedbackroute); 
app.use("/api/admin", adminroute); 
app.use("/api/guests", guestroute); 

// --- ERROR HANDLING MIDDLEWARE ---
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "BACKEND ERROR";
  const extraDetails = err.extraDetails || "Error from Backend";
  
  console.error(`[Error] Status: ${status}, Message: ${message}`);
  return res.status(status).json({ message, extraDetails });
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on: http://localhost:${PORT}`);
      console.log("✅ Database Connection Successful");
    });
  })
  .catch((err) => {
    console.error("❌ DATABASE CONNECTION FAILED!", err);
    process.exit(0);
  });