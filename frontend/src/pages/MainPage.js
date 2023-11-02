import React, {useEffect, useState} from 'react';
import Header from '../components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css'
import PopulareCountryDestination from "../components/destinations/PopularCountryDestinations";
import MainPageCityDestination from "../components/destinations/populareCitydestination";
import PopularTour from "../components/PopularTour";
import {useParams} from "react-router-dom";


function MainPage() {

    const [tourist, setTourist] = useState({});
    const { UserID } = useParams();

    useEffect(() => {
        if (UserID) {
            fetch('http://localhost:8080/tourist/' + UserID)
                .then(response => response.json())
                .then(data => setTourist(data))
                .catch(error => console.error(error));
        }
        else {
            setTourist(null)
        }
    }, [UserID]);

    return (
        <>
            <Header user={tourist}/>
            <div className = "image-Container">
            <img src = {"frontend\src\pages\picture1.jpg"} id = "big-Picture" className=''/>
            </div>
            <PopulareCountryDestination/>
            <MainPageCityDestination/>
            <PopularTour />


        </>
    );
}



export default MainPage;

