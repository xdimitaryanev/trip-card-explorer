import { createRoot } from 'react-dom/client'
import React from 'react';
import ErrorBoundary from './utils/ErrorBoundary.jsx';
import App from './App.jsx'

import './styles/App.scss';
import './styles/components/TripCard.scss';
import './styles/components/SkeletonCard.scss';
import './styles/components/SearchBar.scss';
import './styles/components/Modal.scss';
import './styles/components/Pagination.scss';
import './styles/components/SafeImage.scss';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
