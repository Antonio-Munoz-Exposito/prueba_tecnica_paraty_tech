import React, {useState} from "react";

const API_BASE = process.env.REACT_APP_API

const Search = () =>{

    const[adults, setAdults]                    = useState(1);
    const[children, setChildren]                = useState(0);
    const[babies, setBabies]                    = useState(0);
    const[maxprice, setMaxprice]                = useState(0);
    const[disableMaxprice, setDisableMaxprice]  = useState(1);
    const[results, setResults]                  = useState([]);
    const[haveResults, setHaveResults]          = useState(false)


    const submitSearch = async(e)=>{
        e.preventDefault();
        let dt = {};
        dt.adults = adults;
        dt.children = children;
        dt.babies = babies;
        if(!disableMaxprice)
            dt.maxprice = maxprice;

            

        // Creamos url con parametros
        const entries = Object.entries(dt);
        const queryString = entries.map(([k, v])=>`${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
        const apiUrl = API_BASE + '/search?' + queryString;
        const res = await fetch(apiUrl);
        setResults(await res.json());
        setHaveResults(true);
    }

    const handleAdultsChange = (e)=>{
        setAdults(e.target.value);
        setHaveResults(false);
    }

    const handleChildrenChange = (e)=>{
        setChildren(e.target.value);
        setHaveResults(false);
    }

    const handleBabiesChange = (e)=>{
        setBabies(e.target.value);
        setHaveResults(false);
    }

    const handlePriceDisabledChange = (e)=>{
        setDisableMaxprice(!disableMaxprice);
        setHaveResults(false);
    }

    const handleMaxPriceChange = (e)=>{
        setMaxprice(e.target.value);
        setHaveResults(false);
    }

    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    });

    return (
        <div className="container search_container">
            <h1>Buscar</h1>
            <section>
                <form>
                    <fieldset>
                        <label htmlFor="adults">Adultos</label>
                        <select name="adults" onChange={handleAdultsChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <label htmlFor="children">Niños</label>
                        <select name="childern" onChange={handleChildrenChange}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        <label htmlFor="babies">Bebés</label>
                        <select name="babies" onChange={handleBabiesChange}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <h3>Precio máximo</h3>
                        <input type="checkbox" name="disable_price" value="1" checked={disableMaxprice}  onChange={handlePriceDisabledChange}/> Sin precio máximo
                        <div className="search_maxprice_cnt"></div>
                        <label htmlFor="max_price" className={disableMaxprice ? "disabled" : ""}>Importe total del precio máximo</label>
                        <input type="text" name="max_price" disabled={disableMaxprice}  onChange={handleMaxPriceChange}/>
                    </fieldset>
                    
                    
                    <input type="submit" name="doSend" value="Buscar habitaciones disponibles" onClick={submitSearch}/>

                </form>
            </section> 
            <section>
                <div class="searh_results">
                    {results.map((elm,id)=>{
                        return(
                            <div key={id}>
                                <h4>{elm.room_name}</h4>
                                {elm.data_prices.map((elm2)=>{
                                    return(
                                        elm2.map((elm3)=>{
                                            return(
                                                <p>{elm3.rate_name} - {formatter.format(elm3.price)}</p>
                                            )
                                        })
                                    )
                                })}
                            </div>
                        )
                    })}
                    {haveResults && results.length < 1 && <p>Lo sentimos, no hay opciones disponibles para {adults}-{children}-{babies} personas{!disableMaxprice && <span> y un precio máximo de {maxprice}</span>}</p>}

                </div>
            </section>
        </div>
        
    )
}

export default Search