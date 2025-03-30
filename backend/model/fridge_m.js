const db = new (require('../services/databasehelper'));

class FridgeModel {
    static async addItem(name, category, expiry_date, purchase_time, quantity, cost_per_unit) {
        try {
            const query = `INSERT INTO fridge (name, category, expiry_date, purchase_time, quantity, cost_per_unit) VALUES (?, ?, ?, ?, ?, ?)`;
            const result = await db.executeQuery(query, [name, category, expiry_date, purchase_time, quantity, cost_per_unit]);
            return { id: result.insertId, name, category, expiry_date, quantity, cost_per_unit };
        } catch (error) {
            throw error;
        }
    }

    static async deleteItem(id) {
        try {
            const query = `DELETE FROM fridge WHERE id = ?`;
            await db.executeQuery(query, [id]);
        } catch (error) {
            throw error;
        }
    }

    static async getData() {
        try {
            const query = `SELECT * FROM fridge ORDER BY purchase_time DESC`;
            return await db.executeQuery(query);
        } catch (error) {
            throw error;
        }
    }

    static async removeExpiredItems() {
        try {
            const query = `DELETE FROM fridge WHERE expiry_date < CURDATE()`;
            await db.executeQuery(query);
            console.log("Expired items removed successfully.");
        } catch (error) {
            console.error("Error removing expired items:", error);
            throw error;
        }
    }
}

module.exports = FridgeModel;

