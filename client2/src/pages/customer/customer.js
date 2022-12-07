
import React, {Fragment, useEffect, useState} from 'react';
import "./customer.css"
import {url} from "../../components/constvars.js";

// IMPORT IMAGES
import logo from '../../images/Panda-Express-Logo.jpeg';

import Bejing_Beef from '../../menu_item_img/Bejing_Beef.png';
import Beyond_Orange_Chicken from '../../menu_item_img/Beyond_Orange_Chicken.png';
import Black_Pepper_Angus from '../../menu_item_img/Black_Pepper_Angus.png';
import Black_Pepper_Chicken from '../../menu_item_img/Black_Pepper_Chicken.png';
import Broccoli_Beef from '../../menu_item_img/Broccoli_Beef.png';
import Brown_Rice from '../../menu_item_img/Brown_Rice.png';
import Chicken_Egg_Roll from '../../menu_item_img/Chicken_Egg_Roll.png';
import Chow_Mein from '../../menu_item_img/Chow_Mein.png';
import Cream_Cheese_Rangoon from '../../menu_item_img/Cream_Cheese_Rangoon.png';
import Fortune_Cookie from '../../menu_item_img/Fortune_Cookie.png';
import Fountain_Drink from '../../menu_item_img/Fountain_Drink.png';
import Fried_Rice from '../../menu_item_img/Fried_Rice.png';
import Honey_Sesame_Chicken from '../../menu_item_img/Honey_Sesame_Chicken.png';
import Honey_Walnut_Shrimp from '../../menu_item_img/Honey_Walnut_Shrimp.png';
import Kung_Pao_Chicken from '../../menu_item_img/Kung_Pao_Chicken.png';
import Mushroom_Chicken from '../../menu_item_img/Mushroom_Chicken.png';
import Original_Orange_Chicken from '../../menu_item_img/Original_Orange_Chicken.png';
import String_Bean_Chicken_Breast from '../../menu_item_img/String_Bean_Chicken_Breast.png';
import Super_Green from '../../menu_item_img/Super_Green.png';
import Sweet_Chicken_Breast from '../../menu_item_img/Sweet_Chicken_Breast.png';
import Veggie_Egg_Roll from '../../menu_item_img/Veggie_Egg_Roll.png';
import White_Rice from '../../menu_item_img/White_Rice.png';
import Teriyaki_Chicken from '../../menu_item_img/Teriyaki_Chicken.png';

export default function Customer(){
    const [label, setLabel] = useState("Your Order"); 
    const [ticket, setTicket] = useState([]);
    const [ticketTotal, setTotal] = useState(0.0);
    const [menuItems, setMenuItems] = useState([]);

    document.getElementById("google_translate").hidden = true;

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

    const varToString = varObj => Object.keys(varObj)[0]

    var nameMap = [];
    var displayName = varToString({ Bejing_Beef });
    nameMap[displayName] = Bejing_Beef;
    nameMap[varToString({ Beyond_Orange_Chicken })] = Beyond_Orange_Chicken;
    nameMap[varToString({ Black_Pepper_Angus })] = Black_Pepper_Angus;
    nameMap[varToString({ Black_Pepper_Chicken })] = Black_Pepper_Chicken;
    nameMap[varToString({ Broccoli_Beef })] = Broccoli_Beef;
    nameMap[varToString({ Brown_Rice })] = Brown_Rice;
    nameMap[varToString({ Chicken_Egg_Roll })] = Chicken_Egg_Roll;
    nameMap[varToString({ Chow_Mein })] = Chow_Mein;
    nameMap[varToString({ Cream_Cheese_Rangoon })] = Cream_Cheese_Rangoon;
    nameMap[varToString({ Fortune_Cookie })] = Fortune_Cookie;
    nameMap[varToString({ Fried_Rice })] = Fried_Rice;
    nameMap[varToString({ Fountain_Drink })] = Fountain_Drink;
    nameMap[varToString({ Honey_Sesame_Chicken })] = Honey_Sesame_Chicken;
    nameMap[varToString({ Honey_Walnut_Shrimp })] = Honey_Walnut_Shrimp;
    nameMap[varToString({ Kung_Pao_Chicken })] = Kung_Pao_Chicken;
    nameMap[varToString({ Mushroom_Chicken })] = Mushroom_Chicken;
    nameMap[varToString({ Original_Orange_Chicken })] = Original_Orange_Chicken;
    nameMap[varToString({ String_Bean_Chicken_Breast })] = String_Bean_Chicken_Breast;
    nameMap[varToString({ Super_Green })] = Super_Green;
    nameMap[varToString({ Sweet_Chicken_Breast })] = Sweet_Chicken_Breast;
    nameMap[varToString({ Veggie_Egg_Roll })] = Veggie_Egg_Roll;
    nameMap[varToString({ White_Rice })] = White_Rice;
    nameMap[varToString({ Teriyaki_Chicken })] = Teriyaki_Chicken;
    
    console.log(nameMap);
    
    //console.log(menuItems);

    //call back to update the table
    function addToTicket(itemId, itemName, itemPrice) {
      setLabel("Your Order");
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
                setLabel("Order Placed!");
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
           
            <div className="menu text-center">
                {menuItems
                .filter(
                    (item) => item.inventory_id < 23
                
                ).sort((a, b) => a.inventory_id - b.inventory_id)
                .map((item) => (
                    <div className="menuItems">
                        <div className="menuItems w-100 h-75 row mx-auto"><img src={nameMap[item.inventory_name.replace(/ /g,'_')]} alt="img"/> </div>
                        <div className="text-center h3">{item.inventory_name}</div>
                        <div className="text-center h4">{item.price_per_quantity.substring(0,10)}</div>
                        <div><button className="btn btn-dark btn-lg" type="submit" onClick={(e) => {
                        addToTicket(item.inventory_id, item.inventory_name, item.price_per_quantity);
                        }}>Add to Order</button></div>
                    </div>
                ))}
            </div>

            {/* Customer Order */}
            <div className="order text-center">
                    <h1>{label}</h1>
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
                                        >
                                        Remove</button></td>
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
