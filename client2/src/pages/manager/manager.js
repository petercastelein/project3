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
    const [itemForm, setItemForm] = useState({
        inventory_name: "",
        inventory_quantity: "",
        price_per_quantity: "",
        is_menu_item: "True"
      })
    

    /** Displays menu items currently in order
     * 
     * 
     */
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
    
    /** Uses a state to fetch the employees currently in the database
     * 
     * 
     */
    document.getElementById("google_translate").hidden = true;
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

    /** Displays the previous orders that have been recorded in the database
     * 
     * 
     */
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



    /**
     * function to add an item to the inventory
     * 
    */
  const addInventoryItem = async e => {
    //e.preventDefault(); /* dunno what this does, something about stopping refresh */
    try {
        //format: {"inventory_name": "kung pow strips", "inventory_quantity": 100, "price_per_quantity": "5.99", "is_menu_item": "True"}
        //console.log(itemForm);
        const body = {"inventory_name": itemForm.inventory_name, "inventory_quantity": itemForm.inventory_quantity, "price_per_quantity": itemForm.price_per_quantity, "is_menu_item": itemForm.is_menu_item}
        const newOrder = await fetch(url + "newInventory", {
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

    /**
     * capture user input in edit form inputs
     * @param   e  
     * 
     */
    function handleFormChange(e) {
        //console.log("here");
        setItemForm({
        ...itemForm,
        [e.target.name]: e.target.value
        })
        //console.log(itemForm);
    }   

    /**
     * updates an
     * @param   {string} updatedItem  the name of the item to be updated
     * 
     * @return  {string} invenItem    the value that the item's been updated to
     */
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
            <div className="row">
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
                <div className="col-md-3 col-sm-3 col-xs-3 text-center table-fixed" style = {{position: "absolute", marginTop: "15%", top: "0px", left: "0px", marginLeft: "37.5%",}}>
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
            </div>

            {/* Submit restock order */}
            <div className="row">
                <div div className="col-md-3 col-sm-3 col-xs-3 text-center" style = {{position: "absolute", marginBottom: "-20%", bottom: "0px", left: "0px", marginLeft: "35%",}}>
                    <h1 className="employeeElements">Add New Item</h1>
                    <form onSubmit={addInventoryItem}>
                        <div class="field">
                            <label for="name">Name:</label>
                            <input type="text" name="inventory_name" value={itemForm.inventory_name} placeholder="Beyond Orange Chicken" onChange={handleFormChange}/>
                        </div>

                        <div class="field">
                            <label for="quantity">Quantity:</label>
                            <input type="text" name="inventory_quantity" value={itemForm.inventory_quantity} placeholder="500" onChange={handleFormChange}/>
                        </div>

                        <div class="field">
                            <label for="pricePerQuantity">Price per Quantity:</label>
                            <input type="text" name="price_per_quantity" value={itemForm.price_per_quantity} placeholder="9.99" onChange={handleFormChange}/>
                        </div>

                        <div class="field">
                            <label for="isItem">Is Menu Item:</label>
                            <input type="text" name="is_menu_item" value={itemForm.is_menu_item} placeholder="True" onChange={handleFormChange}/>
                        </div>
                        
                        <button className="btn btn-success btn-lg" type="submit">Submit Order</button>
                    </form>
                </div> 
            </div>
        </Fragment>
    );
}