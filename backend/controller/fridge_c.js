const FridgeModel = require('../model/fridge_m');

exports.addItem = async (req, res) => {
    try {
        const { name, category, expiry_date, purchase_time, quantity, cost_per_unit } = req.body;

        if (!name || !category || !expiry_date || !purchase_time || !quantity || !cost_per_unit) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newItem = await FridgeModel.addItem(name, category, expiry_date, purchase_time, quantity, cost_per_unit);
        res.status(200).json({ message: "Item added successfully.", item: newItem });
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Item ID is required." });
        }

        await FridgeModel.deleteItem(id);
        res.status(200).json({ message: "Item deleted successfully." });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getData = async (req, res) => {
    try {
        const data = await FridgeModel.getData();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching fridge data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
