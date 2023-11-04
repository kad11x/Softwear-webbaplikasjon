import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row } from 'react-bootstrap';
import '../../pages/MainPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MainPageCityDestination() {
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
        <div className="container" style={{ marginBottom: '5px' }}>
            <div className="h1" style={{ marginBottom: '5vh' }}>Tours</div>
            <Row className="g-3">
                {tours.map((tour) => (
                    <Col key={tour.tourID} xs={12} sm={6} md={4} lg={3}>
                        {/* Assuming you have a route to show tour details */}
                        <Link to={`/tour/${tour.tourID}`} style={{ textDecoration: 'none' }}>
                            <Card>
                                {/* If you have images for tours, you can add them here */}
                                {/* <Card.Img variant="top" src={tour.imageURL} /> */}
                                <Card.Body>
                                    <Card.Title>{tour.description}</Card.Title>
                                    <Card.Text>
                                        Price: {tour.price}<br />
                                        Max People: {tour.maxPeople}<br />
                                        Guide: {tour.guide_name}<br />
                                        Country: {tour.country_name}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
}


export default MainPageCityDestination;
