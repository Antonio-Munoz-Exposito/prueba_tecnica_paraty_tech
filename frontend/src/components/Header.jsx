import React from "react";
import Navbar from "./Navbar";

const Header = () =>{

    return (

        <header class="header_header">
            <div className="container header_container">
                <img src="/images/logo-hotel.png" alt="Hotel logo"/>
                <Navbar/>
            </div>
        </header>
    )
}

export default Header