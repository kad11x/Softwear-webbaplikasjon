import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import Header from "../components/header/Header";
import BookingForm from "../components/BookingForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function ToursPage(){

    const [tour, setTour] = useState({});
    const { tourID } = useParams();
    const { UserID } = useParams();
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/one-tour//${tourID}`)
            .then(response => {
                setTour(response.data);
            })
            .catch(error => {
                console.error(error);
            },);

        axios.get('http://127.0.0.1:8000/tourist/' + UserID)
            .then(response => {
                setUser(response.data);
                console.log(UserID)
            })
            .catch(error => {
                console.error(error);
                console.log(UserID)
            });
    }, [UserID, tourID]);

    return(
        <>
            <Header user={user}/>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            alt={tour.name}
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-6">
                        <h1 className="mb-3">{tour.description}</h1>
                        <p className="lead">{tour.description}</p>
                        <p className="text-muted">Price: ${tour.price}</p>
                    </div>
                </div>
            </div>

            <BookingForm maxPeople={tour.maxPeople} touristID={UserID} tourID={tourID}/>
        </>
    )
}

export default ToursPage