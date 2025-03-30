import React from 'react';

function PreviewCard({ item, onClose }) {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
         style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1050 }}
         onClick={onClose}>
      <div className="card bg-dark text-light border-secondary" 
           style={{ maxWidth: '500px', width: '100%' }}
           onClick={(e) => e.stopPropagation()}>
        <div className="card-header d-flex justify-content-between align-items-center border-secondary">
          <h5 className="mb-0">{item.item_name}</h5>
          <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
        <div className="card-body text-center">
          <img 
            src={`http://localhost:8888/inventory/image/${item.filename}`} 
            alt={item.item_name}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: '350px', objectFit: 'contain' }}
          />
          <div className="row g-2 text-start">
            <div className="col-6">
              <p className="mb-1 text-secondary">ID:</p>
              <p className="mb-3">{item.id}</p>
            </div>
            <div className="col-6">
              <p className="mb-1 text-secondary">Category:</p>
              <p className="mb-3">{item.item_category}</p>
            </div>
            <div className="col-12">
              <p className="mb-1 text-secondary">Filename:</p>
              <p className="mb-3 text-truncate">{item.filename}</p>
            </div>
          </div>
        </div>
        <div className="card-footer text-end border-secondary">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default PreviewCard;