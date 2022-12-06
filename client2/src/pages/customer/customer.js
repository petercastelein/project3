
import React, {Fragment, useEffect, useState} from 'react';
import "./customer.css"
import {url} from "../../components/constvars.js";

// IMPORT IMAGES
import logo from '../../images/Panda-Express-Logo.jpeg';

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
                        <div className="menuItems w-100 h-75 row mx-auto"><img src={require('../../menu_item_img/' + (item.inventory_name).replace(/ /g, '_') + '.png')} alt="img" /></div>
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
