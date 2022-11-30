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
import NavBar from "./pages/navbar/navbar.js";


function App() {
  
  return (
    

    
    <Router>
      {/* Navigation bar */}
      <NavBar/>
        <Routes>
            <Route path="/" element={<Customer />} />
            <Route path="manager" element={<Manager />} />              
            <Route path="cashier" element={<Cashier />} />              
        </Routes>
        
    </Router>
  );
}
/*
  <Fragment>
    <div className="container">

        <ListTodos />
      
        <Customer />
    </div>
  </Fragment>
*/
export default App;
