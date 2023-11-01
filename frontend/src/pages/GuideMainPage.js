import React, {useState} from 'react';
import TourList from "../components/TourList";
import HeaderGuide from "../components/header/HeaderGuide";
function GuideMainPage(){

    return(
        <div>
            <HeaderGuide/>
            <h1>Guide Main Page</h1>
            <TourList/>
        </div>
    )
}

export default GuideMainPage