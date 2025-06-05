import L from "leaflet";
import "leaflet-routing-machine";
import "../css/components/RoutingMachine.css";
import { getUserGeoloc } from '../utils/getUserGeoloc';
import { type LatLngExpression } from 'leaflet';
import { useMap } from "react-leaflet";
import {  useEffect } from "react";

const createRoutingMachineLayer = (userLocation:LatLngExpression, map: L.Map) =>{
    console.log('Creating routing machine layer with user location:', userLocation);
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(userLocation),
            L.latLng(48.11571930686552, 
            -1.6788356998351661),
        ],
        routeWhileDragging: true,
    }).addTo(map);
    console.log('Routing machine layer created:', instance);
    return instance;
}

const RoutingMachine = ()=>{
    const map = useMap();
    
    useEffect(() => {
        getUserGeoloc().then((userLocation) => {
            if (userLocation) {
                createRoutingMachineLayer(userLocation, map);
            }
        });
    }, [map]);

    return null; // This component does not render anything itself
};

export default RoutingMachine;