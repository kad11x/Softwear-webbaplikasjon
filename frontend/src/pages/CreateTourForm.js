import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import HeaderSignUpForm from '../components/header/HeaderSignUpForm';


function CreateTourForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await axios.post('http://localhost:8000/api/guide/create-tour', formData);

            console.log(response.data);
            navigate('/'); // Redirect to the main page
            // Her kan du håndtere resultatet videre, for eksempel ved å vise en bekreftelse til brukeren
        } catch (error) {
            // Her kan du sjekke for forskjellige typer av feil
            if (error.response) {
                // Serveren svarte med en statuskode som faller utenfor 2xx
                console.error('Server respons feil:', error.response.status, error.response.data);
            } else if (error.request) {
                // Forespørselen ble sendt men ingen respons ble mottatt
                console.error('Ingen respons mottatt:', error.request);
            } else {
                // Noe gikk galt under oppsetting av forespørselen
                console.error('Feil under oppsetting av forespørsel:', error.message);
            }
        }
    };
    return (
        
        <>
        <HeaderSignUpForm></HeaderSignUpForm>
        <div className="container-xl " >

        <h1>Sign In Form </h1>
        <h4>dont stop the music</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input type="text" className="form-control" id="firstName" value={formData.firstName} onChange={handleChange} required/>
            </div>
            <div className="col-md-4">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input type="text" className="form-control" id="lastName" value={formData.lastName} onChange={handleChange} required/>
            </div>
            <div className="col-md-4">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="input-group">
                    <span className="input-group-text">@</span>
                    <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required/>
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input type="number" min="0" step="1" className="form-control" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required/>
            </div>
            <div className="col-md-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required/>
            </div>
            <div className="col-12">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="termsAndConditions" required/>
                    <label className="form-check-label" htmlFor="termsAndConditions">
                        Agree to terms and conditions
                    </label>
                </div>
            </div>
            <div className="col-12">
                <button className="btn btn-primary" type="submit">Submit form</button>
            </div>
        </form>
        <h1>tester skrift</h1>
        </div>
        
        </>
    );
}



export default CreateTourForm;