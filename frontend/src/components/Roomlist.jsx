import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const Roomlist = () =>{

    const [rooms, setRooms] = useState([]);
    const API_BASE = process.env.REACT_APP_API

    useEffect(()=>{
        getRooms();
    }, [])


    const getRooms = async ()=>{
        const response = await fetch(API_BASE + '/rooms');
        const roomList = await response.json();
        setRooms(roomList);
    }


    return (
        rooms.map((elm, id)=>{
            return(
                <div key={id} className="roomlist_card">
                    <img src={"/images/" + elm.room_picture} alt="Imagen de la habitación"/>
                    <h3>{elm.room_name}</h3>
                    <p>{elm.room_description.substring(0,80)}{elm.room_description.length > 80 ? "…" : ""}</p>
                    <Link to={"/room/" + elm.room_key}><button>Ver habitación</button></Link>
                </div>
            )
            
        })
    )
    
}

export default Roomlist