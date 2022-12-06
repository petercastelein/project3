/*
CSCE 315
Project 3
Team 14
11/08/22
 */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './App.css';



//components
import Customer from "./pages/customer/customer.js";
import Manager from "./pages/manager/manager.js";
import Cashier from "./pages/cashier/cashier.js";
import Landing from "./pages/landing/landing.js";
import NavBar from "./pages/navbar/navbar.js";

import Dummy from "./pages/manager/dummy_man";
import Dcash from "./pages/cashier/dcash";

function App() {
  
  return (
    

    
    <Router>
      {/* Navigation bar */}
      <NavBar/>
        <Routes>
            <Route path="customer" element={<Customer />} />
            <Route path="manager" element={<Manager />} />              
            <Route path="cashier" element={<Cashier />} />
            <Route path="/" element={<Landing />} /> 
            <Route path="dummy" element={<Dummy />} />   
            <Route path="dcash" element={<Dcash />} />         
        </Routes>
        
    </Router>
  );
}
export default App;
