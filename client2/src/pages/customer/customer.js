
import React, {Fragment, useEffect, useState} from 'react';

import "./customer.css"
import {url} from "../../components/constvars.js";

// IMPORT IMAGES
import logo from '../../images/Panda-Express-Logo.jpeg';
import BeijingBeef from '../../menu_item_img/bejing_beef.png';
import BeyondOrangeChicken from '../../menu_item_img/beyond_orange_chicken.png';
import BlackPepperAngus from '../../menu_item_img/black_pepper_angus.png';
import BlackPepperChicken from '../../menu_item_img/black_pepper_chicken.png';
import BroccoliBeef from '../../menu_item_img/broccoli_beef.png';
import BrownRice from '../../menu_item_img/brown_rice.png';
import ChickenEggRoll from '../../menu_item_img/chicken_egg_roll.png';
import ChowMein from '../../menu_item_img/chow_mein.png';
import CreamCheeseRangoon from '../../menu_item_img/cream_cheese_rangoon.png';
import FortuneCookie from '../../menu_item_img/fortune_cookie.png';
import FountainDrink from '../../menu_item_img/fountain_drink.png';
import FriedRice from '../../menu_item_img/fried_rice.png';
import HoneySesameChicken from '../../menu_item_img/honey_sesame_chicken.png';
import HoneyWalnutShrimp from '../../menu_item_img/honey_walnut_shrimp.png';
import KungPaoChicken from '../../menu_item_img/kung_pao_chicken.png';
import MushroomChicken from '../../menu_item_img/mushroom_chicken.png';
import OrangeChicken from '../../menu_item_img/orange_chicken.png';
import StringbeanChicken from '../../menu_item_img/stringbean_chicken.png';
import Supergreens from '../../menu_item_img/supergreens.png';
import SweetfireChicken from '../../menu_item_img/sweetfire_chicken.png';
import VegetableEggRoll from '../../menu_item_img/veg_egg_roll.png';
import WhiteRice from '../../menu_item_img/white_rice.png';


export default function Customer(){
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState("");

    {/* Adds selected menu item to order */}
    const addItem =  async (e, itemName) =>{ {/* (itemName) => */}
        e.preventDefault(); /* dunno what this does, something about stopping refresh */
        try {
            const body = { itemName }; {/* itemName */}
            console.log(url);
            // const response = await fetch(url + "todos", {
            // method: "POST",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(body)
            // });
            // console.log(response)
            let newTodos = [...todos];
            newTodos.push(itemName);
            setTodos(newTodos);

            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    {/* Adds selected menu item to order */}
    const removeItem =  async (e, itemName) =>{ {/* (itemName) => */}
        e.preventDefault(); /* dunno what this does, something about stopping refresh */
        try {
            const body = { itemName }; {/* itemName */}
            console.log(url);
            // const response = await fetch(url + "todos", {
            // method: "POST",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(body)
            // });
            // console.log(response)
            let newTodos = [...todos];
            const index = newTodos.indexOf(itemName);
            newTodos.splice(index, 1);
            setTodos(newTodos);

            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    {/* Displays menu items currently in order */}
    const getItems = async () => {
        try {
            const response = await fetch(url + "todos");
            const jsonData = await response.json();
      
            setTodos(jsonData);
          } catch (err) {
            console.error(err.message);
          }
    };

    useEffect(() => {
        getItems();
    }, []);

    console.log(todos);

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
                    {/* Appetizers */}
                    <div className="menuItems text-center">
                        <img src={ChickenEggRoll} alt="Chicken Egg Roll" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Chicken Egg Roll');
                        }}>Chicken Egg Roll</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={VegetableEggRoll} alt="Vegetable Egg Roll" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Vegetable Egg Roll');
                        }}>Vegetable Egg Roll</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={CreamCheeseRangoon} alt="Cream Cheese Rangoon" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Cream Cheese Rangoon');
                        }}>Cream Cheese Rangoon</button>
                    </div>

                    {/* Premium Entrees */}
                    <div className="menuItems text-center">
                        <img src={BlackPepperAngus} alt="Black Pepper Angus" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Black Pepper Angus');
                        }}>Black Pepper Angus</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={BeyondOrangeChicken} alt="Beyond Orange Chicken" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Beyond Orange Chicken');
                        }}>Beyond Orange Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={HoneyWalnutShrimp} alt="Honey Walnut Shrimp" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Honey Walnut Shrimp');
                        }}>Honey Walnut Shrimp</button>
                    </div>

                     {/* Regular Entrees */}

                    <div className="menuItems text-center">

                        <img src={BeijingBeef} alt="Beijing Beef" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Beijing Beef');
                        }}>Beijing Beef</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={BlackPepperChicken} alt="Black Pepper Chicken" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Black Pepper Chicken');
                        }}>Black Pepper Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={BroccoliBeef} alt="Broccoli Beef" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Broccoli Beef');
                        }}>Broccoli Beef</button>
                    </div>
                    
                    <div className="menuItems text-center">
                        <img src={HoneySesameChicken} alt="Honey Sesame Chicken" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Honey Sesame Chicken');
                        }}>Honey Sesame Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={KungPaoChicken} alt="Kung Pao Chicken" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Kung Pao Chicken');
                        }}>Kung Pao Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={MushroomChicken} alt="Mushroom Chicken" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Mushroom Chicken');
                        }}>Mushroom Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={OrangeChicken} alt="Orange Chicken" />
                        <button className="btn btn-dark" type="submit" onClick={() => {
                            addItem('Orange Chicken');
                        }}>Orange Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={StringbeanChicken} alt="Stringbean Chicken" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Stringbean Chicken');
                        }}>Stringbean Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={SweetfireChicken} alt="Sweetfire Chicken" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Sweetfire Chicken');
                        }}>Sweetfire Chicken</button>
                    </div>                

                    {/* Sides */}

                    <div className="menuItems text-center">
                        <img src={ChowMein} alt="Chow Mein" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Chow Mein');
                        }}>Chow Mein</button>
                    </div>      

                    <div className="menuItems text-center">
                        <img src={FriedRice} alt="Fried Rice" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Fried Rice');
                        }}>Fried Rice</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={WhiteRice} alt="White Rice" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'White Rice');
                        }}>White Rice</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={BrownRice} alt="Brown Rice" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Brown Rice');
                        }}>Brown Rice</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={Supergreens} alt="Supergreens" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Supergreens');
                        }}>Supergreens</button>
                    </div>

                    {/* Desserts and Drinks */}

                    <div className="menuItems text-center">
                        <img src={FortuneCookie} alt="Fortune Cookie" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Fortune Cookie');
                        }}>Fortune Cookie</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={FountainDrink} alt="Fountain Drink" />
                        <button className="btn btn-dark" type="submit" onClick={(e) => {
                            addItem(e, 'Fountain Drink');
                        }}>Fountain Drink</button>
                    </div>

                    
            </div>

            {/* Customer Order */}
            <div className="order text-center">
                    <h1>Your Order</h1>
                    <table className="table mt-5 text-center">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo) => {
                                return(
                                    <tr>
                                        <td><h1>{todo}</h1></td>
                                        <td><button className="btn btn-danger" onClick={(e) => removeItem(e, todo)}>Remove</button></td>
                                    {/* // <tr key={todo.todo_id}>
                                    //     <td>{todo.description}</td>
                                    //     <td><button className="btn btn-danger" onClick={(e) => deleteTodo(e.todo.todo_id)}>Remove</button></td>
                                    // </tr> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            </div>
        </Fragment>
    );
}
