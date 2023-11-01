import React from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    return (
        <div className="container h-100 text-center" >
            <h1 className="h3 mb-3 font-weight-normal">Login</h1>
            <div>
                <Link to="/GuideMainPage" className={"px-1 text-white"}>
                <button className="btn btn-primary btn-lg"> Login as guide</button>
                </Link>
                <Link to="/user/1" className={"px-1 text-white"}>
                <button className="btn btn-primary btn-lg">login as user</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
