import L from "leaflet";
import "leaflet-routing-machine";
import "../css/components/RoutingMachine.css";
import { getUserGeoloc } from '../utils/getUserGeoloc';
import { type LatLngExpression } from 'leaflet';
import { useMap } from "react-leaflet";
import {  useEffect, useRef } from "react";

const RoutingMachine = ({destinationLocation}:{destinationLocation:LatLngExpression})=>{
    const map = useMap();
    const routingControlRef = useRef<L.Routing.Control | null>(null);

    const createRoutingMachineLayer = (userLocation:LatLngExpression, destionationLocation: LatLngExpression, map: L.Map) =>{
        //remove the previous routing control isntance if it exists
        if(routingControlRef.current){
            map.removeControl(routingControlRef.current);
        }

        //Creat a new routing control instance
        const instance = L.Routing.control({
            waypoints: [
                L.latLng(userLocation),
                L.latLng(destionationLocation),
            ],
            routeWhileDragging: true,
        }).addTo(map);

        //store the new instance in the ref
        routingControlRef.current = instance;
        
        return instance;
    }

    
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