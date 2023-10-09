import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Selger.css';

const Selger = () => {
  const [selectedCategory, setSelectedCategory] = useState('hovedside');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sellerData, setSellerData] = useState({
    name: '',
    age: '',
    bio: '',
    email: '', 
  });
  const [tourData, setTourData] = useState({
    name: '',
    description: '',
    price: '',
    date_available: '',
    location: '',
  });
  const [sellerInfoAdded, setSellerInfoAdded] = useState(false);
  const [tourAdded, setTourAdded] = useState(false);

  const categories = ['hovedside', 'administrer guids', 'Konto'];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSellerInputChange = (event) => {
    const { name, value } = event.target;
    setSellerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTourInputChange = (event) => {
    const { name, value } = event.target;
    setTourData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitSellerInfo = async (event) => {
    event.preventDefault();
    
    try {
      await axios.post("/api/selger/add-user", sellerData);
      setSellerInfoAdded(true);
    } catch (error) {
      console.error('Feil ved innsending av selgerinformasjon:', error);
    }
  };

  const handleSubmitTour = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/api/selger/add-tours", tourData);
      setTourAdded(true);
    } catch (error) {
      console.error('Feil ved innsending av turinformasjon:', error);
    }
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <div
        key={category}
        className="dropdown-item"
        onClick={() => handleCategorySelect(category)}
      >
        {category}
      </div>
    ));
  };

  const renderTourInfo = () => {
    return (
      <div>
        <h2>Tur Informasjon</h2>
        <p>Navn: {tourData.name}</p>
        <p>Beskrivelse: {tourData.description}</p>
        <p>Pris: {tourData.price}</p>
        <p>Dato Tilgjengelig: {tourData.date_available}</p>
        <p>Lokasjon: {tourData.location}</p>
      </div>
    );
  };

  return (
    <div className="page-center">
      <div className="header">
        <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
          <button className="dropdown-button" onClick={toggleDropdown}>
            {selectedCategory || '|||'}
            <span className="arrow">&#9662;</span>
          </button>
          <div className="dropdown-content">{renderCategories()}</div>
        </div>
      </div>
      {selectedCategory === 'hovedside' && (
        <div className="selected-category">
        </div>
      )}

      {selectedCategory === 'hovedside' && !tourAdded && (
        <div className="page-content">
          <h1>Selger Hovedside</h1>
          <p>
            Velkommen til Selger hovedsiden! Her kan du finne informasjon om
            salg og annet relevant innhold på hovedsiden.
          </p>

          {!sellerInfoAdded ? (
            <form onSubmit={handleSubmitSellerInfo}>
              <h2>Legg til selgerinformasjon</h2>
              <label>
                <input
                  type="text"
                  name="name"
                  placeholder="Navn"
                  value={sellerData.name}
                  onChange={handleSellerInputChange}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="age"
                  placeholder="Alder"
                  value={sellerData.age}
                  onChange={handleSellerInputChange}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="bio"
                  placeholder="Bio"
                  value={sellerData.bio}
                  onChange={handleSellerInputChange}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="email" // E-postfeltet
                  placeholder="E-post"
                  value={sellerData.email}
                  onChange={handleSellerInputChange}
                />
              </label>
              <br />
              <button type="submit">Legg til selgerinformasjon</button>
            </form>
          ) : (
            <form onSubmit={handleSubmitTour}>
              <h2>Legg til turinformasjon</h2>
              <label>
                <input
                  type="text"
                  name="name"
                  placeholder="Tur Navn"
                  value={tourData.name}
                  onChange={handleTourInputChange}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="description"
                  placeholder="Tur Beskrivelse"
                  value={tourData.description}
                  onChange={handleTourInputChange}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="price"
                  placeholder="Tur Pris"
                  value={tourData.price}
                  onChange={handleTourInputChange}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="date_available"
                  placeholder="Dato Tilgjengelig"
                  value={tourData.date_available}
                  onChange={handleTourInputChange}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="location"
                  placeholder="Tur Lokasjon"
                  value={tourData.location}
                  onChange={handleTourInputChange}
                />
              </label>
              <br />
              <button type="submit">Legg til tur</button>
            </form>
          )}
        </div>
      )}

      {/* Vis turinformasjon etter at turen er lagt til */}
      {tourAdded && renderTourInfo()}
    </div>
  );
};

export default Selger;
