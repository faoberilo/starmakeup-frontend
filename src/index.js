import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import Produtos from './pages/Produtos/Produtos';

//axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.baseURL = "https://starmakeupbackend.herokuapp.com/";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />              
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


