import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import TouristPage from "./pages/TouristPage";
import GuidePage from "./pages/GuidePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import ToursPage from "./pages/ToursPage";
import Shoppingcart from "./pages/Shoppingcart";
import OpprettGuidePage from "./pages/OpprettGuidePage";
import SignUp from "./pages/SignUp";

function App() {


  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TouristPage/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/guide" element={<Login/>}/>
                <Route path="/tourist/:UserID" element={<TouristPage/>} />
                <Route path="/guide/:GuideID" element={<GuidePage/>}/>


                <Route path="/user/:UserID/tours/:tourID" element={<ToursPage/>}/>
                <Route path="/user/:UserID/Shoppingcart" element={<Shoppingcart/>}/>
                {/*<Route path="/Guide/:GuideID/GuideMainPage" element={<GuideMainPage/>}/>
                <Route path="/Guide/:GuideID/Opprett-guide" element={<OpprettGuidePage/>}/>*/}

            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
