const { database } = require("../config/master-config");
const DatabaseService = require("../services/databasehelper");
const dbService = new DatabaseService();

exports.getAllImages = async () => {
    try {
        const query = `SELECT * FROM images ORDER BY uploaded_at DESC`;
        return await dbService.executeQuery(query);
    } catch (error) {
        throw error;
    }
}
exports.saveImage = async (filename, path) => {
    const result = await dbService.executeQuery(
        "INSERT INTO images (filename, path, processed) VALUES (?, ?, 0)",
        [filename, path]
    );
    return result.insertId;
};

exports.getImageById = async (id) => {
    const result = await dbService.executeQuery(
        "SELECT * FROM images WHERE id = ?",
        [id]
    );
    return result.length ? result[0] : null;
};

exports.updateImageProcessing = async (id, item_name, item_category) => {
    return dbService.executeQuery(
        "UPDATE images SET processed = 1, item_name = ?, item_category = ? WHERE id = ?",
        [item_name, item_category, id]
    );
};

exports.deleteImage = async (id) => {
    try {
        const query = `DELETE FROM images WHERE id = ?`;
        return await dbService.executeQuery(query, [id]);
    } catch (error) {
        throw error;
    }
}