import React from 'react';
import {Fragment} from 'react';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"; 

// image imports
import logo from '../../images/Panda-Express-Logo.jpeg';
import background from '../../images/background.jpeg';

export default function Landing(){

    const [ user , setUser ] = useState({});

    function handleCallbackResponse(response) {
        console.log("Endcoded JWT ID token: " + response.credential);
        const userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
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
             <div style={{ backgroundImage: background }}>
                <div class="container">
                <div className="center">
                    <img src={logo} alt="Panda Express Logo" />
                    <h1> Panda Express </h1>
                </div>


                <div className="center ratio ratio-16x9">
                    <iframe loading = "lazy" allowFullScreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJXXBI75iDRoYRsfgNW3cJV7c&key=AIzaSyA3VetYaIeHIvt4FAqJ0Km-_3wj6coi0-E"></iframe>
                </div>
                <div id="signInDiv"> </div> 
                { Object.keys(user).length != 0 &&
                    <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
                }
                { user &&
                    <div>
                        <img  src={user.picture} class="center"></img>
                        <h3>{user.name}</h3>
                    </div>
                }
                </div>
            </div>
        </Fragment>
    );
}
