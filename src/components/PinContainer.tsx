import Pin from "./Pin";
import { useState } from "react";
import 'leaflet/dist/leaflet.css';
import { fetchActivities } from "../utils/fetchActivities";


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

    fetchActivities()
    .then((result)=>{
        const activities = result;
        setData(activities)
    })
    .catch((error)=>{
        console.error(error);
    })

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