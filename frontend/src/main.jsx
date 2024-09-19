import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Importing Redux Provider
import {store,persister} from './redux/store.js'; // Importing the Redux store
import App from './App.jsx';
import { PersistGate } from 'redux-persist/integration/react'


import './index.css'; // Your global CSS

// Create the root element for React DOM
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    {/* Wrapping the entire app with the Redux Provider and passing the store */}
    <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
    <App />
      </PersistGate>
     
    </Provider>
  </StrictMode>
);
