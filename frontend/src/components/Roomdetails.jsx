import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

const Roomdetails = () =>{

    const [room, setRoom] = useState({data_prices:[]});
    const [roomPrices, setRoomPrices] = useState([]);
    const params = useParams();
    const API_BASE = process.env.REACT_APP_API

    useEffect(()=>{
        getRoom();
    },[])


    const getRoom = async ()=>{
        const roomId = params["roomId"];
        const response = await fetch(API_BASE + '/room/' + roomId);
        let roomData = await response.json();
        setRoom(roomData);
        let pl = getPriceList(roomData.data_prices);
        setRoomPrices(pl);
    }

    const getPriceList = (prices)=>{
        let priceList = [];
        for (let i=0; i<prices.length; i++){
            let occupancy = extractOccupancy(prices[i]);
            for(let j=0; j<prices[i].length; j++){
                let elm = prices[i][j];
                if(!elm['target_occupancy']) elm['target_occupancy'] = occupancy;
                priceList.push(elm);
            }
        }
        return priceList;
    }

    const extractOccupancy = (elm)=>{
        const elmWithOcuppacy = elm.filter((el) => el.target_occupancy);
        return elmWithOcuppacy[0]['target_occupancy'];
    }

    const formatOccupancy = (elms) =>{
        return elms.join(' / ');
    }

    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    });


    return (
                <div className="container roomdetails_container">
                    <div className="roomdetails_img_cont">
                        <img src={"/images/" + room.room_picture} alt="Imagen de la habitación"/>
                    </div>
                    <div className="roomdetails_data_cont">
                        <h2>{room.room_name}</h2>
                        <p>{room.room_description}</p>
                        <h3>Precios</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ocupación <small>(adultos, niños, bebés)</small></th>
                                    <th>Tipo</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                roomPrices.map((elm)=>{
                                        return(
                                            <tr>
                                                <td>{formatOccupancy(elm.target_occupancy)}</td>
                                                <td>{elm.rate_name}</td>
                                                <td>{formatter.format(elm.price)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>       
    )
    
}

export default Roomdetails