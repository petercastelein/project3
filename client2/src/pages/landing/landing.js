import React from 'react';
import {Fragment} from 'react';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"; 
import {Routes, Route, useNavigate} from 'react-router-dom';
import "./landing.css"
// image imports
import logo from '../../images/Panda-Express-Logo.jpeg';
import background from '../../images/background.jpeg';

export default function Landing(){

    const [ user , setUser ] = useState({});

    const navigate = useNavigate();

    const navigateToCustomer = () => {
        navigate('customer');
    };

    const navigateToManager = () => {
        navigate('manager');
    };

    const navigateToCashier = () => {
        navigate('cashier');
    };

    function handleCallbackResponse(response) {
        console.log("Endcoded JWT ID token: " + response.credential);
        const userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    function handleEmployeeLogin(response){
        const userObject = jwt_decode(response.credential);
        if (userObject.email_verified){
            navigateToManager();
        }
        else{
            navigateToCashier();
        }
    }

    function handleSignOut(event) {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "965342940485-t4misf6336m5ptpnlevi6b1c65seg8v5.apps.googleusercontent.com", 
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"), 
            { theme: "outline", size: "large"}
        );
    }, [])

    return(
        <Fragment>
            {/* <div style={{ backgroundImage: background }}> */}
            <div className="container">
                    <div className="center">
                        <img src={logo} alt="Panda Express Logo" />
                        <h1> Panda Express </h1>
                    </div>

                    <div className="container2">
                        <iframe className="map" title="map" loading = "lazy" allowFullScreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJXXBI75iDRoYRsfgNW3cJV7c&key=AIzaSyA3VetYaIeHIvt4FAqJ0Km-_3wj6coi0-E"></iframe>
                    </div>

                    <h2 className="employee">Sign in as Manager or Cashier:</h2>
                    <div id="signInDiv" className="signin border border-dark border-5"></div> 
                    
                    <h1 className="customer2">Customers:</h1>
                    <div className="customerLink">
                        <button className="btn btn-primary btn-lg" onClick={navigateToCustomer}>Continue to Order</button>
                    </div>
                        
                    
                    { Object.keys(user).length != 0 &&
                        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
                    }
                    { user &&
                        <div>
                            <img  src={user.picture} className="center" alt="profile"></img>
                            <h1>{user.name}</h1>
                        </div>
                    }
            </div>
            {/* </div> */}
        </Fragment>
    );
}
