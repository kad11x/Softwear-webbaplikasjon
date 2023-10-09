// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./components/Login";
import AdminComponent from "./components/Admin";
import SellerComponent from "./components/selger/Selger";
import BuyerComponent from "./components/bruker/Bruker";

function App() {
  const [user, setUser] = useState("");

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to={`/${user}`} replace /> : <LoginComponent onLogin={handleLogin} />}
          />
          <Route path="/admin" element={<AdminComponent />} />
          <Route path="/selger" element={<SellerComponent />} />
          <Route path="/bruker" element={<BuyerComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
