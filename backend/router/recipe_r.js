const express = require('express');
const router = express.Router();
const RecipeController = new (require('../controller/recipe_c'));

router.get('/recommend-recipe', RecipeController.recommendRecipe);
router.get('/generate-dish', RecipeController.generateCustomDish);

module.exports = router;
