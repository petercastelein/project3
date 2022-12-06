import "./manager.css"
import React, {Fragment, useEffect, useState} from 'react';

import {url} from "../../components/constvars.js";
import InvenItems from "../../components/InvenItems";

// image imports
import logo from '../../images/Panda-Express-Logo.jpeg';

export default function Manager(){
    const [menuItems, setMenuItems] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [orders, setOrders] = useState([]);

    {/* Displays menu items currently in order */}
    const getMenuItems = async () => {
        try {
            const response = await fetch(url + "getInventory");
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


    const getCurrEmployees = async () => {
        try {
            const response = await fetch(url + "getEmployees");
            const jsonData = await response.json();
            console.log(jsonData);
            setEmployees(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    useEffect(() => {
        getCurrEmployees();
    }, []);
    
    //console.log(menuItems);


    const getOrderHist = async () => {
        try {
            const response = await fetch(url + "getOrders");
            //const newDate = 
            const jsonData = await response.json();
            //console.log(jsonData);
            setOrders(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    useEffect(() => {
        getOrderHist();
    }, []);
    
    //console.log(menuItems);


  {/* Submit new Item to Database - NEED TO REPLACE: body with real order ticket */}
  const addInventoryItem = async e => {
    //e.preventDefault(); /* dunno what this does, something about stopping refresh */
    const event = new Date();
    const date = event.toISOString();
    try {
        //format: {"inventory_name": "kung pow strips", "inventory_quantity": 100, "price_per_quantity": "5.99", "is_menu_item": "True"}
        const body = {"inventory_name": orders.inventory_name, "inventory_quantity": orders.inventory_quantity, "price_per_quantity": orders.price_per_quantity, "is_menu_item": orders.is_menu_item}
        const newOrder = await fetch(url + "new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        //clear ticket and add success message here?
        window.location = "manager"; // refresh page i think?
    } catch (err) {
        console.error(err.message);
    }
};

    
    const updateInventoryItem = async (e, menuItem) => {
        e.preventDefault();
        try {
            //format: {"inventory_id": 35, "inventory_name": "apple chicken", "inventory_quantity": 99, "price_per_quantity": "10.75"};
          const body = {"inventory_id": menuItem.inventory_id, "inventory_name": menuItem.inventory_name, "inventory_quantity": menuItem.inventory_quantity, "price_per_quantity": menuItem.price_per_quantity};
          const response = await fetch(
            url + "updateInventory",
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            }
          );
    
          window.location = "/";
        } catch (err) {
          console.error(err.message);
        }
    };

    //console.log(menuItems);

    // const mostRecentDate = async () => {
    //     try {
    //         const response = await fetch(url + "getRecentDate");
    //         const jsonData = await response.json();
    //         console.log(jsonData);
    //         setOrders(jsonData);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // };
    
    // useEffect(() => {
    //     mostRecentDate();
    // }, []);
    
    // console.log(menuItems);

    //call back to update the table
    function onUpdateItem(updatedItem) {
      console.log(updatedItem);
      const updatedItems = menuItems.map(
        invenItem => {
          if (invenItem.inventory_id === updatedItem.inventory_id) {
            //console.log(updatedItem);
            return updatedItem
          } else {return invenItem}
        }
      )
      setMenuItems(updatedItems)
    }

    return(
        <Fragment>
            {/* Displays logo and header */}
            <div className="center text-black">
                <img src={logo} alt="logo" />
                <h1> Manager View </h1>
            </div>

            {/* Displays inventory status */}
            <div className="col-md-3 col-sm-3 col-xs-3" style = {{position: "absolute", marginTop: "15%", top: "0px", left: "0px", marginLeft: "3%"}}>
                <h1 className="employeeElements text-center">Inventory Status</h1>
                <div className="tableContainer">
                    <InvenItems
                        invenItems={menuItems.sort((a, b) => a.inventory_id - b.inventory_id)}
                        onUpdateItem={onUpdateItem}
                     />
                </div>
            </div>
            
            {/* Displays employee roster */}
            <div className="col-md-3 col-sm-3 col-xs-3" style = {{position: "absolute", marginTop: "15%", top: "0px", right: "0px", marginRight: "3%",}}>
                <h1 className="employeeElements text-center">Employee Roster</h1>
                <div className="tableContainer">
                    <table className="table employeeElements" id="test1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Wage</th>
                                <th>Hours</th>
                                <th>Manager</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => {
                                return(
                                    <tr>
                                        <td>{employee.employee_id}</td>
                                        <td>{employee.first_name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.wage}</td>
                                        <td>{employee.hours}</td>
                                        <td>{employee.is_manager}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Displays order history */}
            <div div className="col-md-3 col-sm-3 col-xs-3 text-center table-fixed" style = {{position: "absolute", marginTop: "15%", top: "0px", left: "0px", marginLeft: "37.5%",}}>
                <h1 className="employeeElements">Order History</h1>  
                <div className="tableContainer">
                    <table className="table employeeElements" id="test1">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Purchase Date</th>
                                <th>Employee ID</th>
                                <th>Inventory IDs</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, newDate) => {
                                //const recentDate = orders[newDate];
                                return(
                                    <tr>
                                        <td>{order.order_id}</td>
                                        <td>{order.purchase_date.substring(0,10)}</td>
                                        <td>{order.employee_id}</td>
                                        <td>{order.inventory_id_array}</td>
                                        <td>{parseFloat(order.total_price).toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Submit restock order */}
            <div div className="col-md-3 col-sm-3 col-xs-3 text-center" style = {{position: "absolute", marginBottom: "-10%", bottom: "0px", left: "0px", marginLeft: "35%",}}>
                <h1 className="employeeElements">Submit Restock Order</h1>
                <form onSubmit={addInventoryItem}>
                    <div class="field">
                        <label for="name">Name:</label>
                        <input type="text" id="name" value={orders.inventory_name} placeholder="Beyond Orange Chicken" />
                    </div>

                    <div class="field">
                        <label for="quantity">Quantity:</label>
                        <input type="text" id="quantity" value={orders.inventory_quantity} placeholder="25" />
                    </div>

                    <div class="field">
                        <label for="pricePerQuantity">Price per Quantity:</label>
                        <input type="text" id="pricePerQuantity" value={orders.price_per_quantity} placeholder="5.50" />
                    </div>

                    <div class="field">
                        <label for="isItem">Is Menu Item:</label>
                        <input type="text" id="isItem" value={orders.is_menu_item} placeholder="true" />
                    </div>
                    
                    <button className="btn btn-success btn-lg" type="submit">Submit Order</button>
                </form>
            </div> 
        </Fragment>
    );
}