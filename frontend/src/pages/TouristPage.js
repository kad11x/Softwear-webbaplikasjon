import React, {useEffect, useState} from 'react';
import Header from '../components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css'
import axios from 'axios';
import MainPageCityDestination from "../components/destinations/populareCitydestination";

import {useParams} from "react-router-dom";


function TouristPage() {

    const [tourist, setTourist] = useState({});
    const { UserID } = useParams();

    useEffect(() => {
        if (UserID) {
            axios.get('http://127.0.0.1:8000/tourist/'+UserID)
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
            <div className = "image-Container">
            <img src = {"/picture1.jpg"} id = "big-Picture" className=''/> {/*må legge inn et bilde i bagrunnen */}
            </div>
            {/*<MainPageCityDestination/>*/}
            


        </>
    );
}



export default TouristPage;

