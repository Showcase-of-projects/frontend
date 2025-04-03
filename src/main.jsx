import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'; 
import store from './redux/store'; 
import { ThemeProvider } from "@material-tailwind/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}></Provider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
