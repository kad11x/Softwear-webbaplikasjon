import React, { useState } from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Header({user}) {
    // State to store login form data
    const [loginData, setLoginData] = useState({ firstName: '', password: '' });
    const [userType, setUserType] = useState(null);
    const [userId, setUserId] = useState(null);


    // Function to handle form input changes
    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            if (response.ok) {
                const data = await response.json();
                setUserType(data.userType);
                setUserId(data.userId);
                // Redirect based on user type
                const redirectPath = data.userType === 'guid' ? `/guide/${data.userId}` : `/tourist/${data.userId}`;
                window.location.href = redirectPath;  
            } else {
                // If response is not ok, handle errors here
                const errorData = await response.text(); // or .json() if the server sends JSON
                console.error('Login failed:', errorData);
                // Handle error state in UI here
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            // Handle error state in UI here
        }
    };




    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
                        
                    </ul>

                    {/*<form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                    </form>*/}

                    <div className="text-end">
                        {user ? (
                            // Display the user's name if they are logged in
                            <div className="d-flex align-items-center">
                                <Link to={"/tourists/" + user.touristsID + "/Shoppingcart"}>
                                    <i className="bi bi-cart" style={{ fontSize: '24px', marginRight: '8px' }}></i>
                                </Link>
                                <span className="text-white me-3">Welcome, {user.firstName}</span>
                            </div>
                        ) : (
                            // Display login or signup links if the user is not logged in
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">

                                <Link to="/sign-up" className="btn btn-secondary me-2" >Sign Up like a king</Link>
                                <div className="dropdown me-2">
                                    <button className="btn btn-outline-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sign in like a legend
                                    </button>
                                    <form className=" dropdown-menu p-4" aria-labelledby="dropdownMenuButton" onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleDropdownFormEmail2" className="form-label">First Name</label>
                                        <input type="firstName" className="form-control" name="firstName" onChange={handleInputChange} placeholder="first name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleDropdownFormPassword2" className="form-label">Password</label>
                                        <input type="password" className="form-control" name="password" onChange={handleInputChange} placeholder="Password" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="dropdownCheck2"/>
                                        <label className="form-check-label" htmlFor="dropdownCheck2">
                                            Remember me
                                        </label>
                                        </div>
                                    </div>
                                    <button to="submit" className="btn btn-secondary me-2">Sign in</button>
                                    </form>
                                </div>
                                </div>

                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
