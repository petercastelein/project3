import React, {Fragment, useEffect, useState} from 'react';

import "./customer.css"
import {url} from "../../components/constvars.js";

// IMPORT IMAGES
import logo from '../../images/Panda-Express-Logo.jpeg';
import BeijingBeef from '../../images/beijing-beef.jpeg';


export default function Customer(){
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState("");

    {/* Adds selected menu item to order */}
    const addItem = (itemName) => async e =>{
        e.preventDefault(); /* dunno what this does, something about stopping refresh */
        try {
            const body = { itemName };
            console.log(url);
            const response = fetch(url + "todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    {/* Displays menu items currently in order */}
    const getItems = async () =>{
        try {
            const response = await fetch(url + "todos");
            const jsonData = await response.json();
      
            setTodos(jsonData);
          } catch (err) {
            console.error(err.message);
          }
    }

    useEffect(() => {
        getItems();
    });

    {/* Removes item from order */}
    const deleteTodo = async id => {
        try {
        const deleteTodo = await fetch(url + `todos/${id}`, {
            method: "DELETE"
        });

        setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
        console.error(err.message);
        }
    };

    return(
        <Fragment>
            {/* Restaurant name and logo */}
            <div className="center">
                <img src={logo} alt="logo" />
                <h1> Panda Express </h1>
            </div>
            
            {/* Menu Items */}
            <div className="menu">
                {/* ADD MENU ITEM IMAGES URL IN SRC, ITEM NAMES IN ALT */}
                    <div className="menuItems">
                        <img src={BeijingBeef} alt="Beijing Beef" />
                        <button onClick={() => {
                            addItem('Beijing Beef');
                        }}>Beijing Beef</button>
                    </div>
                    <div className="menuItems">
                        <img src={BeijingBeef} alt="Test1" />

                    </div>
                    <div className="menuItems">
                        <img src={BeijingBeef} alt="Test2" />

                    </div>
                    <div className="menuItems">
                        <img src={BeijingBeef} alt="Test3" />

                    </div>
                    <div className="menuItems">
                        <img src={BeijingBeef} alt="Test4" />

                    </div>
                    <div className="menuItems">
                        <img src={BeijingBeef} alt="Test5" />

                    </div>
            </div>

            {/* Customer Order */}
            <div className="order">
                <div className="orderItems">
                    <h1>Your Order</h1>
                    <table className="table mt-5 text-center">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map(todo => (
                                <tr key={todo.todo_id}>
                                    <td>{todo.description}</td>
                                    <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}