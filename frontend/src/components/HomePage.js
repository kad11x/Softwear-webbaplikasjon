import React, { useState } from 'react';
import '../styles/Homepage.css';

function Homepage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Her kan du legge til logikk for inlogging
    if (username && password) {
      alert(`Velkommen, ${username}!`);
      // Legg til inloggingslogikk her (for eksempel en API-forespørsel)
    } else {
      alert('Fyll ut både brukernavn og passord.');
    }
  };

  return (
    <div className="homepage-container">
      <div className="background-image"></div>
      <div className="login-box">
        <h1>Logg inn</h1>
        <input
          type="text"
          placeholder="velg mellom: Brukernavn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>prøv lykken</button>
      </div>
    </div>
  );
}

export default Homepage;
