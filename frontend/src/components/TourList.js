// TourList.js
import React from 'react';
import Tour from './Tour';

const tours = [
    {
        id: 1,
        name: 'Tour 1',
        description: 'Description for Tour 1',
        date: '2023-12-12',
        image: 'tour1.jpg',
    },
    {
        id: 2,
        name: 'Tour 2',
        description: 'Description for Tour 2',
        date: '2023-12-16',
        image: 'tour2.jpg',
    },
    // Add more tour entries as needed
];

function TourList() {
    return (
        <div className="container">
            <div className="row">
                {tours.map((tour) => (
                    <Tour key={tour.id} tour={tour} />
                ))}
            </div>
        </div>
    );
}

export default TourList;
