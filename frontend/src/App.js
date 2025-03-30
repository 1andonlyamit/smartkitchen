import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from "./components/login-signup/Login";
import Signup from "./components/login-signup/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      {/* <h1>Welcome to the React App</h1> */}
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      </div>
  );
}

export default App;
