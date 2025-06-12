import Pin from "./Pin";
import { useState } from "react";
import 'leaflet/dist/leaflet.css';
import { fetchDataActivities } from "../utils/fetchActivities";


interface Activity{
    name:string;
    description:string;
    geoloc:[number,number];
    category:string;
}

interface ActivityData{
    [key:string]:Activity;
}

const PinContainer= () =>{
    const [data, setData]=useState<ActivityData | null>(null);
    const[loading, setLoading]=useState<boolean>(true);
    const[error, setError]=useState<Error | null >(null);

    fetchDataActivities().then((result)=>{
        setData(result.data);
        setLoading(result.loading);
        setError(result.errorReturn);
    })

    if(loading)return<p>Loading...</p>
    if(error)return <p>Error:{error.message}</p>

    return(
        <section className="pin-container">
            {data && Object.keys(data).map((key)=>{
                const activity = data[key];
                return  <Pin key={key} geoloc={activity.geoloc} />
            })}
        </section>
    )
}

export default PinContainer;