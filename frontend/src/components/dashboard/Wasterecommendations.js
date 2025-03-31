import React from "react";

function WasteRecommendations() {
  // Hardcoded recommendations
  const recommendations = [
    {
      id: 1,
      title: "Reduce Prep Quantities",
      description: "Reduce preparation of salad items by 15% on weekdays to match consumption patterns.",
      impact: "High",
    },
    {
      id: 2,
      title: "Adjust Storage Methods",
      description: "Store leafy greens in vacuum-sealed containers to extend shelf life by 3-4 days.",
      impact: "Medium",
    },
    {
      id: 3,
      title: "Repurpose Ingredients",
      description: "Use overripe fruits in smoothies and desserts before they spoil.",
      impact: "Medium",
    },
  ];

  // Function to determine badge color based on impact
  const getImpactBadgeColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'success';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="card bg-dark text-white border-secondary shadow-sm h-100">
      <div className="card-header bg-dark border-secondary">
        <h5 className="mb-0">Waste Reduction Recommendations</h5>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {recommendations.map((rec) => (
            <div key={rec.id} className="list-group-item bg-dark border-secondary text-light">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="mb-0">{rec.title}</h6>
                <span className={`badge bg-${getImpactBadgeColor(rec.impact)}`}>
                  {rec.impact} Impact
                </span>
              </div>
              <p className="text-muted small mb-0">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WasteRecommendations;