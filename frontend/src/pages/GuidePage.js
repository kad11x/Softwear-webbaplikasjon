import React, {useState} from 'react';
import TourList from "../components/TourList";
import HeaderGuide from "../components/header/HeaderGuide";

function GuidePage(){

    return(
        <div>
            <HeaderGuide/>
            <h1>Guide Main Page</h1>
            <TourList/>
        </div>
    )
}

export default GuidePage