import React from 'react';

import logo from '../../assets/img/logo.svg';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React Base Component
        </p>
      </header>
    </div>
  );
};

export default Popup;
