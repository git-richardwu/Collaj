import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ArtContextProvider } from './context/ArtContext';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ArtContextProvider>
        <App />
      </ArtContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

 