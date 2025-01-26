import { Provider } from './components/ui/provider';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found. Make sure you have an element with id 'root' in your HTML.");
}



const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
