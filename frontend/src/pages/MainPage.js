import React, {useEffect, useState} from 'react';
import Header from '../components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css'
import axios from 'axios';


function MainPage() {
    const [countries, setCountries] = useState([]);


    useEffect(() => {
        
            axios.get(`http://127.0.0.1:8000/all-country`)
                .then(response => {
                    setCountries(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setCountries(null);
                });
        }, [] );

    return (
        <>
            <Header/>

            {/* ... (any other content you have before the featurettes) */}
            <div className="container marketing">
                <div className="row">
                {countries.map((country, index) => (
                        <div key={index} className="col-lg-4">
                            {/* Use country_url for the image. Replace this SVG with an actual image tag if necessary */}
                            <img
                                src={country.country_url}
                                className="bd-placeholder-img rounded-circle"
                                width="200"
                                height="200"
                                alt={`Flag of ${country.country}`}
                            />
                            {/* Use country name for the heading */}
                            <h2 className="fw-normal">{country.country}</h2>
                            <p>{country.country_info}</p>
                            <p><a className="btn btn-secondary" href="#">View details »</a></p>
                        </div>
                    ))}
                </div>

                {/* ... (featurettes and other content follow here) */}
            </div>
            
            {/* Featurettes */}
            <div className="container marketing">

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">

                            First featurette heading. <span className="text-muted">It’ll blow your mind.</span>
                        </h2>
                        <p className="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
                    </div>
                    <div className="col-md-5">
                        {/* Replace with actual image */}
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading fw-normal lh-1">
                            Oh yeah, it’s that good. <span className="text-muted">See for yourself.</span>
                        </h2>
                        <p className="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        {/* Replace with actual image */}
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">
                            And lastly, this one. <span className="text-muted">Checkmate.</span>
                        </h2>
                        <p className="lead">And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content. Your content.</p>
                    </div>
                    <div className="col-md-5">
                        {/* Replace with actual image */}
                    </div>
                </div>

                <hr className="featurette-divider" />

                {/* ... (any other content you have after the featurettes) */}

            </div>


            {/* FOOTER */}
            <footer className="container">
                <p className="float-end"><a href="#">Back to top</a></p>
                <p>&copy; 2023 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
            </footer>
        </>
    );
}

export default MainPage;

