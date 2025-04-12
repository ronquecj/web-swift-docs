import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.jsx';
import Dashboard from '@/app/dashboard/page';
import History from '@/app/history/page';
import Messages from '@/app/messages/page';
import Signup from '@/app/signup/page';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<History />} />
      <Route path="/messages" element={<Messages />} />
    </Routes>
  </BrowserRouter>
);
