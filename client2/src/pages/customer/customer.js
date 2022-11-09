import React from 'react';
import "./customer.css"

// IMPORT IMAGES
import logo from '../../images/Panda-Express-Logo.jpeg';
import BeijingBeef from '../../images/beijing-beef.jpeg';

export default function Customer(){
    return(
        <div>
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
                        <h1>Beijing Beef</h1>
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

            </div>

            {/* <button type="btn btn-dark" id="btn1">Add to Order</button>
            <button type="button" id="btn2">Remove From Order</button>

            $(document).on("click","#btn1",function(){
                    $("#showtheaddedform").append($("#div1").html());
            });
            $(document).on("click","#btn2",function(){
                    $("#showtheaddedform").append($("#div2").html()); 
            });   */}
        </div>
    );
}