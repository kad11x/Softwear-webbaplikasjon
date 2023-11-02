import React, {useEffect, useState} from 'react';
import Header from '../components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css'
import axios from 'axios';
import MainPageCityDestination from "../components/destinations/populareCitydestination";

import {useParams} from "react-router-dom";


function MainPage() {

    const [tourist, setTourist] = useState({});
    const { UserID } = useParams();

    useEffect(() => {
        if (UserID) {
            axios.get('http://localhost:8080/tourist/' + UserID)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);  // Log data to the console
                    setTourist(data);
                })
                .catch(error => console.error(error));
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



export default MainPage;

