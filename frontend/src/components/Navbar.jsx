import React from "react";
import { Link } from "react-router-dom";

const Navbar = () =>{
    return (
        <nav>
            <ul class="navbar_menu">
                <li><Link to="/">Habitaciones</Link></li>
                <li><Link to="/search">Realizar búsqueda</Link></li>
            </ul>
        </nav>  
    )
    
}

export default Navbar