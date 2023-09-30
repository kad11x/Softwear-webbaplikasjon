import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        bruker_username: username,
        bruker_password: password,
        selger_username: '',
        selger_password: '',
        admin_username: '',
        admin_password: '',
      });

      // Håndter responsen fra serveren, for eksempel lagre JWT-token
      // eller utføre andre nødvendige handlinger etter vellykket innlogging.

      // Kall onLogin for å oppdatere brukerens innloggingsstatus i appen
      onLogin(response.data.message);
    } catch (error) {
      console.error('Feil ved innlogging:', error.response.data);
      alert('Feil ved innlogging. Sjekk brukernavn og passord.');
    }
  };

  return (
    <div>
      <h2>Logg inn</h2>
      <div>
        <label htmlFor="username">Brukernavn:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label htmlFor="password">Passord:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button onClick={handleLogin}>Logg inn</button>
    </div>
  );
};

export default LoginForm;