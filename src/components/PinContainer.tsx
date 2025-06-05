import Pin from "./Pin";
import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';

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

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch("./lib/activities.json");
                if(!response.ok){
                    throw new Error(`HHTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
            }catch(error){
                if(error instanceof(Error)){
                    setError(error);
                }else{
                    setError(new Error('An unknowed error occured'));
                }
                console.log(error);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    if(loading)return<p>Loading...</p>
    if(error)return <p>Error:{error.message}</p>

    return(
        <section className="pin-container">
            {data && Object.keys(data).map((key)=>{
                const activity = data[key];
                return  <Pin key={key} geoloc={activity.geoloc} classname={activity.category}/>
            })}
        </section>
    )
}

export default PinContainer;