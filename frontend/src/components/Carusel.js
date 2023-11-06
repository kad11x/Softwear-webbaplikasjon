import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Carousel() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/all-Tours')
            .then(response => {
                setTours(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
            {/* Carousel indicators */}
            <div className="carousel-indicators">
                {tours.map((tour, index) => (
                    <button
                        key={tour.tourID}
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : ''}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            {/* Carousel items */}
            <div className="carousel-inner">
                {tours.map((tour, index) => (
                    <div key={tour.tourID} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img
                            className="d-block w-100"
                            src={tour.imageURL}
                            alt={tour.description}
                        />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>{tour.description}</h1>
                                <p>{tour.price} | Max People: {tour.maxPeople}</p>
                                <p>
                                    <Link to={`/tour/${tour.tourID}`} className="btn btn-lg btn-primary">
                                        Learn more
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Carousel controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;
