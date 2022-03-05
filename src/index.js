import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from "./pages/Home/Home";
import Admin from './pages/Admin/Admin';
import { BrowserRouter, Routes, Route } from "react-router-dom";



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />        
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


