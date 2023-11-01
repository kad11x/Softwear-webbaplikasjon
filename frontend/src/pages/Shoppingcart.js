import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/header/Header";
import {useParams} from "react-router-dom";
import axios from "axios";
import ItemsInShoppingcart from "../components/ItemsInShoppingcart";

function Shoppingcart(){

    const { UserID } = useParams();
    const [user, setUser] = useState({})

    useEffect(() => {

        axios.get('http://localhost:8080/tourist/' + UserID)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error(error);
                console.log(UserID)
            });

    }, [UserID]);



    return(
        <>
            <Header user={user}/>
            <ItemsInShoppingcart UserID={UserID}/>
        </>
    )
}

export default Shoppingcart