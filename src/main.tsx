import React from 'react';
import ReactDOM from 'react-dom/client';
import QualityControlPortal from './quality-control-portal.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QualityControlPortal />
  </React.StrictMode>,
);
