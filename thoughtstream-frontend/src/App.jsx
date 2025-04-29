import { useState } from 'react';
import './styles/index.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <h1 className='app-title'>ThoughtStream App</h1>
      <Routes>
        <Route path = "/" element={<Login/>} />
        <Route path = "/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App
