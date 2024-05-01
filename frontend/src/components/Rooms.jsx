import React, {Fragment} from "react";
import Roomlist from "./Roomlist";

const Rooms = () =>{
    return(
        <Fragment>
            <div className="rooms_header">
                <div className="container">
                    <h1>Furchester Hotel & SPA</h1>
                </div>
            </div>
            
            <section className="rooms_intro">
                <div className="container">
                    <h2>Bienvenidos</h2>
                    <p>El Furchester Hotel & SPA es el sitio ideal para descansar acompañado de su pareja o familia. Disfrute de nuestras instalaciones y siéntase como en casa.</p>
                </div>
            </section>

            <section>
                <div className="rooms_roomlist_container">
                    <div className="container">
                        <h2>Nuestras habitaciones</h2>
                        <Roomlist/>
                    </div>
                </div>
            </section>
        </Fragment>
    )
    
}

export default Rooms