const axios = require("axios");
const fs = require("fs");
const path = require("path");
const config = require("../config/master-config");

class ImageProcessingService {
    static async detectObject(imagePath) {
        try {
            const image = fs.readFileSync(imagePath, { encoding: "base64" });

            const response = await axios({
                method: "POST",
                url: config.api_url,
                params: {
                    api_key: config.api_key, 
                },
                data: image,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (response.data && response.data.predictions.length > 0) {
                const bestPrediction = response.data.predictions[0]; 
                return {
                    item_name: bestPrediction.class, 
                    item_category: "vegetable",
                };
            }

            return { item_name: "Unknown", item_category: "Unknown" };
        } catch (error) {
            console.error("Error in object detection:", error.message);
            return { item_name: "Error", item_category: "Error" };
        }
    }
}

module.exports = ImageProcessingService;
