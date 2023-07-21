import React from 'react';
import './Popup.css';

const Popup = ({ onClose, children }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {children}
        <div className="button-container">
          <button className="popup-button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
