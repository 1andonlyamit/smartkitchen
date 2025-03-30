const path = require("path");
const fs = require("fs");
const ImageModel = require("../model/inventory_m");
const ImageProcessingService = require("../services/imageprocessing");

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imageUrl = `/uploads/${req.file.filename}`;
        const imageId = await ImageModel.saveImage(req.file.filename, imageUrl);

        res.json({ message: "Image uploaded successfully", imageId, imageUrl });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.processImage = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await ImageModel.getImageById(id);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        const imagePath = path.join(__dirname, "../uploads", image.filename);
        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ message: "Image file not found" });
        }

        const { item_name, item_category } = await ImageProcessingService.detectObject(imagePath);

        await ImageModel.updateImageProcessing(id, item_name, item_category);

        res.json({
            message: "Image processed successfully",
            item_name,
            item_category,
        });
    } catch (error) {
        console.error("Processing error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getImage = (req, res) => {
    const imagePath = path.join(__dirname, "../uploads", req.params.filename);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({ message: "Image not found" });
    }
};

exports.getAllImages = async (req, res) => {
    try {
        const images = await ImageModel.getAllImages();
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
