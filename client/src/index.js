import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import useUserStore from './store/useUserStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const userStoreData = useUserStore;

root.render(
    <React.StrictMode>
          <App />
    </React.StrictMode>
);
