/*
CSCE 315
Project 3
Team 14
11/08/22
 */

import React, { Fragment, useState } from "react";
import {url} from "./constvars.js";

const InputTodo = () => {

   const [description, setDescription] = useState("")

   const onSubmitForm = async e => {
      e.preventDefault(); /* dunno what this does, something about stopping refresh */
      try {
         const body = { description };
         console.log(url);
         const response = await fetch(url + "todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
         });

         window.location = "/";
      } catch (err) {
         console.error(err.message);
      }
   };

   return (
      <Fragment>
         <h1 className="text-center mt-5">Pern Todo List</h1>
         <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input 
               type="text"
               className="form-control"
               value={description}
               onChange={e => setDescription(e.target.value)}
            />
            <button className="btn btn-success">Add</button>
         </form>
      </Fragment>
   );
};

export default InputTodo;
