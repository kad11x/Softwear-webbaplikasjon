import React, {useEffect, useState} from 'react';
import Header from '../components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css'
import axios from 'axios';
import MainPageCityDestination from "../components/destinations/populareCitydestination";
import HeaderTourist from '../components/header/HeaderTourist';

import {useParams} from "react-router-dom";


function TouristPage() {

    const [tourist, setTourist] = useState({});
    const { UserID } = useParams();

    useEffect(() => {
        if (UserID) {
            axios.get('http://127.0.0.1:8000/tourist/'+ UserID)
                .then(response => {
                    console.log("User data fetched:", response.data);  // Log data to the console
                    setTourist(response.data);  // Update state with the data
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setTourist(null);  // Handle error by setting tourist to null
                });
        } else {
            setTourist(null);
        }
    }, [UserID]);

    return (
        <>
        
            <Header user={tourist}/>
            <hr className="featurette-divider" />
            <div className='container-lg'>
            <HeaderTourist/>
            {/*lege en ny header som skal ha hoveskrift tours og innholde muligheten for å søke på turer og scrolle*/}
            {<MainPageCityDestination/>}
            </div>
            
            


        </>
    );
}



export default TouristPage;

