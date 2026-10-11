const Room = require('../models/room_model');

const addRoom = async (req, res) => {
    try {
        // Checking if data actually arrived in Terminal
        console.log("Incoming Body:", req.body);
        
        const { rNum, rType, rPrice, rDesc, rAmenities, rImage } = req.body; 

        if (!rNum || !rPrice) {
            return res.status(400).json({ msg: "Room number and price are required." });
        }

        const RoomExist = await Room.findOne({ roomNumber: rNum });
        if (RoomExist) {
            return res.status(400).json({ msg: "Room Number already exists" });
        }

        let finalAmenities = [];
        if (rAmenities) {
            finalAmenities = typeof rAmenities === 'string' ? rAmenities.split(',').map(a => a.trim()) : rAmenities;
        }

        // Logic: Use File Path if uploaded, else use the preset URL from frontend
        let roomImagePath = rImage || ""; 
        if (req.file) {
            roomImagePath = req.file.path.replace(/\\/g, "/"); 
        }

        const roomCreate = await Room.create({
            roomNumber: rNum, // Mapping frontend rNum to backend roomNumber
            roomType: rType,
            roomPrice: Number(rPrice),
            description: rDesc || "Premium room",
            amenities: finalAmenities,
            roomImage: roomImagePath,
            roomStatus: 'available'
        });

        return res.status(201).json({ msg: "Room Added", roomData: roomCreate });
    } catch (error) {
        console.error("CRASH ERROR:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};

const getAllRooms = async (req, res) => {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json(rooms);
};

const updateRoomStatus = async (req, res) => {
    try {
        const { roomStatus } = req.body;
        const updated = await Room.findByIdAndUpdate(req.params.id, { roomStatus }, { new: true });
        res.status(200).json(updated);
    } catch (e) { res.status(500).send(e); }
};

const getRoomStats = async (req, res) => {
    const total = await Room.countDocuments();
    const available = await Room.countDocuments({ roomStatus: 'available' });
    const booked = await Room.countDocuments({ roomStatus: 'booked' });
    res.status(200).json({ total, available, booked });
};

module.exports = { addRoom, updateRoomStatus, getAllRooms, getRoomStats };