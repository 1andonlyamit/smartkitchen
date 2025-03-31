import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Login from "./components/login-signup/Login";
import Signup from "./components/login-signup/Signup";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Recepies from "./pages/Recepies";
import Inventory from "./pages/Inventory";
import Forecasting from "./pages/Forecasting";
import Analytics from "./pages/Analytics";
import Fridge from "./pages/Fridge";

function App() {
  return (
    <div className="App">
      {/* <h1>Welcome to the React App</h1> */}
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/recepies" element={<Recepies/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/forecasting" element={<Forecasting/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/fridge" element={<Fridge/>}/>
      </Routes>
      </div>
  );
}

export default App;
