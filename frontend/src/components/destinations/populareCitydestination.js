import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row } from 'react-bootstrap';
import '../../pages/MainPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MainPageCityDestination() {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/allCitys')
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="container" style={{ marginBottom: '5px' }}>
            <div className="h1" style={{ marginBottom: '5vh' }}>Popular Tour City</div>
            <Row className="g-3">
                {cities.slice(0, 8).map((city) => (
                    <Col key={city.cityID} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`${city.city_countryID}/${city.city}`} style={{ textDecoration: 'none' }}>
                            <Card>
                                <Card.Img variant="top" src={city.city_picture} />
                                <Card.Body>
                                    <Card.Title>{city.city}</Card.Title>
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
