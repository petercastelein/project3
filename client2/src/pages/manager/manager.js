import "./manager.css"
import React, {Fragment, useEffect, useState} from 'react';

import {url} from "../../components/constvars.js";

// image imports
import logo from '../../images/Panda-Express-Logo.jpeg';

export default function Manager(){
    const [menuItems, setMenuItems] = useState([]);

    {/* Displays menu items currently in order */}
    const getMenuItems = async () => {
        try {
            const response = await fetch(url + "getInventory");
            const jsonData = await response.json();
            console.log(jsonData);
            setMenuItems(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    useEffect(() => {
        getMenuItems();
    }, []);
    
    console.log(menuItems);

    return(
        <Fragment>
            {/* Displays logo and header */}
            <div className="center text-black">
                <img src={logo} alt="logo" />
                <h1> Manager View </h1>
            </div>

            {/* Displays employee roster */}
            {/* <table class="table" id="test1">
                <thead>
                    <tr>
                        <th scope="col">Property</th>
                        <th scope="col">Number of Incomplete Requests</th>
                    </tr>
                </thead>
                <tbody>
                    {priorityProperties.map(d => (<tr><th scope="row">{d.property_id}</th><td>{d.num_incomplete}</td></tr>))}
                </tbody>
            </table>
            <div className="employee text-center">
                <h1 className="employeeElements">Scheduled Employees</h1>
                <h2 className="employeeElements">John Smith</h2>
            </div> */}

            {/* Displays inventory status */}
            <div className="status">
                <h1 className="employeeElements">Inventory Status</h1>
            </div>

            {/* Displays order history */}
            <div className="history">
            <h1 className="employeeElements">Order History</h1>  
            </div>

            {/* Submit restock order */}
            <div className="restock">
            <h1 className="employeeElements">Submit Restock Order</h1>
            <button className="btn btn-success btn-lg">Submit Order</button>
            </div>
        </Fragment>

    );
}