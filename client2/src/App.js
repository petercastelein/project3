/*
CSCE 315
Project 3
Team 14
11/08/22
 */

import React, {Fragment} from 'react';
import './App.css';



//components
import Customer from "./pages/customer/customer.js";
import addOrder from "./components/addOrder";
// import InputTodo from "./components/InputTodo";
// import ListTodos from "./components/ListTodos";

function App() {
  return (
  <Fragment>
    <div className="container">
      {/* <InputTodo /> */}
      {/* <div className="top-50 end-50">
        <ListTodos />
      </div> */}
      
      <Customer />
    </div>
  </Fragment>
  );
}

export default App;
