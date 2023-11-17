import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row } from 'react-bootstrap';
import '../../pages/MainPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ToursPage from '../../pages/ToursPage';

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
        <>
        <div className="container-lg" style={{ marginBottom: '5px' }}>
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/GuideMainPage" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="#" className="nav-link px-3 text-secondary">Tours</a></li>
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                    </form>

                </div>
            </div>
        </header>
        
            <div className="h1" style={{ marginBottom: '5vh' }}></div>
            <Row className="g-3">
                {tours.map((tour) => (
                    <Col key={tour.tourID} xs={12} sm={6} md={4} lg={3}>
                        {/* Assuming you have a route to show tour details */}
                        <Link to={`/tour/${tour.tourID}`} style={{ textDecoration: 'none' }}>
                            <Card>
                                
                                <Card.Img variant="top" src={tour.tour_URL} />
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
        </>
    );
}


export default MainPageCityDestination;
