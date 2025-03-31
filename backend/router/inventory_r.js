const express = require("express");
const router = express.Router();
const imageController = require("../controller/inventory_c");
const upload = require("../middleware/upload");

router.get('/get-data', imageController.getAllImages);

router.post('/delete/:id', imageController.deleteImage);

router.post("/upload", upload.single("image"), imageController.uploadImage);

router.post("/process/:id", imageController.processImage);

router.get("/image/:filename", imageController.getImage);

module.exports = router;
