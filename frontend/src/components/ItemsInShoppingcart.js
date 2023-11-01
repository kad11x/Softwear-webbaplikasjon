import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ItemsInShoppingcart({ UserID }) {
    const [tours, setTours] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        // Fetch the list of tour IDs for the shopping cart first
        axios
            .get(`http://localhost:8080/getShoppingCartForOnePerson/${UserID}`)
            .then((response) => {
                const tourIDs = response.data.map(item => item.tourID);
                // Use Promise.all to fetch information for each tour
                const tourPromises = tourIDs.map(tourID =>
                    axios.get(`http://localhost:8080/OneTour/${tourID}`)
                );

                // Wait for all requests to resolve
                Promise.all(tourPromises)
                    .then(tourResponses => {
                        // Map tour data to the shopping cart items
                        const updatedTours = response.data.map((item, index) => ({
                            ...item,
                            tourInfo: tourResponses[index].data
                        }));
                        setTours(updatedTours);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    }, [UserID]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    // Function to send payment information to the POST API
    const sendPaymentInfo = () => {

        tours.map( tour => {

            const TourInfo = {
                guideuserID: tour.tourInfo.guideUserID,
                touristID: tour.touristID,
                time: tour.time,
                amountOfPeople: tour.amountOfPeople,
            };

            axios.post("http://localhost:8080/addItemToBookedTour", TourInfo)
                .then(response => {
                    console.log(tour)
                    console.log(tour.tourInfo.guideUserID)
                    // Handle the response from the server if needed
                })
                .catch(error => {
                    console.error('Error sending shopping cart to server:', error);
                });

        })
        window.location.reload();

        axios.delete(`http://localhost:8080/deleteEntireShoppingCartForOnePerson/${UserID}`)
            .then((response) => {
            })
            .catch(error => {
                console.error('Error clearing shopping cart:', error);
            });

        setModalOpen(false);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Shopping Cart</h2>
            <ul className="list-group">
                {tours.map((item, index) => (
                    <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <img
                                src={item.tourInfo.tour_picture}
                                alt={item.tourInfo.title}
                                style={{ maxWidth: '50px', maxHeight: '50px' }}
                            />
                            {item.tourInfo.title}
                        </div>
                        <span className="badge bg-primary rounded-pill">
                            ${item.tourInfo.price}
                        </span>
                    </li>
                ))}
            </ul>
            <button onClick={openModal} className="btn btn-primary mt-3">
                Confirm Payment
            </button>

            {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Payment</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to proceed with payment?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={sendPaymentInfo}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemsInShoppingcart;

