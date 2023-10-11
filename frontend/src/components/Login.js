import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';



const Login = () => {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userRole === 'bruker') {
      navigate('/bruker');
    } else if (userRole === 'selger') {
      navigate('/selger');
    } else if (userRole === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <div className="homepage-container"> {/* Apply homepage-container class */}
      <div className="login-box"> {/* Apply login-box class */}
        <h2>Login</h2>
        <select className="login-input" onChange={(e) => setUserRole(e.target.value)}> {/* Apply login-input class */}
          <option value="">Velg rolle</option>
          <option value="bruker">Bruker</option>
          <option value="selger">Selger</option>
          <option value="admin">Admin</option>
        </select>
        <button className="login-button" onClick={handleLogin}>Logg inn</button> {/* Apply login-button class */}
      </div>
    </div>
  );
};

export default Login;

