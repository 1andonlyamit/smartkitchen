const axios = require('axios');
const config = require('../config/master-config');

class RecipeService {
    async getRecipeRecommendation(ingredients) {
        try {
            const response = await axios.post(
                config.huggingFace.model,
                { inputs: `Recipe using ${ingredients.join(', ')}` },
                { headers: { Authorization: `Bearer ${config.huggingFace.api_key}` } }
            );

            return response.data[0]?.generated_text || 'No recipe found';
        } catch (error) {
            console.error('Error fetching recipe recommendation:', error);
            throw new Error('Failed to fetch recipe recommendation');
        }
    }

    async generateCustomDish(availableIngredients) {
        try {
            const prompt = `Create a recipe using only these ingredients: ${availableIngredients.join(", ")}. 
            Provide a step-by-step guide for preparation. The response should be in clear instructions for a chef.`;

            const response = await axios.post(
                config.huggingFace.model,
                { inputs: prompt },
                { headers: { Authorization: `Bearer ${config.huggingFace.api_key}` } }
            );

            return response.data[0]?.generated_text || 'No dish could be generated.';
        } catch (error) {
            console.error('Error generating custom dish:', error);
            throw new Error('Failed to generate dish');
        }
    }
}

module.exports = RecipeService;
