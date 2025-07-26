const router = require("express").Router();
const Stock = require("../database/stock");

router.post('/stock/stock', async (req, res) => {
    try {        // Basic validation
        if (!product || quantity === undefined || price === undefined) {
            return res.status(400).json({ message: 'Missing required fields: product, quantity, and price are required.' });

        const { product, quantity, price,  } = req.body; // Added unit here for completeness
        console.log('POST /api/stock - Adding new item:', req.body);

        }

        // Create a new stock document
        const newItem = new Stock({
            product,
            quantity,
            price,
             // Your schema can be updated to include this field
        });

        // Save the new item to the database
        const savedItem = await newItem.save();

        res.status(201).json({
            message: "Stock item added successfully",
            data: savedItem
        });
    } catch (error) {
        res.status(500).json({ message: "Server error while adding item.", error: error.message });
    }
})
router.delete('/stock/delete/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log(`DELETE /api/stock/${itemId} - Deleting item`);

        const deletedItem = await Stock.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ message: `Stock item with ID ${itemId} not found.` });
        }

        res.status(200).json({ message: `Stock item with ID ${itemId} deleted successfully.` });
    } catch (error) { 
        res.status(500).json({ message: "Server error while deleting item.", error: error.message });
    }
});
router.put('/stock/update/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log(`PUT /api/stock/${itemId} - Updating item with:, req.body`);

        const updatedItem = await Stock.findByIdAndUpdate(
            itemId,
            req.body, // The request body will contain the fields to update
            { new: true, runValidators: true } // {new: true} returns the updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ message: `Stock item with ID ${itemId} not found.` });
        }

        res.status(200).json({
            message: "Stock item updated successfully",
            data: updatedItem
        });
    } catch (error) {
        res.status(500).json({ message: "Server error while updating item.", error: error.message });
    }
});
router.get('/stock/find/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log(`GET /api/stock/${itemId} - Fetching item`);

        const item = await Stock.findById(itemId);

        if (!item) {
            return res.status(404).json({ message:` Stock item with ID ${itemId} not found. `});
        }

        res.status(200).json({
            message: "Stock item fetched successfully",
            data: item
        });
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching item.", error: error.message });
    }
});
router.get('/stock/all', async (req, res) => {
    try {
        const items = await Stock.find();
        res.status(200).json({
            message: "All stock items fetched successfully",
            data: items
        });
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching all items.", error: error.message });
    }
});
module.exports = router;