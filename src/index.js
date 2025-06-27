import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import './App.css'; // Ensure this path is correct
import App from './App'; // Import the App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
