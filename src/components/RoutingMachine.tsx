import L from "leaflet";
import "leaflet-routing-machine";
import "../css/components/RoutingMachine.css";
import { getUserGeoloc } from '../utils/getUserGeoloc';
import { type LatLngExpression } from 'leaflet';
import { useMap } from "react-leaflet";
import {  useEffect } from "react";

const createRoutingMachineLayer = (userLocation:LatLngExpression, destionationLocation: LatLngExpression, map: L.Map) =>{
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(userLocation),
            L.latLng(destionationLocation),
        ],
        routeWhileDragging: true,
    }).addTo(map);
    return instance;
}

const RoutingMachine = ({destinationLocation}:{destinationLocation:LatLngExpression})=>{
    const map = useMap();
    
    useEffect(() => {
        getUserGeoloc().then((userLocation) => {
            if (userLocation) {
                createRoutingMachineLayer(userLocation, destinationLocation, map);
            }
        });
    }, [map, destinationLocation]);

    return null; // This component does not render anything itself
};

export default RoutingMachine;