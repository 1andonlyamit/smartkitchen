import React from "react";

function RecipeSuggestions() {
  // Hardcoded recipe suggestions
  const recipes = [
    {
      id: 1,
      name: "Vegetable Stir Fry",
      ingredients: ["Bell peppers", "Carrots", "Broccoli", "Tofu"],
      usesBefore: "Apr 5, 2025",
    },
    {
      id: 2,
      name: "Fruit Smoothie Bowl",
      ingredients: ["Bananas", "Berries", "Yogurt", "Honey"],
      usesBefore: "Apr 2, 2025",
    },
    {
      id: 3,
      name: "Chicken & Rice Casserole",
      ingredients: ["Chicken breast", "Rice", "Peas", "Cream"],
      usesBefore: "Apr 3, 2025",
    },
  ];

  return (
    <div className="card bg-dark text-white border-secondary shadow-sm h-100">
      <div className="card-header bg-dark border-secondary">
        <h5 className="mb-0">Recipe Suggestions</h5>
        <small className="text-muted">Based on items nearing expiration</small>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="list-group-item bg-dark border-secondary text-light">
              <h6 className="mb-1">{recipe.name}</h6>
              <p className="mb-1 small">
                <span className="text-info">Ingredients: </span>
                {recipe.ingredients.join(", ")}
              </p>
              <small className="text-warning">
                Use before: {recipe.usesBefore}
              </small>
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer bg-dark border-secondary text-center">
        <button className="btn btn-sm btn-outline-info">View All Recipes</button>
      </div>
    </div>
  );
}

export default RecipeSuggestions;