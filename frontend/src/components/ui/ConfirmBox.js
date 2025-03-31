import React from 'react';

function ConfirmBox({ isOpen, message, onConfirm, onCancel, title = "Confirm Action" }) {
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
            <p>{message}</p>
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
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBox;