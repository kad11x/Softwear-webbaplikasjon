import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row } from 'react-bootstrap';
import '../../pages/MainPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PopulareCountryDestination() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/allCountries')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="container" style={{ marginBottom: '5px' }}>
            <div className="h1" style={{ marginBottom: '5vh' }}>Popular Tour Country</div>
            <Row className="g-3">
                {countries.slice(0, 8).map((country) => (
                    <Col key={country.countryID} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/${country.countryID}`} style={{ textDecoration: 'none' }}>
                            <Card>
                                <Card.Img variant="top" src={country.country_picture} />
                                <Card.Body>
                                    <Card.Title>{country.country}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default PopulareCountryDestination;