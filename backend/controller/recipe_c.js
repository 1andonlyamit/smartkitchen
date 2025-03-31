const RecipeService = new (require('../services/recipeservice'));
const DatabaseService = require('../services/databasehelper');
const db = new DatabaseService();

class RecipeController {
    async recommendRecipe(req, res) {
        try {
            const query = `SELECT name FROM fridge WHERE expiry_date <= DATE_ADD(CURDATE(), INTERVAL 3 DAY)`;
            const items = await db.executeQuery(query);

            if (items.length === 0) {
                return res.status(404).json({ message: 'No soon-to-expire items found' });
            }

            const ingredients = items.map(item => item.name);
            const recipe = await RecipeService.getRecipeRecommendation(ingredients);

            res.json({ ingredients, recipe });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async generateCustomDish(req, res) {
        try {
            const query = `SELECT name FROM fridge`;
            const items = await db.executeQuery(query);

            if (items.length === 0) {
                return res.status(404).json({ message: 'No ingredients available in fridge' });
            }

            const availableIngredients = items.map(item => item.name);
            const recipe = await RecipeService.generateCustomDish(availableIngredients);

            res.json({ availableIngredients, recipe });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = RecipeController;
