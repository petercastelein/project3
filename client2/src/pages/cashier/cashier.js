
import React, {Fragment, useEffect, useState} from 'react';

import "../customer/customer.css"
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


export default function Cashier(){
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState([]);
    //const [description, setDescription] = useState("");

    {/* Adds selected menu item to order */}
    const addItem =  async (e, itemName, itemPrice) =>{
        e.preventDefault();
        try {
            const body = { itemName };
            console.log(url);
            // const response = await fetch(url + "items", {
            // method: "POST",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(body)
            // });
            // console.log(response)

            // Adding an item to the order
            let newitems = [...items];
            newitems.push(itemName);
            setItems(newitems);

            // Adding the price to the order
            let newPrices = [...price];
            newPrices.push(itemPrice);
            // const index = newPrices.indexOf(itemPrice);
            // newPrices.splice(-1, 0, itemPrice);
            setPrice(newPrices);

            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    // const args = [];
    const sum = async(args)=>{
        let sum = 0;
        for (let i = 0; i < args.length; i++){
            sum += args[i];
        }
        return sum;
    };

    const updateTotal = async(args)=>{
        (args.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2)
    };

    {/* Adds selected menu item to order */}
    const removeItem =  async (e, itemName) =>{ 
        e.preventDefault();
        try {
            const body = { itemName }; {/* itemName */}
            console.log(url);
            // const response = await fetch(url + "items", {
            // method: "POST",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(body)
            // });
            // console.log(response)
            let newitems = [...items];
            const index = newitems.indexOf(itemName);
            newitems.splice(index, 1);
            setItems(newitems);

            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    {/* Displays menu items currently in order */}
    const getItems = async () => {
        try {
            const response = await fetch(url + "items");
            const jsonData = await response.json();
      
            setItems(jsonData);
          } catch (err) {
            console.error(err.message);
          }
    };

    useEffect(() => {
        getItems();
    }, []);

    console.log(items);

    {/* Removes item from order */}
    const deleteTodo = async id => {
        try {
        const deleteTodo = await fetch(url + `items/${id}`, {
            method: "DELETE"
        });

        setItems(items.filter(todo => todo.todo_id !== id));
        } catch (err) {
        console.error(err.message);
        }
    };

    return(
        <Fragment>
            {/* Restaurant name and logo */}
            <div className="center">
                <img src={logo} alt="logo" />
                <h1> Cashier View </h1>
            </div>
            
            {/* Menu Items */}
            <div className="menu">
                {/* ADD MENU ITEM IMAGES URL IN SRC, ITEM NAMES IN ALT */}
                    {/* Appetizers */}
                    <div className="menuItems text-center">
                        <img src={ChickenEggRoll} alt="Chicken Egg Roll" />
                        <h2>$5.50</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Chicken Egg Roll', 5.50);
                        }}>Chicken Egg Roll</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={VegetableEggRoll} alt="Vegetable Egg Roll" />
                        <h2>$5.50</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Vegetable Egg Roll', 5.50);
                        }}>Vegetable Egg Roll</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={CreamCheeseRangoon} alt="Cream Cheese Rangoon" />
                        <h2>$5.50</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Cream Cheese Rangoon', 2.35);
                        }}>Cream Cheese Rangoon</button>
                    </div>

                    {/* Premium Entrees */}
                    <div className="menuItems text-center">
                        <img src={BlackPepperAngus} alt="Black Pepper Angus" />
                        <h2>$6.15</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Black Pepper Angus', 6.15);
                        }}>Black Pepper Angus</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={BeyondOrangeChicken} alt="Beyond Orange Chicken" />
                        <h2>$6.15</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Beyond Orange Chicken', 6.15);
                        }}>Beyond Orange Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={HoneyWalnutShrimp} alt="Honey Walnut Shrimp" />
                        <h2>$6.15</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Honey Walnut Shrimp', 6.15);
                        }}>Honey Walnut Shrimp</button>
                    </div>

                     {/* Regular Entrees */}

                    <div className="menuItems text-center">

                        <img src={BeijingBeef} alt="Beijing Beef" />
                        <h2>$4.90</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Beijing Beef', 4.90);
                        }}>Beijing Beef</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={BlackPepperChicken} alt="Black Pepper Chicken" />
                        <h2>$4.90</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Black Pepper Chicken', 4.90);
                        }}>Black Pepper Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={BroccoliBeef} alt="Broccoli Beef" />
                        <h2>$4.90</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Broccoli Beef', 4.90);
                        }}>Broccoli Beef</button>
                    </div>
                    
                    <div className="menuItems text-center">
                        <img src={HoneySesameChicken} alt="Honey Sesame Chicken" />
                        <h2>$4.90</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Honey Sesame Chicken', 4.90);
                        }}>Honey Sesame Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={KungPaoChicken} alt="Kung Pao Chicken" />
                        <h2>$4.90</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Kung Pao Chicken', 4.90);
                        }}>Kung Pao Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={MushroomChicken} alt="Mushroom Chicken" />
                        <h2>$4.90</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Mushroom Chicken', 4.90);
                        }}>Mushroom Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={OrangeChicken} alt="Orange Chicken" />
                        <h2>$4.90</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Orange Chicken', 4.90);
                        }}>Orange Chicken</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={StringbeanChicken} alt="Stringbean Chicken" />
                        <h2>$4.90</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Stringbean Chicken', 4.90);
                        }}>Stringbean Chicken</button>
                        
                    </div>

                    <div className="menuItems text-center">
                        <img src={SweetfireChicken} alt="Sweetfire Chicken" />
                        <h2>$4.90</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Sweetfire Chicken', 4.90);
                        }}>Sweetfire Chicken</button>
                    </div>                

                    {/* Sides */}

                    <div className="menuItems text-center">
                        <img src={ChowMein} alt="Chow Mein" />
                        <h2>$4.40</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Chow Mein', 4.40);
                        }}>Chow Mein</button>
                    </div>      

                    <div className="menuItems text-center">
                        <img src={FriedRice} alt="Fried Rice" />
                        <h2>$4.40</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Fried Rice', 4.40);
                        }}>Fried Rice</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={WhiteRice} alt="White Rice" />
                        <h2>$4.40</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'White Rice', 4.40);
                        }}>White Rice</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={BrownRice} alt="Brown Rice" />
                        <h2>$4.40</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Brown Rice', 4.40);
                        }}>Brown Rice</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={Supergreens} alt="Supergreens" />
                        <h2>$4.40</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Supergreens', 4.40);
                        }}>Supergreens</button>
                    </div>

                    {/* Desserts and Drinks */}

                    <div className="menuItems text-center">
                        <img src={FortuneCookie} alt="Fortune Cookie" />
                        <h2>$0.50</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Fortune Cookie', .50);
                        }}>Fortune Cookie</button>
                    </div>

                    <div className="menuItems text-center">
                        <img src={FountainDrink} alt="Fountain Drink" />
                        <h2>$2.10</h2>
                        <button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                            addItem(e, 'Fountain Drink', 2.10);
                        }}>Fountain Drink</button>
                    </div>

                    
            </div>

            {/* Customer Order */}
            <div className="order text-center">
                    <h1>Current Order</h1>
                    <table className="table mt-5 text-center">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => {
                                const priceVal = price[index];
                                return(
                                    <tr>
                                        {/* Displays menu item name */}
                                        <td><h1>{item}</h1></td>

                                        {/* Displays menu item price */}
                                        <td><h2>{"$" + priceVal}</h2></td>

                                        {/* Displays remove button */}
                                        <td><button className="btn btn-danger btn-lg" onClick={(e) => removeItem(e, item)}>Remove</button></td>
                                    
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div>
                        <h3 className="text-left">Order Total</h3>

                        {/* Sum of the price array (displays total price) */}
                        <h3 className="text-right">{"$" + (price.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2)}</h3>
                    </div>

                    <button className="btn btn-success btn-lg">Submit Order</button>
            </div>
        </Fragment>
    );
}
