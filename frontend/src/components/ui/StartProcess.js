import React from 'react';

function StartProcess({ isOpen, itemDetails, onConfirm, onCancel, title = "Start Processing" }) {
  if (!isOpen) return null;
  
  return (
    <div 
      className="modal fade show" 
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-light border-secondary">
          <div className="modal-header border-secondary">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to process this item?</p>
            
            {itemDetails && (
              <div className="mt-3 p-3 border border-secondary rounded">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <img 
                      src={`http://localhost:8888${itemDetails.path}`} 
                      alt={itemDetails.item_name} 
                      className="rounded"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h6 className="mb-1">{itemDetails.item_name !== "Unknown" ? itemDetails.item_name : "Unidentified Item"}</h6>
                    <div className="small text-muted mb-1">
                      ID: {itemDetails.id} | Category: {itemDetails.item_category !== "Unknown" ? itemDetails.item_category : "None"}
                    </div>
                    <span className={`badge ${itemDetails.processed ? 'bg-success' : 'bg-warning'}`}>
                      {itemDetails.processed ? 'Processed' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="alert alert-info mt-3">
              <small>This will send the image to the AI processing service to identify or verify the item.</small>
            </div>
          </div>
          <div className="modal-footer border-secondary">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={onConfirm}
            >
              Start Processing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartProcess;