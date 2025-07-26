
// 📂 routes/requestBySeller.js
// Updating this file with new routes for confirming and fetching orders.

const router = require("express").Router();
// IMPORTANT: Make sure the model name here matches what you export
const RequestBySeller = require("../database/RequestBySeller.js"); 

// --- EXISTING ROUTE: Create a new request ---
router.post('/requests', async (req, res) => {
    try {
        const { name, product, quantity, price, location, deliveryBy } = req.body;
        
        // All new requests start with the default 'PENDING' status
        const newRequest = new RequestBySeller({
            name, product, quantity, price, location, deliveryBy
        });

        const savedRequest = await newRequest.save();
        res.status(201).json({
            message: "Request item added successfully",
            data: savedRequest
        });

    } catch (error) {
        console.error("Server error while adding request:", error);
        res.status(500).json({ message: "Server error while adding request.", error: error.message });
    }
});


// --- NEW ROUTE: Confirm a request and turn it into an order ---
// This route is called when a buyer clicks "Confirm Order".
router.patch('/requests/:id/confirm', async (req, res) => {
    try {
        const requestId = req.params.id;
        
        // Find the request and update its status from 'PENDING' to 'In Process'
        const confirmedOrder = await RequestBySeller.findByIdAndUpdate(
            requestId,
            { status: 'In Process' },
            { new: true } // This option returns the updated document
        );

        if (!confirmedOrder) {
            return res.status(404).json({ message: `Request item with ID ${requestId} not found.` });
        }

        res.status(200).json({
            message: "Order confirmed successfully!",
            data: confirmedOrder
        });

    } catch (error) {
        console.error("Server error while confirming order:", error);
        res.status(500).json({ message: "Server error while confirming order.", error: error.message });
    }
});


// --- NEW ROUTE: Get items for the Order History page ---
// This fetches all items that are NOT 'PENDING'.
router.get('/orders', async (req, res) => {
    try {
        const orders = await RequestBySeller.find({
            // Use the '$ne' (not equal) operator to exclude pending requests
            status: { $ne: 'PENDING' }
        }).sort({ createdAt: -1 }); // Show the most recent orders first

        res.status(200).json(orders);

    } catch (error) {
        console.error("Server error while fetching order history:", error);
        res.status(500).json({ message: "Server error while fetching order history.", error: error.message });
    }
});


// You can also add a route to update the status further (e.g., to 'Delivered')
router.patch('/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: "Status is required." });
        }

        const updatedOrder = await RequestBySeller.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({ message: "Order status updated.", data: updatedOrder });

    } catch (error) {
        console.error("Server error while updating status:", error);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
});

// Add this route to your routes/requestBySeller.js file

// --- GET only PENDING requests ---
// This is the endpoint your RequestPage needs.
router.get('/requests/pending', async (req, res) => {
    try {
        const pendingRequests = await RequestBySeller.find({ status: 'PENDING' })
            .sort({ createdAt: 'desc' }); // Show newest requests first
        
        res.status(200).json(pendingRequests);

    } catch (error) {
        console.error("Server error while fetching pending requests:", error);
        res.status(500).json({ message: "Server error while fetching pending requests.", error: error.message });
    }
});


module.exports = router;
