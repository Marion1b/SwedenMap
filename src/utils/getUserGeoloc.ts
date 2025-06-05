import {  type LatLngExpression } from 'leaflet';

export const getUserGeoloc = async (): Promise<LatLngExpression | null> => {
    return new Promise((resolve) => {
        const isGeolocAvailable = (): boolean => {
            return !!navigator.geolocation;
        };

        if (isGeolocAvailable()) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const geoloc: LatLngExpression = [position.coords.latitude, position.coords.longitude];
                    resolve(geoloc); 
                },
                (error: GeolocationPositionError) => {
                    console.error("Error getting the user's position:", error);
                    resolve(null);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            resolve(null); 
        }
    });
};