import React, {Fragment} from 'react';
import './App.css';



//components
import Customer from "./pages/customer/customer.js";
// import InputTodo from "./components/InputTodo";
// import ListTodos from "./components/ListTodos";

function App() {
  return (
  <Fragment>
    <div className="container">
      {/* <InputTodo />
      <ListTodos /> */}
      <Customer />
    </div>
  </Fragment>
  );
}

export default App;
