import { Marker } from 'react-leaflet';
import { getUserGeoloc } from '../utils/getUserGeoloc';
import { useEffect, useState } from 'react';
import { type LatLngExpression } from 'leaflet';

const UserPosition = () =>{
    const [position, setPosition] = useState<LatLngExpression | null>(null);

    useEffect(() => {
        const fetchUserGeoloc = async () => {
            const coords = await getUserGeoloc();
            if(coords){
                setPosition(coords);
            }
        }

        fetchUserGeoloc();
    }, []);

    if (!position) {
        return null; 
    }

    return <Marker position={position} />;
}

export default UserPosition;