import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AlgorandProvider } from './context/AlgorandContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AlgorandProvider>
        <App />
      </AlgorandProvider>
    </BrowserRouter>
  </StrictMode>
);