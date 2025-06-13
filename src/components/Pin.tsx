import type { LatLngExpression } from 'leaflet';
import { Marker } from 'react-leaflet';

const Pin = ({geoloc}:{geoloc:LatLngExpression}) =>{
    return (
        <Marker position={geoloc} >
        </Marker>
    )
}

export default Pin;