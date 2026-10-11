const Maintenance = require('../models/maintenance_model');

// --- 1. REPORT ISSUE ---
const reportIssue = async (req, res) => {
    try {
        const { rId, desc, urgency } = req.body;

        const issueReported = await Maintenance.create({
            roomId: rId,
            taskDescription: desc,
            urgency: urgency,
            reportedBy: req.user.userId
        });

        return res.status(201).json({ msg: "Issue Reported Successfully", issueReported });
    } catch (error) {
        return res.status(500).json({ msg: "Maintenance Error" });
    }
};

// --- 2. UPDATE TASK STATUS ---
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'in-progress', 'completed'

        const taskUpdate = await Maintenance.findByIdAndUpdate(id, { maintenanceStatus: status }, { new: true });
        return res.status(200).json({ msg: "Task Status Updated", taskUpdate });
    } catch (error) {
        return res.status(500).json({ msg: "Task Update Error" });
    }
};

module.exports = { reportIssue, updateTaskStatus };