import React from 'react';
import {Fragment} from 'react';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"; 

// image imports
import logo from '../../images/Panda-Express-Logo.jpeg';

export default function Landing(){

    const [ user , setUser ] = useState({});

    function handleCallbackResponse(response) {
        console.log("Endcoded JWT ID token: " + response.credential);
        const userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
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
            <div className="ratio ratio-16x9">
                <iframe loading = "lazy" allowFullScreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJXXBI75iDRoYRsfgNW3cJV7c&key=AIzaSyA3VetYaIeHIvt4FAqJ0Km-_3wj6coi0-E"></iframe>
            </div>
            <div id="signInDiv"> </div> 

        </Fragment>
    );
}