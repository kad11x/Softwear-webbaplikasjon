// Tour.js
import React from 'react';
import Button from "react-bootstrap/button";
import 'bootstrap/dist/css/bootstrap.min.css';

function Tour({ tour }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{tour.name}</h5>
                    <p className="card-text">{tour.description}</p>
                    <p className="card-text">Date: {tour.date}</p>
                    <Button className="btn me-2">Delete</Button>
                    <Button className="btn">Update</Button>
                </div>
            </div>
        </div>
    );
}

export default Tour;
