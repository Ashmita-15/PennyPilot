import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ItemsContextProvider } from './ItemsContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/dashboard';
import ProtectedRoute from './ProtectedRoute';
import PasswordReset from './Pages/Auth/password_reset';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ItemsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<App />}/>
          <Route path="/reset-password" element={<PasswordReset/>}/>
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }/>
        </Routes>
        
      </BrowserRouter>
    </ItemsContextProvider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
