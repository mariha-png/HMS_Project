const Invoice = require('../models/invoice_model');

// --- 1. GENERATE INVOICE ---
const generateInvoice = async (req, res) => {
    try {
        const { bId, rCharges, services, total } = req.body;

        const invoiceCreate = await Invoice.create({
            bookingId: bId,
            roomCharges: rCharges,
            additionalServices: services, // Array of {serviceName, cost}
            grandTotal: total
        });

        return res.status(201).json({ msg: "Invoice Generated", invoiceCreate });
    } catch (error) {
        return res.status(500).json({ msg: "Invoicing Error" });
    }
};

module.exports = { generateInvoice };