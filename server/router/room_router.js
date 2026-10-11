const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Room = require("../models/room_model"); 
const { 
    addRoom, 
    updateRoomStatus, 
    getAllRooms, 
    getRoomStats 
} = require("../controllers/room_controller");

// --- MULTER SETUP ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });

// --- ROUTES ---

// 1. ADD: Field name must match Frontend "rImage"
router.post("/add-room", upload.single("rImage"), addRoom); 

// 2. UPDATE: Handles both file upload and manual data mapping
router.put("/update-room/:id", upload.single("rImage"), async (req, res) => {
    try {
        const { id } = req.params;
        const { rNum, rType, rPrice, rDesc, rAmenities, rImage } = req.body;
        
        let updateData = {
            roomType: rType,
            roomPrice: rPrice ? Number(rPrice) : undefined,
            description: rDesc,
            amenities: rAmenities ? rAmenities.split(',').map(a => a.trim()) : [],
            roomImage: rImage // Default to existing URL
        };

        // If user is changing the room number
        if (rNum) updateData.roomNumber = rNum;

        // If a new physical file was uploaded
        if (req.file) {
            updateData.roomImage = req.file.path.replace(/\\/g, "/");
        }

        const updatedRoom = await Room.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ msg: "Asset Updated", data: updatedRoom });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ msg: "Update failed", error: err.message });
    }
});

router.get("/all-rooms", getAllRooms);
router.get("/stats", getRoomStats);
router.patch("/status/:id", updateRoomStatus);

router.delete("/delete-room/:id", async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Room deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;