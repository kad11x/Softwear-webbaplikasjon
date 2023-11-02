import React from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function HeaderSignUpForm() {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"> {/*går tilbake til hjememsiden*/}
                        <Link to="/" className="nav-link px-20 text-secondary">Home</Link>
                    </ul>
                        <div className="text-end"> {/*kan bruke denne om jeg ønsker skrift på slutten av headeren*/}
                            <div className="d-flex align-items-center">
                                <span className="text-white me-10"></span>
                            </div>
                        </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderSignUpForm;
