
import React, {Fragment, useEffect, useState, useRef, useDebugValue} from 'react';

import "../customer/customer.css"
import {url} from "../../components/constvars.js";

// IMPORT IMAGES
import logo from '../../images/Panda-Express-Logo.jpeg';
// import BeijingBeef from '../../menu_item_img/bejing_beef.png';
// import BeyondOrangeChicken from '../../menu_item_img/beyond_orange_chicken.png';
// import BlackPepperAngus from '../../menu_item_img/black_pepper_angus.png';
// import BlackPepperChicken from '../../menu_item_img/black_pepper_chicken.png';
// import BroccoliBeef from '../../menu_item_img/broccoli_beef.png';
// import BrownRice from '../../menu_item_img/brown_rice.png';
// import ChickenEggRoll from '../../menu_item_img/chicken_egg_roll.png';
// import ChowMein from '../../menu_item_img/chow_mein.png';
// import CreamCheeseRangoon from '../../menu_item_img/cream_cheese_rangoon.png';
// import FortuneCookie from '../../menu_item_img/fortune_cookie.png';
// import FountainDrink from '../../menu_item_img/fountain_drink.png';
// import FriedRice from '../../menu_item_img/fried_rice.png';
// import HoneySesameChicken from '../../menu_item_img/honey_sesame_chicken.png';
// import HoneyWalnutShrimp from '../../menu_item_img/honey_walnut_shrimp.png';
// import KungPaoChicken from '../../menu_item_img/kung_pao_chicken.png';
// import MushroomChicken from '../../menu_item_img/mushroom_chicken.png';
// import OrangeChicken from '../../menu_item_img/orange_chicken.png';
// import StringbeanChicken from '../../menu_item_img/stringbean_chicken.png';
// import Supergreens from '../../menu_item_img/supergreens.png';
// import SweetfireChicken from '../../menu_item_img/sweetfire_chicken.png';
// import VegetableEggRoll from '../../menu_item_img/veg_egg_roll.png';
// import WhiteRice from '../../menu_item_img/white_rice.png';


export default function Dcash(){
    const [ticket, setTicket] = useState([]);
    const [ticketTotal, setTotal] = useState(0.0);
    const [menuItems, setMenuItems] = useState([]);

    {/* Displays menu items currently in order */}
    const getMenuItems = async () => {
        try {
            const response = await fetch(url + "menu");
            const jsonData = await response.json();
            //console.log(jsonData);
            setMenuItems(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    useEffect(() => {
        getMenuItems();
    }, []);
    
    //console.log(menuItems);

    //call back to update the table
    function addToTicket(itemId, itemName, itemPrice) {
      let updatedTicket = ticket.map((x) => x);
      let found = false;
      if(updatedTicket.length != 0) {
         for (const idx in updatedTicket) {
            if (updatedTicket[idx].id === itemId) {
               //console.log(updatedItem);
               updatedTicket[idx].quantity = updatedTicket[idx].quantity + 1;
               found = true;
            } 
         } 
         if (!found) {
            updatedTicket.push({"id": itemId, "name": itemName, "quantity": 1, "price": itemPrice});
         } 
      }
      else {
         updatedTicket.push({"id": itemId, "name": itemName, "quantity": 1, "price": itemPrice});
      } 
      //console.log(updatedTicket);
      let total = 0.0;
      for (const idx in updatedTicket) {
         total = total + updatedTicket[idx].quantity * parseFloat(updatedTicket[idx].price);
      }
      setTicket(updatedTicket)
      setTotal(total)
    }

    {/* Adds selected menu item to order */}
    function incrementTicket(ticketItem, amount) { 
      //console.log(ticketItem)
      let updateTicket = [...ticket];
      const index = updateTicket.indexOf(ticketItem);
      let nextAmount = updateTicket[index].quantity + amount;
      if (nextAmount === 0) {
         updateTicket.splice(index, 1);
      }
      else {
         updateTicket[index].quantity = nextAmount;
      }

      //console.log(updateTicket)
      let total = 0.0;
      for (const idx in updateTicket) {
         total = total + updateTicket[idx].quantity * parseFloat(updateTicket[idx].price);
      }
      setTicket(updateTicket);
      setTotal(total);
  };

      {/* Adds selected menu item to order */}
      function removeFromTicket(ticketItem) { 
         //console.log(ticketItem)
         let updateTicket = [...ticket];
         const index = updateTicket.indexOf(ticketItem);
         updateTicket.splice(index, 1);
         //console.log(updateTicket)
         let total = 0.0;
         for (const idx in updateTicket) {
            total = total + updateTicket[idx].quantity * parseFloat(updateTicket[idx].price);
         }
         setTicket(updateTicket);
         setTotal(total);
     };


        {/* Submits Order Ticket to backend - NEED TO REPLACE: body with real order ticket*/}
        const submitOrder = async e => {
            //e.preventDefault(); /* dunno what this does, something about stopping refresh */
            const event = new Date();
            const date = event.toISOString();
            let invenArray = [];
            for (const idx in ticket) {
               for (let i = 0; i < ticket[idx].quantity; i++) {
                  invenArray.push(ticket[idx].id);
               }
            }
            try {
                //format: {"purchase_date": "12/2/22", "employee_id": 1, "inventory_id_array": [1,2,3], "total_price": "15.75"}
                const body = {"purchase_date": date, "employee_id": 1, "inventory_id_array": invenArray, "total_price": ticketTotal};
                console.log(body);
                const newOrder = await fetch(url + "order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                //clear ticket and add success message here?
                //window.location = "/"; // refresh page i think?
                setTicket([]);
                setTotal(0);
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
            
            {/* Menu */}
            <div div className="col-md-3 col-sm-3 col-xs-3 text-center table-fixed" style = {{position: "absolute", marginTop: "15%", top: "0px", left: "0px", marginLeft: "15%",}}>
                <h1 className="employeeElements">Menu</h1>  
                <div className="tableContainer">
                    <table className="table employeeElements" id="test1">
                        <thead>
                            <tr>
                                {/* <th>Image</th> */}
                                <th>ID</th>
                                <th>Item</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuItems.sort((a, b) => a.inventory_id - b.inventory_id)
                                       .map((item) => {
                                //const recentDate = orders[newDate];
                                return(
                                    <tr>
                                        <td>{item.inventory_id}</td>
                                        <td>{item.inventory_name}</td>
                                        <td>{item.price_per_quantity.substring(0,10)}</td>
                                        <th><button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                                        addToTicket(item.inventory_id, item.inventory_name, item.price_per_quantity);
                                        }}>Add to Order</button></th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
                                <th>Quantity</th>
                                <th></th>
                                <th>Remove</th>
                                <th></th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {ticket?.map((item) => {
                                return(
                                    <tr>
                                        {/* Displays menu item name */}
                                        <td><h1>{item.name}</h1></td>

                                        {/* Displays menu item price */}
                                        <td><h2>{"$" + item.price}</h2></td>

                                        <td><h2>{"x" + item.quantity}</h2></td>
                                       
                                        <td><button className='btn btn-dark btn-large' onClick={(e) => {incrementTicket(item, 1)}}>+</button></td>

                                        <td><button className='btn btn-dark btn-large' onClick={(e) => {incrementTicket(item, -1)}}>-</button></td>

                                        {/* Displays remove button */}
                                        <td><button className="btn btn-danger btn-lg" onClick={(e) => {
                                            removeFromTicket(item);
                                            //reset();
                                        }}
                                        >Remove</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><h3 className="text-left">Order Total:</h3></td>
                                <td><h3 className="text-left">{(ticketTotal).toFixed(2)}</h3></td>
                            </tr>
                            
                            {/* Sum of the price array (displays total price) */}
                            {/* <h3 className="text-right">{"$" + (price.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2)}</h3> */}
                        </tfoot>
                    </table>
                    <button className="btn btn-success btn-lg"
                    onClick={(e) => {
                        submitOrder(e);
                        //(price.reduce((partialSum, a) => partialSum + a, -priceVal)).toFixed(2);
                    }}
                    >Submit Order</button>
            </div>
        </Fragment>
    );
}
