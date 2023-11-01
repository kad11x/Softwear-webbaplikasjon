import React, { useState } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


const BookingForm = ({ maxPeople, touristID, tourID}) => {
    const [date, setDate] = useState('');
    const [input_time, setTime] = useState('');
    const [amountOfPeople, setAmountOfPeople] = useState(1);


    const handleTimeChange = (e) => {
        const enteredTime = e.target.value;
        const formattedTime = enteredTime + ':00';
        setTime(formattedTime);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const time = date + " " + input_time


        const formData = {
            touristID,
            tourID,
            time,
            amountOfPeople,
        };

        console.log(formData);

        const apiUrl = 'http://localhost:8080/addTourToShoppingCartForOnePerson';

        axios.post(apiUrl, formData)
            .then((response) => {
                console.log('Booking submitted successfully', response.data);
            })
            .catch((error) => {
                console.error('Error submitting booking', error);
            });

    };


    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <h2 className="mb-4">Book a Tour</h2>
                        <Form.Group controlId="formDate">
                            <Form.Label>Select a Date</Form.Label>
                            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formTime">
                            <Form.Label>Select a Time</Form.Label>
                            <Form.Control type="time" value={input_time} onChange={handleTimeChange} required />
                        </Form.Group>
                        <Form.Group controlId="formNumberOfPeople">
                            <Form.Label>Number of People (up to {maxPeople})</Form.Label>
                            <Form.Control
                                type="number"
                                value={amountOfPeople}
                                onChange={(e) => setAmountOfPeople(e.target.value)}
                                required
                                min="1"
                                max={maxPeople}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="my-2">
                            Book Tour
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default BookingForm;
