import React from "react";

function OverviewCard({ title, value, icon, change, changeType }) {
  return (
    <div className="card bg-dark text-white border-secondary shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="text-muted">{title}</h6>
          <span className="text-info">{icon}</span>
        </div>
        <h3 className="mb-3">{value}</h3>
        {change && (
          <div className={`badge bg-${changeType === 'positive' ? 'success' : 'danger'} p-2`}>
            <small>
              {changeType === 'positive' ? '↑' : '↓'} {change}
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

export default OverviewCard;